import React from 'react';
import SurveyForm from '../components/surveyForm';
import BenefitSection from '../components/BenefitSection';


const Question2: React.FC = () => {
  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full ">
        <SurveyForm />
        {/* <BenefitSection /> */}
      </div>
    </div>
  );
}

export default Question2;