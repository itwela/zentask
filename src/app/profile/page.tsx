'use client'

import { UserProfile } from '@clerk/nextjs';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';


const ProfilePage = () => {
  return (
    <>

          
          <div className='w-full h-full flex place-content-center'>
            
          <div className='w-full justify-start gap-8 h-screen bg-[#FFFDF6] py-8 flex flex-col place-content-center place-items-center'>
            
            <div className='w-[90vw] h-max flex justify-between place-content-start '>
              <h1 className='text-4xl font-bold'>Profile</h1>
              <Link href='/home'>
                <FaHome className='text-2xl' />
              </Link>
            </div>

            <UserProfile 
            appearance={{
                elements: {
                  card: 'shadow-none h-[90vh]  bg-[#FFFDF6]',
                }
              }}
            /> 
          </div>
          {/* bug fix */}
          </div>
    </>
  );
};

export default ProfilePage;