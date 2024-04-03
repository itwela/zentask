import { ReactNode } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getProjectData, getUserData } from '@/actions/database';
import Projects from './page';


export default async function ProjectsS() {

  const projectdata = await getProjectData();

  return (

    <div className="flex w-screen">
      <div className="flex w-full">
        <ZenMenuS/>
        <main className='w-full'><Projects projectdata={projectdata}/></main>
      </div>
    </div>

  );
}
