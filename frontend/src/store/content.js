import {create  } from 'zustand'

export const useContentStore = create((set) => ({
    content: "movie",
    setContentType: (type) => set({ content: type }),
}))