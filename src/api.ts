import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
  return response.data;
}
