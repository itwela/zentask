import { ReactNode, Suspense } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getUserData } from '@/actions/database';
import Activity from './page';


export default async function ActivityS() {

  return (
    <Suspense fallback={
      <div className='bg-[#FFFDF6] w-screen h-screen flex place-content-center place-items-center'>
        <h1 className='text-2xl animate-pulse'>Zentask</h1>
      </div>
    }>
      <div className="flex">
        <div className="flex">
          <ZenMenuS />
          <main><Activity /></main>
        </div>
      </div>
    </Suspense>
  );
}
