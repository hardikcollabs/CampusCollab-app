export type ProjectStatus = "Open" | "Full" | "In Progress" | "Completed" | "Archived";
export type RequestStatus = "Pending" | "Accepted" | "Rejected" | "Withdrawn";
export type TaskStatus = "To Do" | "In Progress" | "Done";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  owner: string;
  college: string;
  needed: number;
  members: number;
  deadline: string;
  commitment: string;
  status: ProjectStatus;
  featured?: boolean;
};
