import useSignUpFormStore from "@pages/user/sign_up/store/useSignUpFormStore.tsx";
import {useRef} from "react";
import useSignUpAuthStore from "@pages/user/sign_up/store/useSignUpAuthStore.tsx";
import {
    apiAuthToken,
    apiCheckDuplicateId,
    apiEmailAuth,
    apiSignUp
} from "@pages/user/sign_up/service/signUpService.api.tsx";
import {AuthTokenInfo} from "@pages/user/sign_up/types/AuthTokenInfo.tsx";
import useSignUpStore from "@pages/user/sign_up/store/useSignUpStore.tsx";
import {UserDto} from "@pages/user/sign_up/types/User.tsx";
import {useNavigate} from "react-router-dom";

export const useSignUpDataVerification = () => {
    const {
        emailTokenAuthBtnName, isCheckDuplicatedIdForm,
        validId, validPassword, validPasswordCheck,
        setEmailTokenAuthBtnName, setShowEmailConf, setShowDetailInfo,
        setDisabledEmailAuthForm, setIsCheckDuplicatedIdForm
    } = useSignUpFormStore();
    const {
        isEmail,
        token,
        emailAuthInfo,
        userId,
        password
    } = useSignUpAuthStore();
    const {
        setIsEmailConf, setEmailConfMessage,
        setIsId, setIdMessage, setIsPassword,
        setIsPasswordCheck, setPasswordMessage,
        setPasswordCheckMessage
    } = useSignUpStore();
    const resetTimerRef = useRef(null);

    const navigate = useNavigate();

    const handleReset = () => {
        if (resetTimerRef.current) {
            resetTimerRef.current();
        }
    }

    /**
     * 이메일 확인 로직 (api)
     */
    const checkEmail = () => {
        if (emailTokenAuthBtnName.includes('재인증')) handleReset();

        if (!isEmail) {
            setShowEmailConf(!isEmail);
            setEmailTokenAuthBtnName("재인증");
        }

        apiEmailAuth(emailAuthInfo)
            .catch((e) => {
                alert('이메일 인증 실패');
                /**
                 * TODO
                 * 1. 토스트 처리
                 *  - 메시징: 이메일 인증 실패 이메일을 확인해주세요.
                 */
                setShowEmailConf(false);
            });
    }

    /**
     * 인증번호 제크 로직 (api)
     */
    const checkAuthToken = () => {
        const authTokenInfo: AuthTokenInfo = {
            email: emailAuthInfo.email,
            authToken: token
        }

        apiAuthToken(authTokenInfo)
            .then((r) => {

                if (r) {
                    setShowDetailInfo(r);
                    setDisabledEmailAuthForm(true);
                    setIsEmailConf(false);
                    setEmailConfMessage('');
                    return;
                }

                setEmailConfMessage('인증번호를 확인해주세요.');
                setIsEmailConf(true);
            })
            .catch(e => console.log(e.message));
    }

    /**
     * 아이디 중복확인 로직
     */
    const checkDuplicateId = () => {
        apiCheckDuplicateId(userId)
            .then((r) => {
                if (r) {
                    setIdMessage('사용가능한 아이디입니다.');
                    setIsCheckDuplicatedIdForm(r);
                    setIsId(!r)

                } else {
                    setIsId(!r);
                    setIdMessage('이미 사용중인 아이디입니다.');
                    setIsCheckDuplicatedIdForm(r);
                }
            });
    }

    const signUp = () => {
        if (validation()) {
            return;
        }

        const userDto: UserDto = {
            email: emailAuthInfo.email,
            userId: userId,
            password: password,
        };

        apiSignUp(userDto)
            .then((r) => {
                navigate("/signIn");
            });
    }

    const validation = () => {
        if (validId) {
            setIsId(true);
            setIdMessage('아이디를 입력해주세요.');
        }

        if (validPassword) {
            setIsPassword(true);
            setPasswordMessage('비밀번호를 입력해주세요.');
        }

        if (validPasswordCheck) {
            setIsPasswordCheck(true);
            setPasswordCheckMessage('비밀번호를 확인해주세요.');
        }

        if (validId || validPassword || validPasswordCheck) {
            return true;
        }

        if (!isCheckDuplicatedIdForm) {
            setIsId(true);
            setIdMessage('아이디 중복확인을 해주세요.');
            return true;
        }

        return false;
    }


    return {
        checkEmail, checkAuthToken, checkDuplicateId, signUp
    };
};