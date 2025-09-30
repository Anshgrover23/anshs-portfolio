import { NextResponse } from 'next/server';
import * as brevo from '@getbrevo/brevo';
import { RateLimiter } from 'limiter';
import { LRUCache } from 'lru-cache';

interface BrevoApiError {
  response?: {
    body?: {
      code?: string;
      message?: string;
    };
  };
}

// Use LRU cache with max size and TTL to prevent memory leaks
const rateLimiters = new LRUCache<string, RateLimiter>({
  max: 10000, // Maximum 10,000 entries
  ttl: 1000 * 60 * 60, // 1 hour TTL
  updateAgeOnGet: false,
  updateAgeOnHas: false,
});

function getRateLimiter(ip: string): RateLimiter {
  let limiter = rateLimiters.get(ip);
  if (!limiter) {
    limiter = new RateLimiter({ tokensPerInterval: 5, interval: 'hour' });
    rateLimiters.set(ip, limiter);
  }
  return limiter;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    // Improved IP detection with better handling for unknown IPs
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
    
    let ip: string;
    if (forwarded) {
      ip = forwarded.split(',')[0].trim();
    } else if (realIp) {
      ip = realIp.trim();
    } else if (cfConnectingIp) {
      ip = cfConnectingIp.trim();
    } else {
      // Generate a unique identifier for unknown IPs using timestamp and random value
      ip = `unknown-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      console.warn('Unable to determine client IP - using unique identifier for rate limiting');
    }
    
    const limiter = getRateLimiter(ip);
    const hasToken = await limiter.tryRemoveTokens(1);
    
    if (!hasToken) {
      return NextResponse.json(
        { error: 'Too many subscription attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 503 }
      );
    }

    const apiInstance = new brevo.ContactsApi();
    apiInstance.setApiKey(
      brevo.ContactsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY || ''
    );
    
    const createContact = new brevo.CreateContact();
    createContact.email = email;
    // Validate BREVO_LIST_ID before parsing to prevent NaN
    if (process.env.BREVO_LIST_ID) {
      const listId = parseInt(process.env.BREVO_LIST_ID, 10);
      if (!isNaN(listId)) {
        createContact.listIds = [listId];
      } else {
        console.warn('Invalid BREVO_LIST_ID format:', process.env.BREVO_LIST_ID);
        createContact.listIds = undefined;
      }
    } else {
      createContact.listIds = undefined;
    }
    createContact.updateEnabled = true; 
    
    try {
      await apiInstance.createContact(createContact);
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to the newsletter!' 
        },
        { status: 200 }
      );
    } catch (brevoError: unknown) {
      const error = brevoError as BrevoApiError;
      
      if (error?.response?.body?.code === 'duplicate_parameter') {
        return NextResponse.json(
          { 
            success: true, 
            message: 'You are already subscribed to the newsletter!' 
          },
          { status: 200 }
        );
      }
      
      console.error('Brevo API error:', error?.response?.body || error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}