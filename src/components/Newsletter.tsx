'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setEmail('');
      } else if (response.status === 429) {
        toast.error('Too many attempts. Please try again later.');
      } else {
        toast.error(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-16 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
      <p className="text-gray-400 mb-6">
        Subscribe to my email list. I do not spam, ever.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
          required
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
    </section>
  );
};
