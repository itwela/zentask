'use client'
import ZenBottomBadge from '@/app/dashComponents/bottomZentask_C';
import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { SignedIn, SignedOut, ClerkLoading } from '@clerk/nextjs';


const SignInPage = () => {
  const router = useRouter();
  
  const getStuck = () => {
    router.refresh();
  }

  return (
    <>

        <div className="gradi h-screen bg-[#FFFDF6] w-screen flex flex-col place-items-center place-content-center">
                <div className='w-max h-max'>
                  <span onClick={() => getStuck()} className='hover:text-lime-500 underline cursor-pointer flex place-self-end' >Stuck?</span>
                  <SignIn
                   appearance={{
                    elements: {
                      card: 'shadow-none w-[50vw] bg-[#FFFDF6]',
                      formButtonPrimary: 'bg-lime-200 text-black hover:bg-lime-200/50',
                    }
                    }}/>
                </div>
                  <ZenBottomBadge />
        </div>
    </>
  );
};
export default SignInPage;