import { ReactNode } from 'react';
import { ZenMenuS } from '../../../dashComponents/menu_S';
import { getProjectData, getSectionData, getTaskData, getUserData } from '@/actions/database';
import EditProject from './page';


export default async function EditProjectS() {

  const taskdata = await getTaskData();
  const projectdata = await getProjectData(); 
  const sectiondata = await getSectionData(); 

  return (

    <div className="flex w-screen h-screen">
      <div className="flex w-full h-full">
        <ZenMenuS/>
        <main className='w-full h-full'><EditProject taskdata={taskdata} projectdata={projectdata} sectiondata={sectiondata}/></main>
      </div>
    </div>

  );
}
