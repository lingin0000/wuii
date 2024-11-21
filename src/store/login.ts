import { create } from "zustand";

type Store = {
  login: boolean;
  setLogin: (login: boolean) => void;
};

const useLogin = create<Store>((set) => ({
  login: true,
  setLogin: (login: boolean) => set({ login }),
}));

export { useLogin };
