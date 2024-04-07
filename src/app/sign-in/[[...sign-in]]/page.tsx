'use client'
import ZenBottomBadge from '@/app/dashComponents/bottomZentask_C';
import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const SignInPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>

        <div className="gradi h-screen bg-[#FFFDF6] w-screen flex place-items-center place-content-center">
            <div className="">
                <SignIn
                 afterSignInUrl={"/home"}
                 appearance={{
                  elements: {
                    card: 'shadow-none w-[50vw] bg-[#FFFDF6]',
                    formButtonPrimary: 'bg-lime-200 text-black hover:bg-lime-200/50',
                  }
                  }}/>
                  <ZenBottomBadge />
            </div>
        </div>
    </>
  );
};
export default SignInPage;