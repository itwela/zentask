export interface ZenUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string;
  profileImg: string | null;
}

export interface ZenProject {
  id: string;
  color: string | '';
  name: string | null;
  userId: string;
  projectId?: string | null;
}

export interface ZenSection {
  id: string;
  userId: string;
  name: string | null;
  projectId?: string;
  createdAt: string | null;
  updeatedAt: string | null;
}

export interface ZenTask {
  id: string;
  name: string | null;
  description: string | null;
  duedate: string | null;
  priority: string | null;
  completed: boolean | undefined;
  projectId: string | null;
  sectionId: string | null;
  createdAt: string | null;
  updeatedAt: string | null;
}

export interface ZenThoughts {
  id: string;
  name: string | null;
  content: string | null;
  createdAt: string | null;
  updeatedAt: string | null;
}

export interface ZenQuotes {
  id: string;
  name: string | null;
  content: string | null;
  createdAt: string | null;
  updeatedAt: string | null;
}

export interface ZenSubtask {
  id: string;
  name: string | null;
  description: string | null;
  duedate: string | null;
  priority: string | null;
}


// types------------------------------------------------



export type UserProps = {
  userdata: ZenUser | null;
}

export type ProjectProps = {
  projectdata: ZenProject[] | null;
}

export type SectionProps = {
  sectiondata: ZenSection[];
}

export type TaskProps = {
  taskdata: ZenTask[];
}

export type SubtaskProps = {
  subtaskdata: ZenSubtask[];
}

