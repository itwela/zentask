'use client'
import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


const SignUpPage = () => {    

    return (
      <>
  
          <div className="gradi h-screen bg-[#FFFDF6] w-screen flex place-items-center place-content-center">
              <div>
                  <SignUp />
              </div>
          </div>
      </>
    );
};
export default SignUpPage;