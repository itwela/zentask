import { ReactNode } from 'react';
import { ZenMenuS } from '../../../dashComponents/menu_S';
import { getProjectData, getTaskData, getUserData } from '@/actions/database';
import EditTask from './page';


export default async function EditTaskS() {

  const taskdata = await getTaskData();
  const projectdata = await getProjectData();  

  return (

    <div className="flex w-screen h-screen">
      <div className="flex w-full h-full">
        <ZenMenuS/>
        <main className='w-full h-full'><EditTask taskdata={taskdata} projectdata={projectdata}/></main>
      </div>
    </div>

  );
}
