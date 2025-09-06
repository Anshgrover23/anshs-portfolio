export const Education = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">Education</h2>
      <div className="p-6 rounded-lg bg-gray-900/50">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🎓</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-white">
                Computer Science Engineering
              </h3>
              <span className="text-gray-400 text-sm">2023 - 2027</span>
            </div>
            <p className="text-purple-400 mb-2">Bachelor's Degree</p>
            <p className="text-gray-300 text-sm">
              Currently pursuing Computer Science Engineering with focus on
              full-stack development and open source contributions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
