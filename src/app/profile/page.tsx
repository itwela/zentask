'use client'

import { UserProfile } from '@clerk/nextjs';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { deleteAllUserData } from '@/actions/database';

const ProfilePage = () => {

  // delete all data
  const getdelicon = document.getElementsByClassName('cl-formButtonPrimary 🔒️ cl-internal-1m20egv')

  getdelicon[0]?.addEventListener('click', () => {
    const deleteAllData = async function () {
      deleteAllUserData();
    }
  });

  return (
    <>

          
          <div className='w-full h-full flex place-content-center'>
            
          <div className='w-full mx-5 my-[4em] sm:my-3 justify-start gap-8  bg-[#FFFDF6] py-8 flex flex-col place-content-center place-items-center'>
            
            <div className='w-full h-max flex justify-between place-content-start '>
              <h1 className='text-4xl font-bold'>Profile</h1>
            </div>

            <UserProfile 
            appearance={{
                elements: {
                  card: 'shadow-none h-[90vh] w-full bg-[#FFFDF6]',
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