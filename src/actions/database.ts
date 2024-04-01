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

// END USER STUFF ------------------------------------------------

// 

// ------------------ section functions -------------------------------------------------------

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

//  this adds section
export async function addSection(formData: FormData) {
  noStore();
  const requestBody = formData;
  
  const formSectionName = formData.get('sectionname') as string;
  const formProject = formData.get('project') as string;

  console.log('old project: ', formProject);

  let sectiondata: any = {
    userId: uId,
    name: formSectionName,
  };

  if (formProject != "Inbox") {
    sectiondata.projectId = formProject;
  }

  console.log('new project: ', sectiondata.projectId);

  const apiAdd = await prisma?.section.create({
    data: sectiondata
  });

  revalidatePath("/");
}

//  this updates section
export const updateSectionData = async (formData: FormData) => {
  
  const sectionId = formData.get('sectionId') as string
  const formSectionName = formData.get('sectionname') as string;
  const formProject = formData.get('project') as string;

  console.log('the Name', formSectionName);
  console.log('old project: ', formProject);

  let sectiondata: any = {
    userId: uId,
    name: formSectionName,
  };

  if (formProject != "Inbox") {
    sectiondata.projectId = formProject;
  }

  console.log('new project: ', sectiondata.projectId);

  const apiAdd = await prisma?.section.update({
    where: {
      id: sectionId,
    },
    data: sectiondata  
  });

  revalidatePath("/");

}

//  this deletes section
export const deleteSectionData = async (formData: FormData) => {
  noStore();

  const sectionId = formData.get('sectionId') as string

  // Delete all found tasks
  await prisma.task.deleteMany({
    where: {
      sectionId: sectionId,
    },
  });

  // Delete the section itself
  await prisma.section.delete({
    where: {
      id: sectionId,
    },
  });

  revalidatePath('/');
}

// this is the function to add tasks to the database based on user
export async function addSectionTask(formData: FormData) {
  noStore();
  const requestBody = formData;
  
  const formSectionId = formData.get('sectionId') as string
  const formTaskName = formData.get('name') as string;
  const formDescription = formData.get('description') as string;
  const formDueDate = formData.get('duedate') as string;
  const formPriority = formData.get('priority') as string;
  const formProject = formData.get('project') as string;

  let sectionTaskData: any = {
    userId: uId,
    sectionId: formSectionId, 
    name: formTaskName,
    description: formDescription,
    duedate: formDueDate, 
    priority: formPriority,
  };

  if (formProject != "Inbox") {
    sectionTaskData.projectId = formProject;
  }

  console.log('new project: ', sectionTaskData.projectId);

  const apiAdd = await prisma?.task.create({
      data: sectionTaskData 
  });

  revalidatePath("/");
}

export const updateSectionTaskData = async (formData: FormData) => {
  
  const sectionId = formData.get('sectionId') as string
  
  updateTaskData(formData, sectionId);
}


// END SECTION STUFF ------------------------------------------------

// 

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

// END PROJECT STUFF ------------------------------------------------

// 

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

export const updateTaskData = async (formData: FormData, sectionId?: string, projectId?: string) => {
  noStore();

  const taskId = formData.get('taskId') as string
  const theSectionID = sectionId
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

  if (theSectionID != undefined) {
    taskData.sectionId = theSectionID
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

// END TASK STUFF ------------------------------------------------

// 

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

// END SUBTASK STUFF ------------------------------------------------


//  ---------------- thoughts functions -----------------------------------------------

//  this gets thoughts Data
export async function getThoughtsData() {
  noStore();
  const data = await prisma.thought.findMany({
    where: {
      userId: uId
  },
  orderBy: {
      createdAt: 'desc'
  },
});
  
  return data;
}

//  this adds thoughts
export async function addThoughts(formData: FormData) {
  noStore();
  const requestBody = formData;
  
  const formSectionName = formData.get('thoughtname') as string;

  let thoughtdata: any = {
    userId: uId,
    name: formSectionName,
  };

  const apiAdd = await prisma?.thought.create({
    data: thoughtdata
  });

  revalidatePath("/");
}

//  this updates thoughts
export const updateThoughtsData = async (formData: FormData) => {
  
  const thoughtId = formData.get('thoughtId') as string
  const formThoughtName = formData.get('thoughtname') as string;


  let thoughtdata: any = {
    userId: uId,
    name: formThoughtName,
  };


  const apiAdd = await prisma?.thought.update({
    where: {
      id: thoughtId,
    },
    data: thoughtdata  
  });

  revalidatePath("/");

}

//  this deletes thoughts
export const deleteThoughtsData = async (formData: FormData) => {
  noStore();

  const thoughtId = formData.get('thoughtId') as string

  // Delete the section itself
  await prisma.thought.delete({
    where: {
      id: thoughtId,
    },
  });

  revalidatePath('/');
}

// END THOUGHTS STUFF ------------------------------------------------


//  ---------------- quotes functions -----------------------------------------------

//  this gets quotes Data
export async function getQuotesData() {
  noStore();
  const data = await prisma.quote.findMany({
    where: {
      userId: uId
  },
  orderBy: {
      createdAt: 'desc'
  },
});
  
  return data;
}

//  this adds quotes
export async function addQuotes(formData: FormData) {
  noStore();
  const requestBody = formData;
  
  const formQuoteName = formData.get('name') as string;


  let quotedata: any = {
    userId: uId,
    name: formQuoteName,
  };


  const apiAdd = await prisma?.quote.create({
    data: quotedata
  });

  revalidatePath("/");
}

//  this updates quotes
export const updateQuotesData = async (formData: FormData) => {
  
  const quoteId = formData.get('sectionId') as string
  const formQuoteName = formData.get('name') as string;

  let quotedata: any = {
    userId: uId,
    name: formQuoteName,
  };

  const apiAdd = await prisma?.quote.update({
    where: {
      id: quoteId,
    },
    data: quotedata  
  });

  revalidatePath("/");

}

//  this deletes thoughts
export const deleteQuotesData = async (formData: FormData) => {
  noStore();

  const quoteId = formData.get('quoteId') as string

  // Delete the section itself
  await prisma.quote.delete({
    where: {
      id: quoteId,
    },
  });

  revalidatePath('/');
}

// END QUOTES STUFF ------------------------------------------------
