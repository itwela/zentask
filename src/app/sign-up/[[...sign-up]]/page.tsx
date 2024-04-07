'use client'
import ZenBottomBadge from '@/app/dashComponents/bottomZentask_C';
import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const SignUpPage = () => {    
    const router = useRouter();

    useEffect(() => {
      router.refresh();
    }, []);

    return (
      <>
  
          <div className="gradi h-screen bg-[#FFFDF6] w-screen flex place-items-center place-content-center">
              <div>
                  <SignUp
                   afterSignUpUrl={"/home"}
                   appearance={{
                    elements: {
                      card: 'shadow-none w-[50vw] bg-[#FFFDF6]',
                      formButtonPrimary: 'bg-lime-200 text-black hover:bg-lime-200/50',
                    }
                  }} />
              </div>
              <ZenBottomBadge />
          </div>
      </>
    );
};
export default SignUpPage;