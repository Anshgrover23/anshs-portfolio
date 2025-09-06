import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Hero = () => {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 text-white">Hi, Ansh here</h1>
          <p className="text-xl text-gray-400">
            Building open-source dev tools & automations 📍Rajasthan, India
          </p>
        </div>
        <Avatar className="w-24 h-24">
          <AvatarImage src="/avatar.jpeg" alt="Ansh Grover" />
          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-blue-600 text-white">
            AG
          </AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
};
