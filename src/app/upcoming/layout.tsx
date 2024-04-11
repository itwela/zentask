import { ReactNode, Suspense } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import Upcoming from './page';
import { getProjectData, getSectionData, getTaskData, getTodayTaskData, getUserData } from '@/actions/database';



export default async function UpcomingS() {

  const taskdata = await getTaskData();
  const projectdata = await getProjectData();
  const sectiondata = await getSectionData();


  return (
    <Suspense fallback={
      <div className='bg-[#FFFDF6] w-screen h-screen flex place-content-center place-items-center'>
        <h1 className='text-2xl animate-pulse'>Zentask</h1>
      </div>
    }>
    <div className="flex w-screen"> 
      <div className="flex w-full relative">
        <ZenMenuS/>
        <main className='w-full overflow-x-hidden'><Upcoming taskdata={taskdata} projectdata={projectdata} sectiondata={sectiondata}/></main>
      </div>
    </div>
</Suspense>
  );
}
