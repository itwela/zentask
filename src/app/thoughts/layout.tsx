import { ReactNode, Suspense } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getThoughtsData, getUserData } from '@/actions/database';
import Thoughts from './page';


export default async function ThoughtsS() {

  const thoughtdata = await getThoughtsData();

  return (
    <Suspense fallback={
      <div className='bg-[#FFFDF6] w-screen h-screen flex place-content-center place-items-center'>
        <h1 className='text-2xl animate-pulse'>Zentask</h1>
      </div>
    }>
      <div className="flex w-screen">
        <div className="flex w-full">
          <ZenMenuS />
          <main className='w-full'>
            <Thoughts thoughtdata={thoughtdata} />
          </main>
        </div>
      </div>
    </Suspense>
  );
}
