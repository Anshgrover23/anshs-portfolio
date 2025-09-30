import { NextResponse } from 'next/server';
import * as brevo from '@getbrevo/brevo';

interface BrevoApiError {
  response?: {
    body?: {
      code?: string;
      message?: string;
    };
  };
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Simple in-memory rate limiter using built-in Map
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT = 5; // 5 requests per hour
const WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_ENTRIES = 10000; // Maximum entries to prevent memory leaks

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
  // If still too many entries, remove oldest ones
  if (rateLimitMap.size > MAX_ENTRIES) {
    const entries = Array.from(rateLimitMap.entries())
      .sort((a, b) => a[1].resetTime - b[1].resetTime);
    const toRemove = entries.slice(0, entries.length - MAX_ENTRIES);
    toRemove.forEach(([key]) => rateLimitMap.delete(key));
  }
}, 10 * 60 * 1000);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || entry.resetTime < now) {
    // No entry or expired, create new one
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }
  
  // Increment count
  entry.count++;
  return true;
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
    
    const isAllowed = checkRateLimit(ip);
    
    if (!isAllowed) {
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