import { getTodayTaskData, getUserData } from '@/actions/database';
import { getTaskData } from '@/actions/database';
import { getProjectData } from '@/actions/database';
import { ZenMenuClient } from './menu_C';


export async function ZenMenuS() {

  const userdata = await getUserData();
  const taskdata = await getTaskData();
  const todaystaskdata = await getTodayTaskData();
  const projectdata = await getProjectData();
  // console.log(projectdata)
  
  return (
    <>
      <nav className="flex  w-max h-full">

        <ZenMenuClient userdata={userdata} todaystaskdata={todaystaskdata} taskdata={taskdata} projectdata={projectdata} />

      </nav>
    </>
  )
}