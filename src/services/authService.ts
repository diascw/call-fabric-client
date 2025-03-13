import { AuthUser } from "@/types/Auth";

export const authenticateUser = async (email: string, password: string): Promise<AuthUser> => {
  const usersDb: AuthUser[] = JSON.parse(localStorage.getItem("users") || "[]");

  const user = usersDb.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
};
