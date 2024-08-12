import React from 'react';

const BenefitSection: React.FC = () => {
  return (
    <div className="flex justify-around bg-gray-50 py-8 w-full max-w-lg ">
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-semibold text-yellow-500 mb-4">Your benefit</h2>
        <h3 className="text-2xl font-bold mb-2">Remote & Freedom</h3>
        <p>We firmly believe that talents need freedom to flourish to the fullest.</p>
      </div>
      <div className="w-1/2 p-4">
        <img src="/path/to/your/image.jpg" alt="Team" className="rounded-lg" />
      </div>
    </div>
  );
};

export default BenefitSection;
