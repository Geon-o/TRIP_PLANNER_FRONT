import {create} from "zustand/react";

const useSignUpStore = create((set) => ({
    // 입력 폼 error 메시지 state
    idMessage: "" as string,
    emailMessage: "" as string,
    emailConfMessage: "" as string,
    passwordMessage: "" as string,
    passwordCheckMessage: "" as string,

    // 입력폼 유효값에 따른 폼 색상변경 state
    isId: false as boolean,
    isEmail: false as boolean,
    isEmailConf: false as boolean,
    isPassword: false as boolean,
    isPasswordCheck: false as boolean,

    setIdMessage: (message: string) => set({idMessage: message}),
    setEmailMessage: (message: string) => set({emailMessage: message}),
    setEmailConfMessage: (message: string) => set({emailConfMessage: message}),
    setPasswordMessage: (message: string) => set({passwordMessage: message}),
    setPasswordCheckMessage: (message: string) => set({passwordCheckMessage: message}),

    setIsId: (isId: boolean) => set({isId: isId}),
    setIsEmail: (isEmail: boolean) => set({isEmail: isEmail}),
    setIsEmailConf: (isEmailConf: boolean) => set({isEmailConf: isEmailConf}),
    setIsPassword: (isPassword: boolean) => set({isPassword: isPassword}),
    setIsPasswordCheck: (isPasswordCheck: boolean) => set({isPasswordCheck: isPasswordCheck}),
}));

export default useSignUpStore;
