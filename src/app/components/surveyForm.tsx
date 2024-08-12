"use client";

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import CustomIcon from './icons/CustomIcon';
import TeamIcon from './icons/TeamIcon';
import Difference from './icons/Difference';
import Independence from './icons/Independence';
import One from './icons/One';

import Three from './icons/Three';
import Plus from './icons/Plus';
import FiveIcon from './icons/FiveIcon';
import Wrong from './icons/Wrong';

import True from './icons/True';



interface SurveyFormValues {
  question1: string;
  question2: string;
  question3: string[];
  name: string;
  email: string;
  phone: string;
  privacyPolicy: boolean;
}

const SurveyForm: React.FC = () => {
  const router = useRouter();
  const p = usePathname();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<{ name: boolean; email: boolean; phone: boolean; privacyPolicy: boolean }>({
    name: false,
    email: false,
    phone: false,
    privacyPolicy: false,
  });
  
  const [hasError, setHasError] = useState<Record<string, string | undefined>>({
    name: "",
    email: "",
    phone: "",
    privacyPolicy: "",  
  });
 

  const initialValues: SurveyFormValues = {
    question1: '',
    question2: '',
    question3: [],
    name: '',
    email: '',
    phone: '',
    privacyPolicy: false,
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePhoneNumber = (phone: string): boolean => {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
  };

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswers(prevAnswers => {
      if (prevAnswers.includes(answer)) {
        return prevAnswers.filter(a => a !== answer);
      } else {
        return [...prevAnswers, answer];
      }
    });
  };

  

  const validateField = (value: string | boolean, fieldName: keyof SurveyFormValues): void => {
    let errorMessage: string | undefined = undefined;
  
    if (typeof value === 'string' && !value) {
      errorMessage = 'This field is required';
    } else if (fieldName === 'email' && !validateEmail(value as string)) {
      errorMessage = 'Invalid email address';
      
    } else if (fieldName === 'phone' && !validatePhoneNumber(value as string)) {
      errorMessage = 'Invalid phone number';
    }
    else if (fieldName === 'privacyPolicy' && !value) {
      errorMessage = 'You must accept the privacy policy'; 
    }
  
    setHasError((prevState) => ({ ...prevState, [fieldName]: errorMessage }));
  };


  




  const handleSubmit = async (values: SurveyFormValues) => {
    if(!hasError.name &&  !hasError.email && !hasError.phone && !hasError.privacyPolicy){
      

      try {
        const response = await axios.post('http://localhost:3000/api/surveys', {
          ...values,
          question3: selectedAnswers,
        });
    
        if (response.status === 200) {
          console.log("Document written with ID: ", response.data.id);
          router.push('/thank-you');
        } else {
          console.error('Failed to submit survey');
        }
      } catch (error) {
        console.error('Failed to submit survey', error);
      }
    }else{
       console.error('There is Wrong Answers')
    }
   
  };



  return (
    
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue  }) => (
        <Form>
          {p === '/' && (
         <div className='flex flex-col items-center justify-center leading-[2.5rem] px-4 sm:px-6 lg:px-8'>
         <div className='text-center md:mb-5'>
           <p className='text-gray-600 text-md '>Question 1 of 3</p>
           <label className="block  text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
             What is most important to you in your job?
           </label>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 w-full max-w-[900px]">
           <button 
             type="button" 
             onClick={() => { setFieldValue('question1', 'Security'); router.push('/question2'); }} 
             className="bg-custom-yellow rounded-lg flex-col items-center space-between p-5 md:p-9 transform transition-transform duration-300 hover:scale-110"
           >
             <CustomIcon />
             <p className='text-white'>Security</p>
           </button>
           
           <button 
             type="button" 
             onClick={() => { setFieldValue('question1', 'A great team'); router.push('/question2'); }} 
             className="bg-custom-yellow rounded-lg flex-col items-center space-between p-5 md:p-9 transform transition-transform duration-300 hover:scale-110"
           >
             <TeamIcon />
             <p className='text-white'>A great team</p>
           </button>
           
           <button 
             type="button" 
             onClick={() => { setFieldValue('question1', 'Make a difference'); router.push('/question2'); }} 
             className="bg-custom-yellow rounded-lg flex-col items-center space-between p-5 md:p-9 transform transition-transform duration-300 hover:scale-110"
           >
             <Difference />
             <p className='text-white'>Make a difference</p>
           </button>
           
           <button 
             type="button" 
             onClick={() => { setFieldValue('question1', 'Independence'); router.push('/question2'); }} 
             className="bg-custom-yellow rounded-lg flex-col items-center space-between p-5 md:p-9 transform transition-transform duration-300 hover:scale-110"
           >
             <Independence />
             <p className='text-white'>Independence</p>
           </button>
         </div>
       </div>
            )}
          {p === '/question2' && (
          <div className='flex flex-col items-center justify-center leading-[2.5rem] px-4 sm:px-6 lg:px-8'>
          <div className='text-center md:mb-5'>
            <p className='text-gray-600 text-md '>Question 2 of 3</p>
            <label className="block  text-2xl sm:text-3xl md:text-4xl md:leading-tight font-bold text-gray-900">
              How much experience do you already have in your field?
            </label>
          </div>
        
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 w-full max-w-[900px]'>
            <button 
              type="button" 
              onClick={() => { setFieldValue('question2', 'Less than 1 year'); router.push('/question3'); }} 
              className="bg-custom-yellow  rounded-lg flex-col items-center space-between p-5 md:p-9 transform transition-transform duration-300 hover:scale-110"
            >
              <One />
              <p className='text-white'>Less than 1 year</p>
            </button>
        
            <button 
              type="button" 
              onClick={() => { setFieldValue('question2', '1-3 years'); router.push('/question3'); }} 
              className="bg-custom-yellow rounded-lg flex-col  items-center space-between p-5 md:p-9 transform transition-transform duration-300 hover:scale-110"
            >
              <Three />
              <p className='text-white'>1-3 years</p>
            </button>
        
            <button 
              type="button" 
              onClick={() => { setFieldValue('question2', '3-5 years'); router.push('/question3'); }} 
              className="bg-custom-yellow rounded-lg flex-col items-center space-between p-5 md:p-9 transform transition-transform duration-300 hover:scale-110"
            >
              <FiveIcon />
              <p className='text-white'>3-5 years</p>
            </button>
        
            <button 
              type="button" 
              onClick={() => { setFieldValue('question2', 'Over 5 years'); router.push('/question3'); }} 
              className="bg-custom-yellow rounded-lg flex-col items-center space-between p-5 md:p-9 transform transition-transform duration-300 hover:scale-110"
            >
              <Plus />
              <p className='text-white'>Over 5 years</p>
            </button>
          </div>
        </div>
        
          )}
          {p === '/question3' && (
           <div className='flex flex-col items-center justify-center leading-[2.5rem] px-4 sm:px-10 lg:px-8'>
           <div className='text-center md:mb-5'>
             <p className='text-gray-600 text-md '>Question 3 of 3</p>
             <label className="block text-2xl sm:text-3xl md:text-4xl md:leading-tight font-bold text-gray-900">
               What do you want to achieve in the next 2 years?
             </label>
           </div>
           <p className='text-gray-900 text-md text-center'>(Multiple selection possible)</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 w-full md:max-w-[900px] max-w-[600px]">
             {['Personal growth', 'Take on management functions', 'Develop further professionally', 'Thinking outside the box'].map((answer) => (
               <button
                 key={answer}
                 type="button"
                 onClick={() => {
                   handleAnswerChange(answer);
                   setFieldValue('question3', selectedAnswers);
                 }}
                 className={`flex hover:bg-gray-100 transition-colors duration-300 items-center p-4 bg-red shadow-xl rounded-lg text-left border-3 ${
                   selectedAnswers.includes(answer) ? 'border-custom-yellow bg-white border-2 shadow-md' : 'border-gray-200 bg-white shadow-sm border-2 border-gray-100'
                 }`}
               >
                 <div className='flex items-center w-full'>
                   <div className='flex-grow'>
                     {answer}
                   </div>
                   <div className={`w-5 h-5 rounded-full border-2 ${
                     selectedAnswers.includes(answer) ? 'border-yellow-600 bg-custom-yellow' : 'border-gray-300'
                   } flex items-center justify-center ml-auto`}>
                     {selectedAnswers.includes(answer) && (
                       <svg fill="none" color="white" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                         <polyline points="20 6 9 17 4 12" stroke="white" stroke-width="3"/>
                       </svg>
                     )}
                   </div>
                 </div>
               </button>
             ))}
         

             <div className='col-span-1 md:col-span-2 flex items-center justify-center w-full'>
               <div className="w-full max-w-md">
                 <button
                   type="button"
                   onClick={() => router.push('/submit')}
                   className={`w-full px-4 py-4 text-center rounded-lg mt-3 duration-300
                     ${selectedAnswers.length === 0 ? 'bg-custom-yellow opacity-30 cursor-not-allowed hover:opacity-100' : 'bg-custom-yellow opacity-50 text-white hover:opacity-100'} 
                     ${selectedAnswers.length === 0 ? '' : 'hover:bg-custom-yellow'} text-base md:text-lg`}
                   disabled={selectedAnswers.length === 0}
                 >
                   <p className='text-white'>Continue to next question 🤩</p>
                 </button>
               </div>
             </div>
           </div>
         </div>
         
          
          )}
          {p === '/submit' && (
          <div className='flex w-full flex-col items-center justify-center'>
            <div className='tracking-wider m-auto bg-custom-gradient p-6 mt-2 w-full flex items-center justify-center'>
              <p className='font-light m-auto text-center'>Great, you did it! We'd love to get to know you further. 💛</p>
            </div>
          
            <div className='flex flex-col w-full space-y-8 px-8 sm:px-6'>
              <div className='text-center'>
                <p className='mt-10'>
                  <span className="text-custom-yellow text-base">
                    <strong className="font-semibold">Submit your application</strong>
                  </span>
                </p>
                <p className='mt-3'>
                  <span className="text-2xl sm:text-3xl md:text-4xl w-full md:leading-tight font-bold">
                    How can we best reach out to you?
                  </span>
                </p>
              </div>
          
            <div className='w-full'>
              <div className='rounded-md shadow-sm  -space-y-px md:w-[750px] lg:w-[800px] m-auto'>
                <div className='relative '>
                  <span className="absolute left-3 z-10 top-4 text-2xl ">👋</span>
                
                  {hasError.name  && (
                      <span className="absolute animate-drop  top-4 right-5 bg-red-500 mb-2 h-5 w-5 b z-10   rounded-full">
                         <Wrong/></span>
                  )} 
                 <Field 
                      type="text" 
                      name="name" 
                      placeholder=" Your full name" 
                      validate={(value: string) => validateField(value, 'name')}
                      className={ `appearance-none  rounded-none relative block w-full outline-none
                      top-0  border border-gray-300 placeholder-gray-500 duration-200  text-gray-900 rounded-t-md 
                      focus:bg-gray-50 font-light pl-14 focus:outline-none focus:ring-0
                       focus:z-0 sm:text-sm  h-[64px]  
                      ${(hasError.name) ? 'h-[90px] text-left  duration-200  pb-6  ' : ''}  focus:outline-none focus:shadow-outline`}
                      onFocus={() => setIsFocused((prevState) => ({ ...prevState, name:true,email:false ,phone: false }))}
                      
                  />
                    {hasError.name  && (
                      <p className="text-[#ef444a] text-xs  mt-2 absolute  ml-5 leading-tight left-10 z-10 top-12 font-light">
                        {hasError.name}
                      </p>
                    )}
                    
              </div>
              <div className='relative '>
                    <span className="absolute left-3 z-10 top-4 text-2xl ">✉️</span>
                      {hasError.email    && isFocused.email && (
                          <span className="absolute animate-drop  top-4 right-5 bg-red-500 mb-2 h-5 w-5 b z-10 rounded-full">
                             <Wrong/>
                          </span>
                      )}
                       {(!hasError.email    &&  hasError.email!=="")  && (
                          <span className="absolute animate-drop    top-4 right-6  mb-2 h-5 w-5 b z-10 ">
                             <True/>
                          </span>
                      )}
                <Field 
                     type="email" 
                     name="email" 
                     placeholder="Your e-mail address" 
                     validate={(value: string) => validateField(value, 'email')}
                     className={ `appearance-none  rounded-none relative block w-full outline-none
                       top-0  border border-gray-300 placeholder-gray-500 duration-200  text-gray-900 
                        focus:bg-gray-50 font-light pl-14 focus:outline-none focus:ring-0
                         focus:z-0 sm:text-sm  h-[64px]  
                         ${(hasError.email && isFocused.email) ? 'h-[90px] text-left  duration-200  pb-6  ' : ''}  focus:outline-none focus:shadow-outline`}
                           onFocus={() => setIsFocused((prevState) => ({ ...prevState, name:false,email:true ,phone: false}))}
                      />
                        {hasError.email  && isFocused.email && (
                            <p className="text-[#ef444a] text-xs  mt-2 absolute  ml-5 leading-tight left-10 z-10 top-12 font-light">
                              {hasError.email} 
                            </p>
                        )}
              </div>
              <div className='relative '>
              
                   <Image src="/images/tt.ico" alt="Email icon" width={24}
                     height={24} className='absolute  object-cover left-4 top-6 z-20'
                    />
                      {hasError.phone  && isFocused.phone  && (
                        <span className="absolute animate-drop  top-4 right-5 bg-red-500 mb-2 h-5 w-5 b z-10   rounded-full">
                           <Wrong/>
                        </span>
                      )} 
                      {!hasError.phone    &&  hasError.phone!==""  && (
                          <span className="absolute animate-drop    top-4 right-6  mb-2 h-5 w-5 b z-10 ">
                             <True/>
                          </span>
                      )}

                  <Field 
                      type="text" 
                      name="phone" 
                      placeholder="+" 
                      validate={(value: string) => validateField(value, 'phone')}
                      className={ `appearance-none  rounded-none relative block w-full outline-none
                      top-0  border border-gray-300 placeholder-gray-500 duration-200  text-gray-900 
                      focus:bg-gray-50 font-light pl-14 focus:outline-none focus:ring-0
                       focus:z-0 sm:text-sm  h-[64px]  
                      ${(hasError.phone && isFocused.phone) ? 'h-[90px] text-left  duration-200  pb-6  ' : ''}  focus:outline-none focus:shadow-outline`}
                      onFocus={() => setIsFocused((prevState) => ({ ...prevState, name:false,email:false ,phone: true }))}
                       />
                       {hasError.phone   && isFocused.phone &&(
                        <p className="text-[#ef444a] text-xs  mt-2 absolute  ml-5 leading-tight left-10 z-10 top-12 font-light">
                          {hasError.phone}
                        </p>
                      )}
              </div>
             
              <div
                className={`appearance-none  rounded-none relative block w-full outline-none
                          top-0  border   border-gray-300 placeholder-gray-500 duration-200
                            text-gray-900 rounded-b-md 
                          focus:bg-gray-50 font-light pl-4 focus:outline-none focus:ring-0
                          focus:z-0 sm:text-sm  h-[64px]  relative 
                          ${(hasError.privacyPolicy && isFocused.privacyPolicy) ? 
                            'h-[90px] text-left  duration-200  pb-6  ' : ''}  
                          focus:outline-none focus:shadow-outline`}
              >
                 {hasError.privacyPolicy    && isFocused.privacyPolicy && (
                          <span className="absolute animate-drop  top-4 right-5 bg-red-500 mb-2 h-5 w-5 b z-10 rounded-full">
                             <Wrong/>
                          </span>

                      )}
                <Field 
                      type="checkbox" 
                      name="privacyPolicy" 
                      validate={(value: boolean) => validateField(value, 'privacyPolicy')} 
                      className={`absolute top-7 left-6 h-4 w-4 duration-400 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 appearance-none border-2 border-grey-900 rounded transition-all duration-300
                    focus:outline-none focus:ring-0 checked:bg-white checked:border-green-600 checked-after:top-10
                    checked:after:content-['✔'] checked:after:text-green-600 checked:after:absolute
                    checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:transform
                    checked:after:text-sm checked:after:font-bold`}
                      onFocus={() => setIsFocused((prevState) => ({ 
                        ...prevState, 
                        name: false, 
                        email: false, 
                        phone: false, 
                        privacyPolicy: true 
                      }))}
                      onBlur={() => setIsFocused((prevState) => ({
                        ...prevState,
                        privacyPolicy: false
                      }))}
                      checked={(hasError.privacyPolicy ||  hasError.privacyPolicy=="" ) ? false : true}
                />
                <label htmlFor="privacyPolicy" className="  absolute   top-5 ml-8   z-10 text-sm text-gray-900">
                  I accept the <a href="/privacy-policy" className="text-gray-900 underline">privacy policy</a>.
                </label>
                    {hasError.privacyPolicy && isFocused.privacyPolicy && (
                      <p className="text-[#ef444a] text-xs mt-2 absolute ml-10 leading-tight left-5 z-10 top-12 font-light">
                        {hasError.privacyPolicy}
                      </p>
                    )}

              </div>

              <div  className=' md:w-3/5 m-auto pt-5'>
                    
                    <button
                      type="submit"
                      className={`w-full px-4 py-4 text-center rounded-lg mt-3 duration-300 text-white
                            bg-custom-yellow  text-2xl font-bold  cursor-not-allowed  
                            
                        ${((!hasError.name &&  hasError.name!=="") 
                        && (!hasError.email &&  hasError.email!=="")
                        && (!hasError.phone &&  hasError.phone!=="") 
                        && (!hasError.privacyPolicy &&  hasError.privacyPolicy!=="")   ) 
                          ? 'bg-custom-yellow  cursor-pointer    opacity-100 hover:bg-[#f3aa00]    ' 
                          : '  bg-custom-yellow opacity-50 hover:opacity-100     ' } 
                           `}
                    
                      onClick={() => setIsFocused((prevState) => ({ 
                        ...prevState, 
                        name: true, 
                        email: true, 
                        phone: true, 
                        privacyPolicy: true 
                      }))}
                      
                    >
                      Submit your application
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SurveyForm;


