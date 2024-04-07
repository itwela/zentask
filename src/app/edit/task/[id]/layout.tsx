import { ReactNode, Suspense } from 'react';
import { ZenMenuS } from '../../../dashComponents/menu_S';
import { getProjectData, getTaskData, getUserData } from '@/actions/database';
import EditTask from './page';


export default async function EditTaskS() {

  const taskdata = await getTaskData();
  const projectdata = await getProjectData();

  return (
    <Suspense fallback={
      <div className='bg-[#FFFDF6] w-screen h-screen flex place-content-center place-items-center'>
        <h1 className='text-2xl animate-pulse'>Zentask</h1>
      </div>
    }>
      <div className="flex w-screen h-screen">
        <div className="flex w-full h-full">
          <ZenMenuS />
          <main className='w-full h-full'><EditTask taskdata={taskdata} projectdata={projectdata} /></main>
        </div>
      </div>
    </Suspense>
  );
}
