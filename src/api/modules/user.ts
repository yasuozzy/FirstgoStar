import { http } from "@/utils/request";

export interface RemoteUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export function getRemoteUser(id = 1) {
  return http.get<RemoteUser>(`/users/${id}`);
}
