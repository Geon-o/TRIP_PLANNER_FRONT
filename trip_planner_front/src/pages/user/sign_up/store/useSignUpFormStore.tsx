import {create} from "zustand/react";

const useSignUpFormStore = create((set) => ({
    // 특정 상황에서 버튼 disable 처리
    disabledEmailConfBtn: true,
    disabledDetailInfoBtn: true,
    disabledEmailAuthForm: false,
    isCheckDuplicatedIdForm: false,

    // 입력한 비밀번호 확인처리
    showPasswordText: false,
    // 이메일 인증 시 인증번호 입력란이 보여지도록 처리
    showEmailConf: false,
    // 인증번호 확인 후 정보입력란이 보여지도록 처리
    showDetailInfo: false,

    // 이메일 인증 시 버튼명
    emailTokenAuthBtnName: '인증',

    /**
     * 회원가입시 필수 입력사항으로
     * - 아이디
     * - 비밀번호
     * - 비밀번호 확인
     * 입력해야만 회원가입이 가능하도록 처리하기 위한 state
     */
    validId: true,
    validPassword: true,
    validPasswordCheck: true,

    setDisabledEmailConfBtn: (disabledEmailConfBtn: boolean) => set({disabledEmailConfBtn: disabledEmailConfBtn}),
    setDisabledDetailInfoBtn: (disabledDetailInfoBtn: boolean) => set({disabledDetailInfoBtn: disabledDetailInfoBtn}),
    setDisabledEmailAuthForm: (disabledEmailAuthForm: boolean) => set({disabledEmailAuthForm: disabledEmailAuthForm}),
    setIsCheckDuplicatedIdForm: (isCheckDuplicatedIdForm: boolean) => set({isCheckDuplicatedIdForm: isCheckDuplicatedIdForm}),

    setShowPasswordText: (showPasswordText: boolean) => set({showPasswordText: showPasswordText}),
    setShowEmailConf: (showEmailConf: boolean) => set({showEmailConf: showEmailConf}),
    setShowDetailInfo: (showDetailInfo: boolean) => set({showDetailInfo: showDetailInfo}),

    setValidId: (validId: boolean) => set({validId: validId}),
    setValidPassword: (validPassword: boolean) => set({validPassword: validPassword}),
    setValidPasswordCheck: (validPasswordCheck: boolean) => set({validPasswordCheck: validPasswordCheck}),

    setEmailTokenAuthBtnName: (emailTokenAuthBtnName: string) => set({emailTokenAuthBtnName: emailTokenAuthBtnName})
}));

export default useSignUpFormStore;