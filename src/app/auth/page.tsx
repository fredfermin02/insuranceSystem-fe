'use client'
import React, {  useState, type ReactElement } from 'react';
import { Button } from '@/components/ui/button';
import { UserLoginForm } from './components/loginForms';
import { UserSignupForm } from './components/singupForm';







const authPage = (): ReactElement => {
const [showLogin, setShowLogin] = useState<Boolean>(false)
const toggleLogin =()=>{
    setShowLogin(!showLogin)
}

  return (
    <section>
      
      
      
      
      <Button onClick={toggleLogin} className='absolute top-8 right-6'>{showLogin?'Log In':'Sign Up'}</Button>
        <h1 className=" md:hidden text-center font-semibold font-roboto text-primary text-3xl sm:text-4xl md:text-4xl 3xl:text-[64px] my-1 mt-3 3xl:mt-4">
          
          MONITORING CENTER
        </h1>
        {showLogin?<UserSignupForm></UserSignupForm>:<UserLoginForm></UserLoginForm>}
        
    </section>
  );
};

export default authPage;
