import { updateUserData } from '@/actions/database';
import { ZenMenuS } from '../dashComponents/menu_S';
import ProfilePage from './page';
import { Suspense } from 'react';


export default async function ProfileS() {

  const updateuser = await updateUserData();

  return (
    <Suspense fallback={
      <div className='bg-[#FFFDF6] w-screen h-screen flex place-content-center place-items-center'>
        <h1 className='text-2xl animate-pulse'>Zentask</h1>
      </div>
    }>
      <div className="w-screen   bg-[#FFFDF6]  ">
        <div className="flex w-full  h-screen overflow-hidden">
          <ZenMenuS />
          <main className="w-full h-full   bg-[#FFFDF6]">
            <ProfilePage />
          </main>
        </div>
      </div>
    </Suspense>
  );
}
