import { ETaskPriority, ETaskStatus } from "./enums";
export interface IUser {
  id: number;
  name: string;
}
export interface ITask {
  tid: number;
  uid: number;
  title: string;
  description: string;
  status: ETaskStatus;
  priority: ETaskPriority;
}
