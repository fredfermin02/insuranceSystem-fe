'use client'
import React, {  useState, type ReactElement } from 'react';
import { UserSignupForm } from './components/singupForm';
import { Button } from '@/components/ui/button';
import { UserLoginForm } from './components/loginForms';



const authPage = (): ReactElement => {
const [showLogin, setShowLogin] = useState<Boolean>(false)
const toggleLogin =()=>{
    setShowLogin(!showLogin)
}

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center bg-background md:grid md:grid-cols-2">
      
      
      {/* Block that shows only on large screens */}
      <div className="hidden md:flex bg-primary items-center justify-center h-full w-full">
        {/* Content inside the block */}
        <h2 className="text-white text-4xl font-bold px-10">Welcome to Monitoring Center</h2>
      </div>
      
      <div className="max-w-5xl flex flex-col items-center lg:w-full lg:flex lg:justify-center">
      <Button onClick={toggleLogin} className='absolute top-8 right-6'>{showLogin?'Log In':'Sign Up'}</Button>
        <h1 className=" md:hidden text-center font-semibold font-roboto text-primary text-3xl sm:text-4xl md:text-4xl 3xl:text-[64px] my-1 mt-3 3xl:mt-4">
          MONITORING CENTER
        </h1>
        {showLogin?<UserSignupForm></UserSignupForm>:<UserLoginForm></UserLoginForm>}
        
      </div>
    </section>
  );
};

export default authPage;
