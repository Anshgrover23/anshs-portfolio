'use client';
import { GraduationCap } from 'lucide-react';
export const Education = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">Education</h2>
      <div className="p-6 rounded-lg bg-gray-900/50">
        <div className="flex items-start gap-4">
          <GraduationCap className="w-8 h-8 text-purple-400 mt-1" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-white">
                Birla Institute of Technology, Mesra
              </h3>
              <span className="text-gray-400 text-sm">
                Aug. 2023 – May 2027 (Expected)
              </span>
            </div>
            <p className="text-purple-400 mb-1">
              Bachelor of Technology — Artificial Intelligence
            </p>
            <p className="text-gray-300 text-sm">Current CGPA: 8.67 / 10</p>
          </div>
        </div>
      </div>
    </section>
  );
};
