import {create} from "zustand/react";

const useSignInFormStore = create((set) => ({
    userId: "",
    password: "",

    setUserId: (userId: string) => set({userId: userId}),
    setPassword: (password: string) => set({password: password}),
}))

export default useSignInFormStore;