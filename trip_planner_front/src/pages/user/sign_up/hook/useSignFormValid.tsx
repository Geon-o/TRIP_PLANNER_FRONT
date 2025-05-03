import {debounce, DebouncedFunc} from "lodash";
import * as React from "react";
import {useMemo} from "react";
import useSignUpStore from "@pages/user/sign_up/store/useSignUpStore.tsx";
import useSignUpAuthStore from "@pages/user/sign_up/store/useSignUpAuthStore.tsx";
import useSignUpFormStore from "@pages/user/sign_up/store/useSignUpFormStore.tsx";

export const useSignFormValid = () => {
    const {
        setIsId, setIsEmail,
        setIsEmailConf, setIsPassword,
        setIsPasswordCheck, setIdMessage,
        setEmailMessage, setEmailConfMessage,
        setPasswordMessage, setPasswordCheckMessage
    } = useSignUpStore();

    const {
        setUserId, setToken, setEmailAuthInfo,
        password, setPassword
    } = useSignUpAuthStore();

    const {
        setDisabledEmailConfBtn, setDisabledDetailInfoBtn,
        setValidId, setValidPassword, setValidPasswordCheck,
    } = useSignUpFormStore();

    const handleId: DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void> = useMemo(() =>
        debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length < 2 || e.target.value.length > 8) {
                setIdMessage('2글자 이상 8글자 미만으로 입력해주세요.');
                setIsId(true);
                setValidId(true);
                return;
            }

            setIdMessage('');
            setIsId(false);
            setValidId(false);
            setUserId(e.target.value);
        }, 100), []);

    const handleEmail: DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void> = useMemo(() =>
        debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            setEmailAuthInfo({
                email: e.target.value,
                deadlineTime: 5
            });

            if (!emailRegex.test(e.target.value)) {
                setEmailMessage('올바른 이메일 주소를 입력해주세요.');
                setDisabledEmailConfBtn(true);
                setIsEmail(true);
            } else {
                setEmailMessage('');
                setDisabledEmailConfBtn(false);
                setIsEmail(false);
            }
        }, 100), [],);

    const handleEmailConf: DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void> = useMemo(() =>
        debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length > 6) {
                setEmailConfMessage('인증 번호를 확인해주세요');
                setDisabledDetailInfoBtn(true);
                return;
            }

            if (e.target.value.length === 0) {
                setEmailConfMessage('인증번호를 입력해주세요.');
                setIsEmailConf(true);
                setDisabledDetailInfoBtn(true);
                return;
            }

            setEmailConfMessage('');
            setDisabledDetailInfoBtn(false);
            setIsEmailConf(false);
            setToken(e.target.value);
        }, 100), [],);

    const handlePassword: DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void> = useMemo(() =>
        debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
            setPassword(e.target.value);

            if (e.target.value.length === 0) {
                setIsPasswordCheck(true);
                setPasswordCheckMessage('비밀번호를 입력해주세요.');
                setValidPassword(true)
            }

            if (!passwordRegex.test(e.target.value)) {
                setPasswordMessage('숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요.');
                setIsPassword(true);
                setValidPassword(true)
            } else {
                setPasswordMessage('');
                setIsPassword(false);
                setValidPassword(false);
            }
        }, 100), [],);

    const handlePasswordCheck: DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void> = useMemo(() =>
        debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length === 0) {
                setPasswordCheckMessage('비밀번호를 확인해주세요.');
                setIsPasswordCheck(true);
                setValidPasswordCheck(true);
                return;
            }

            if (password === e.target.value) {
                setPasswordCheckMessage('');
                setIsPasswordCheck(false);
                setValidPasswordCheck(false);
            } else {
                setPasswordCheckMessage('비밀번호가 일치하지 않습니다 :(');
                setIsPasswordCheck(true);
                setValidPasswordCheck(true);
            }
        }, 100), [password]);

    return {
        handleId, handleEmail, handleEmailConf, handlePassword, handlePasswordCheck
    };
};
