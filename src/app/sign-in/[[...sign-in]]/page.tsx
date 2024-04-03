'use client'
import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    
  return (
    <>

        <div className="gradi h-screen bg-[#FFFDF6] w-screen flex place-items-center place-content-center">
            <div>
                <SignIn />
            </div>
        </div>
    </>
  );
};
export default SignInPage;