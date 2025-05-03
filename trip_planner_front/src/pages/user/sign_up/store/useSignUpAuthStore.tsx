import {EmailAuthInfo} from "@pages/user/sign_up/types/EmailAuthInfo.tsx";
import {create} from "zustand/react";

const useSignUpAuthStore = create((set) => ({
    /**
     * 이메일 인증 관련 데이터
     *
     * @param
     * - email: 이메일 주소
     * - deadlineTime: 인증 시간
     */
    emailAuthInfo: {} as EmailAuthInfo,

    /**
     * 이메일로부터 받은 인증번호 데이터
     */
    token: '' as string,
    userId: '' as string,
    password: '' as string,

    setEmailAuthInfo: (emailAuthInfo: EmailAuthInfo) => set({emailAuthInfo: emailAuthInfo}),
    setToken: (token: string) => set({token: token}),
    setUserId: (userId: string) => set({userId: userId}),
    setPassword: (password: string) => set({password: password})
}))

export default useSignUpAuthStore;
