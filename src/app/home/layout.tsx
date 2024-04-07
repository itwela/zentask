import { ClerkProvider } from '@clerk/nextjs';
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import prisma from "../../libs/db";
import { ReactNode } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getProjectData, getQuotesData, getSectionData, getTaskData, getThoughtsData, updateUserData } from '@/actions/database';
import Home from './page';
import { currentUser } from '@clerk/nextjs';


async function fetchData() {
  noStore();

  const clerkuser = await currentUser();

  // find user in database
  const user = await prisma.user.findUnique({
    where: {
      id: clerkuser?.id,
    },
    select: {
      id: true,
    },
  });

  // create user in database
  if (!user) {
    await prisma.user.create({
      data: {
        id: clerkuser?.id as string,
        email: clerkuser?.emailAddresses[0].emailAddress as string,
        firstName: clerkuser?.firstName as string,
        lastName: clerkuser?.lastName as string,
        username: clerkuser?.username as string,
        profileImg: clerkuser?.imageUrl as string,
      },
    });
  }

  // update user
  if(user) {
    const updateuser = await updateUserData();
  }


}

export default async function HomeS() {

  try {
    const findUser = await fetchData();
  
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

  } catch (error) {
    
  }


}
