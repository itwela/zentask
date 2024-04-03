'use client'

import { UserProfile } from '@clerk/nextjs';


const ProfilePage = () => {
  return (
    <>

          
          <div className='w-full h-full flex place-content-center'>
          <div className='w-full h-full flex place-content-center py-8'>
            <UserProfile /> 
          </div>
          {/* bug fix */}
          </div>
    </>
  );
};

export default ProfilePage;