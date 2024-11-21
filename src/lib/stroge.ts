import { USER_INFO } from "@/const/stroge";

export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const setUserInfo = (value: any) => {
  setItem(USER_INFO, value);
};

export const getUserInfo = () => {
  return getItem(USER_INFO);
};

export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO);
};

export const clear = () => {
  localStorage.clear();
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
