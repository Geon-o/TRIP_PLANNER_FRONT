import {debounce, DebouncedFunc} from "lodash";
import * as React from "react";
import {useMemo} from "react";
import useSignInFormValidStore from "@pages/user/sign_in/store/useSignInFormValidStore.tsx";
import useSignInFormStore from "@pages/user/sign_in/store/useSignInFormStore.tsx";

export const useSignInHandle = () => {
    const {
        setIsId, setIsPassword, setIdMessage, setPasswordMessage,
        setIsNotInputId, setIsNotInputPassword
    } = useSignInFormValidStore();

    const {
        setUserId, setPassword
    } = useSignInFormStore();

    const handleId: DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void> = useMemo(() =>
            debounce((e: React.ChangeEvent<HTMLInputElement>) => {

                if (e.target.value.length === 0) {
                    setIsId(true);
                    setIsNotInputId(true);
                    setIdMessage('아이디를 입력해주세요');
                    return;
                }

                setIsId(false);
                setIsNotInputId(false);
                setIdMessage('');
                setUserId(e.target.value);
            }, 100),
        [],
    )

    const handlePassword: DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void> = useMemo(() =>
            debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
                if (e.target.value.length === 0) {
                    setIsPassword(true);
                    setIsNotInputPassword(true);
                    setPasswordMessage('비밀번호를 입력해주세요');
                    return;
                }

                if (!passwordRegex.test(e.target.value)) {
                    setIsPassword(true);
                    setIsNotInputPassword(true);
                    setPasswordMessage('숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요.');
                    return;
                }

                setIsPassword(false);
                setIsNotInputPassword(false);
                setPasswordMessage('');
                setPassword(e.target.value);
            }, 100),
        [],
    );

    return {
        handleId,
        handlePassword,
    }
}