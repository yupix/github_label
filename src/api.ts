import { apiClient } from "strictcat";

export const api = apiClient<Schema>("https://api.github.com", {});
