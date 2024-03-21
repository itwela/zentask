import { ReactNode } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getProjectData, getTaskData } from '@/actions/database';
import Home from './page';


export default async function HomeS() {

  const taskdata = await getTaskData();
  const projectdata = await getProjectData();

  return (

      <div className='w-screen h-screen'>
        <div className="flex w-full h-full ">
          <ZenMenuS/>
          <main className='w-full'><Home taskdata={taskdata} projectdata={projectdata}/></main>
        </div>
      </div>

  );
}
