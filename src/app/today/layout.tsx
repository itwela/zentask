import { ReactNode, Suspense } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getProjectData, getSectionData, getTaskData, getTodayTaskData, getUserData } from '@/actions/database';
import Today from './page';


export default async function TodayS() {
  const todaystaskdata = await getTodayTaskData();
  const projectdata = await getProjectData();
  const sectiondata = await getSectionData();

  return (
    <Suspense fallback={
      <div className='bg-[#FFFDF6] w-screen h-screen flex place-content-center place-items-center'>
        <h1 className='text-2xl animate-pulse'>Zentask</h1>
      </div>
    }>
    <div className="w-screen h-screen">
      <div className="flex w-full h-full">
        <ZenMenuS/>
        <main className='w-full'><Today taskdata={todaystaskdata} projectdata={projectdata} sectiondata={sectiondata}/></main>
      </div>
    </div>
</Suspense>
  );
}
