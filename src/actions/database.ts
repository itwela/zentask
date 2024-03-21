'use server'

import prisma from "@/libs/db";
import { auth, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { FONT_MANIFEST } from "next/dist/shared/lib/constants";

const uId = '1Itwela';


//  this gets userData
export async function getUserData() {
    noStore();
    const data = prisma.user.findUnique({
      where: {
        id: uId
      },
    });
    
    return data;
  }


//  this gets section Data
export async function getSectionData() {
  noStore();
  const data = await prisma.section.findMany({
    where: {
      userId: uId
  },
  orderBy: {
      createdAt: 'desc'
  },
});
  
  return data;
}

// ------------------ project functions -------------------------------------------------------

//  this gets Project Data
export async function getProjectData() {
  noStore();
  const data = await prisma.project.findMany({
    where: {
      userId: uId
  },
  orderBy: {
      createdAt: 'desc'
  },
});
  
  return data;
}

// this is the function to add projects to the database based on user
export async function addProject(formData: FormData) {
  // noStore();
  const requestBody = formData;
  console.log('the request body:', requestBody)   
  const uId = '1Itwela';

  const formProjectName = formData.get('name') as string;
  const formColor = formData.get('color') as string;
  
  const apiAdd = await prisma?.project.create({
      data: {
          name: formProjectName,
          color: formColor,
          userId: uId,
      }
      
    })

    revalidatePath("/")       
}


export const deleteProjectData = async (formData: FormData) => {
  noStore();

  const projectId = formData.get('projectId') as string
  console.log('projectId: ',projectId)
  const deleteProject = await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath('/')
}

// ------------------ task functions -------------------------------------------------------

// this gets todays task data
export async function getTodayTaskData() {
  noStore();
  const currentDate = new Date().toISOString(); // Get current date and time in ISO format
  const todayDate = currentDate.substring(0, 10); // Extract only the date part
  const startTime = todayDate + 'T00:00:00.00Z'; // Start time of the current day
  const endTime = todayDate + 'T23:59:59.999Z'; // End time of the current day

  const data = await prisma.task.findMany({
    where: {
      userId: uId,
      createdAt: {
        gte: new Date(startTime), // Filter tasks created after the start time of today
        lte: new Date(endTime),   // Filter tasks created before the end time of today
      },
    },
  });

  console.log(data)
  return data;
}


//  this gets alltask Data
export async function getTaskData() {
  noStore();
  const data = await prisma.task.findMany({
    where: {
      userId: uId
  },
  orderBy: {
      createdAt: 'desc'
  },
});
  
  return data;
}

// this is the function to add tasks to the database based on user
export async function addTask(formData: FormData) {
  noStore();
  const requestBody = formData;
  
  const formTaskName = formData.get('name') as string;
  const formDescription = formData.get('description') as string;
  const formDueDate = formData.get('duedate') as string;
  const formPriority = formData.get('priority') as string;
  const formProject = formData.get('project') as string;

  console.log('old project: ', formProject);

  let taskData: any = {
    userId: uId,
    name: formTaskName,
    description: formDescription,
    duedate: formDueDate, 
    priority: formPriority,
  };

  if (formProject != "Inbox") {
    taskData.projectId = formProject;
  }

  console.log('new project: ', taskData.projectId);

  const apiAdd = await prisma?.task.create({
      data: taskData 
  });

  revalidatePath("/");
}


export const updateTaskData = async (formData: FormData) => {
  noStore();

  const taskId = formData.get('taskId') as string
  const formTaskName = formData.get('name') as string;
  const formDescription = formData.get('description') as string;
  const formDueDate = formData.get('duedate') as string;
  const formPriority = formData.get('priority') as string;
  const formProject = formData.get('project') as string;
  
  let taskData: any = {
    userId: uId,
    name: formTaskName,
    description: formDescription,
    duedate: formDueDate, 
    priority: formPriority,
  };

  if (formProject != "Inbox") {
    taskData.projectId = formProject;
  }

  const apiAdd = await prisma?.task.update({

    where: {
        id: taskId,
    },
    data: taskData
})

    revalidatePath("/")

}


//  this is the function to delete jobs
export const deleteTaskData = async (formData: FormData) => {
  noStore();

  const taskId = formData.get('taskId') as string

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath('/')
  

}

// ---------------- subtask functions -----------------------------------------------

//  this gets task Data
export async function getSubtaskData() {
  noStore();
  const data = await prisma.subtask.findMany({
    where: {
      userId: uId
  },
  orderBy: {
      createdAt: 'desc'
  },
});
  
  return data;
}





