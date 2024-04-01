import { ReactNode } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getProjectData, getQuotesData, getSectionData, getTaskData, getThoughtsData } from '@/actions/database';
import Home from './page';


export default async function HomeS() {

  const taskdata = await getTaskData();
  const projectdata = await getProjectData();
  const sectiondata = await getSectionData();
  const thoughtdata = await getThoughtsData();
  const quoteData = await getQuotesData();

  return (

      <div className='w-screen h-screen'>
        <div className="flex w-full h-full ">
          <ZenMenuS/>
          <main className='w-full'><Home taskdata={taskdata} projectdata={projectdata} sectiondata={sectiondata} thoughtdata={thoughtdata} quotedata={quoteData}/></main>
        </div>
      </div>

  );
}
