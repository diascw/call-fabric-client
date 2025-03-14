import { AuthUser } from "@/types/Auth";

const getStoredUsers = (): AuthUser[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

const saveUserSession = (user: AuthUser): void => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const authenticateUser = async (email: string, password: string): Promise<AuthUser> => {
  const usersDb = getStoredUsers();
  const user = usersDb.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  saveUserSession(user);
  return user;
};
