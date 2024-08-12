import React from 'react';
import SurveyForm from"../components/surveyForm"

const Submit: React.FC = () => {
  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full ">
        <SurveyForm />
      </div>
    </div>
  );
}

export default Submit;