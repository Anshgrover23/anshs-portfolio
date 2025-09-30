import { NextResponse } from 'next/server';
import * as brevo from '@getbrevo/brevo';
import { EMAIL_REGEX } from '@/Constants';

interface BrevoApiError {
  response?: {
    body?: {
      code?: string;
      message?: string;
    };
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
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