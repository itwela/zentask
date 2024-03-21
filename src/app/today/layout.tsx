import { ReactNode } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getProjectData, getTaskData, getTodayTaskData, getUserData } from '@/actions/database';
import Today from './page';


export default async function TodayS() {
  const todaystaskdata = await getTodayTaskData();
  const projectdata = await getProjectData();

  return (

    <div className="w-screen h-screen">
      <div className="flex w-full h-full">
        <ZenMenuS/>
        <main className='w-full'><Today taskdata={todaystaskdata} projectdata={projectdata}/></main>
      </div>
    </div>

  );
}
