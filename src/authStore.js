import { create } from "zustand";
const authStore = (set) => ({
  userInfo: {},
  updateUserInfo: (result) => {
    set((state) => ({
      userInfo: result
    }))
  }
})

export const useAuthStore = create(authStore);