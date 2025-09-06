import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! I'll keep you updated.");
      setEmail('');
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
          className="bg-purple-600 hover:bg-purple-700 text-white px-6"
        >
          Subscribe
        </Button>
      </form>
    </section>
  );
};
