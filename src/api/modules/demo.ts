import { http } from "@/utils/request";

export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function getTodoById(id = 1) {
  return http.get<TodoItem>(`/todos/${id}`);
}
