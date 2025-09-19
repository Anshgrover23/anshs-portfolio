import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyE-OH1zIwrCpEErTvrr7G2rJXQGf7JYyXP2MCLjEecvslWtMNQYbqm1K9Vc8pJS-YPTA/exec',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ email, key: 'mySecret123' }),
          }
        );
        if (response.ok) {
          toast.success("Thanks for subscribing! I'll keep you updated.");
          setEmail('');
        } else {
          toast.error('Subscription failed. Please try again later.');
        }
      } catch (error) {
        toast.error('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
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
        />
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          {loading ? 'Submitting...' : 'Subscribe'}
        </Button>
      </form>
    </section>
  );
};
