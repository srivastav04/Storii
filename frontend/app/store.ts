import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  userName: string;
  fullName: string;
  bio: string;
  avatar: string;
  currentUserId: string;
  isAdmin: boolean;

  setUser: (data: {
    userName: string;
    fullName: string;
    bio: string;
    avatar: string;
    currentUserId: string;
  }) => void;

  clearUser: () => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userName: "",
      fullName: "",
      bio: "",
      avatar: "",
      currentUserId: "",
      isAdmin: false,

      setUser: ({ userName, fullName, bio, avatar, currentUserId }) =>
        set({ userName, fullName, bio, avatar, currentUserId }),

      setIsAdmin: (isAdmin) => set({ isAdmin }),

      clearUser: () =>
        set({
          userName: "",
          fullName: "",
          bio: "",
          avatar: "",
          currentUserId: "",
        }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);
