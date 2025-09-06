
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export const Hero = () => {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Hi, Ansh here
          </h1>
          <p className="text-xl text-gray-400">
            Building open-source dev tools & automations 📍Rajasthan, India
          </p>
        </div>
        <Avatar className="w-24 h-24">
          <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-800">
            <User className="w-12 h-12 text-gray-300" aria-hidden />
          </div>
          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-blue-600 text-white">
            AG
          </AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
};
