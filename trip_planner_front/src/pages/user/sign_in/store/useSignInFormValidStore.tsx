import {create} from "zustand/react";

const useSignInFormValidStore = create((set) => ({
    isId: false as boolean,
    isPassword: false as boolean,

    setIsId: (isId: boolean) => set({isId: isId}),
    setIsPassword: (isPassword: boolean) => set({isPassword: isPassword}),

    idMessage: "" as string,
    passwordMessage: "" as string,

    setIdMessage: (idMessage: string) => set({idMessage: idMessage}),
    setPasswordMessage: (passwordMessage: string) => set({passwordMessage: passwordMessage}),

    isNotInputId: true as boolean,
    isNotInputPassword: true as boolean,

    setIsNotInputId: (isNotInputId: boolean) => set({isNotInputId: isNotInputId}),
    setIsNotInputPassword: (isNotInputPassword: boolean) => set({isNotInputPassword: isNotInputPassword})
}));

export default useSignInFormValidStore;