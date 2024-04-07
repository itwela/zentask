import { ReactNode, Suspense } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getUserData } from '@/actions/database';
import Projects from '../projects/page';
import Quotes from './page';


export default async function QuotesS() {

  return (
    <Suspense fallback={
      <div className='bg-[#FFFDF6] w-screen h-screen flex place-content-center place-items-center'>
        <h1 className='text-2xl animate-pulse'>Zentask</h1>
      </div>
    }>
    <div className="flex">
      <div className="flex">
        <ZenMenuS/>
        <main><Quotes/></main>
      </div>
    </div>
</Suspense>
  );
}
