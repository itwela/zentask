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
  name: string | null;
  color: string | null;
  userId: string;
}

export interface ZenSection {
  id: string;
  name: string | null;
  projectId: string;
}

export interface ZenTask {
  id: string;
  name: string | null;
  description: string | null;
  duedate: string | null;
  priority: string | null;
  projectId: string | null;
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
  projectdata: ZenProject[]
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

