'use client';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Skills } from '@/components/Skills';
import { Newsletter } from '@/components/Newsletter';
import { Navigation } from '@/components/Navigation';
import { AnimatedSocialLinks } from '@/components/AnimatedSocialLinks';

function Index() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-8 pt-24">
        <div id="home" className="scroll-mt-24">
          <Hero />
        </div>
        <div id="about" className="scroll-mt-24">
          <About />
        </div>
        <div id="experience" className="scroll-mt-24">
          <Experience />
        </div>
        <div id="education" className="scroll-mt-24">
          <Education />
        </div>
        <div id="skills" className="scroll-mt-24">
          <Skills />
        </div>
        <div id="contact" className="scroll-mt-24">
          <Newsletter />
        </div>
      </div>
      <AnimatedSocialLinks />
    </div>
  );
}

export default Index;
