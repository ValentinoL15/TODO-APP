export interface User {
  email: string;
  password: string;
}

export interface Task {
  _id?: any,
  title: string;
  description: string;
  priority: string;
  state: string;
  labels: { name: string }[];
  createdAt?: string;
  updatedAt?: string;
}