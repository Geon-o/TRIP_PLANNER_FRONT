/**
 * 회원가입 페이지
 */

import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import styles from './index.module.scss';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {Button, Flex, IconButton, Input, InputGroup, InputRightElement, Stack, Text} from '@chakra-ui/react';
import Timer from "@pages/user/sign_up/utils/Timer.tsx";
import {EmailAuthInfo} from "@pages/user/sign_up/types/EmailAuthInfo.tsx";
import API from "@pages/user/sign_up/utils/Api.ts";
import {AuthTokenInfo} from "@pages/user/sign_up/types/AuthTokenInfo.tsx";
import {UserDto} from "@pages/user/sign_up/types/User.tsx";
import {useNavigate} from "react-router-dom";

/**
 * TODO
 * 1. 전체적인 useState 정리
 * 2. 회원가입 시 검증로직 정리
 * 3. 해당 파일엔 최대한 html만 있도록 정리
 */

const index = () => {
    const [showPasswordText, setShowPasswordText] = useState(false);
    const [showEmailConf, setShowEmailConf] = useState(false);
    const [showDetailInfo, setShowDetailInfo] = useState(false);

    const [disabledEmailConfBtn, setDisabledEmailConfBtn] = useState(true);
    const [disabledDetailInfoBtn, setDisabledDetailInfoBtn] = useState(true);
    const [disabledEmailAuthForm, setDisabledEmailAuthForm] = useState(false);
    const [isCheckDuplicatedIdForm, setIsCheckDuplicatedIdForm] = useState(false);

    //이메일 인증버튼명
    const [emailTokenAuthBtnName, setEmailTokenAuthBtnName] = useState('인증');

    //Timer로 부터 전달받은 현재 시간리셋
    const resetTimerRef = useRef(null);

    const [password, setPassword] = useState('');

    // 입력폼 error 메시지
    const [idMessage, setIdMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [emailConfMessage, setEmailConfMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState('');

    // 입력폼 유효값에 따른 폼색상변
    const [isId, setIsId] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isEmailConf, setIsEmailConf] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordCheck, setIsPasswordCheck] = useState(false);


    // 유효성 검증
    const [validId, setValidId] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validPasswordCheck, setValidPasswordCheck] = useState(true);

    /**
     * 이메일 인증 관련 데이터
     *
     * @param
     * - email: 이메일 주소
     * - deadlineTime: 인증 시간
     */
    const [emailAuthInfo, setEmailAuthInfo] = useState<EmailAuthInfo>({
        email: '',
        deadlineTime: 0
    });

    /**
     * 이메일로부터 받은 인증번호 데이터
     */
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();


    /***************************** 회원가입 정보 유효성 검사 *****************************/
    const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 2 || e.target.value.length > 8) {
            setIdMessage('2글자 이상 8글자 미만으로 입력해주세요.');
            setIsId(true);
            return;
        }

        setIdMessage('');
        setIsId(false);
        setValidId(false);
        setUserId(e.target.value);
    }, []);

    const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    }, []);

    const onChangeEmailConf = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    }, []);

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        setPassword(e.target.value);

        if (e.target.value.length === 0) {
            setIsPasswordCheck(true);
            setPasswordCheckMessage('비밀번호를 입력해주세요.');
        }

        if (!passwordRegex.test(e.target.value)) {
            setPasswordMessage('숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요.');
            setIsPassword(true);
        } else {
            setPasswordMessage('');
            setIsPassword(false);
            setValidPassword(false);
        }

    }, []);

    const onChangePasswordCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (password === e.target.value) {
            setPasswordCheckMessage('');
            setIsPasswordCheck(false);
            setValidPasswordCheck(false);
        } else {
            setPasswordCheckMessage('비밀번호가 일치하지 않습니다 :(');
            setIsPasswordCheck(true);
        }

    }, [password]);
    /*****************************END*****************************/

    /**
     * 이메일 확인 로직 (api)
     */
    const onClickEmailConf = () => {
        if (emailTokenAuthBtnName.includes('재인증')) handleReset();

        if (!isEmail) {
            setShowEmailConf(!isEmail);
            setEmailTokenAuthBtnName("재인증");
        }

        apiEmailAuth()
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
     * 이메일 재전송시 인증 타이머 리셋
     */
    const handleReset = () => {
        if (resetTimerRef.current) {
            resetTimerRef.current();
        }
    }

    const apiEmailAuth = async () => {
        const {data} = await API.post(
            '/member/emailAuth/sendVerificationNo',
            JSON.stringify(emailAuthInfo)
        );

        return data;
    }
    /** 여기까지 **/


    /**
     * 인증번호 제크 로직 (api)
     */
    const onClickCheckAuthToken = () => {
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

    // api 전송
    const apiAuthToken = async (authTokenInfo: AuthTokenInfo) => {
        console.log(authTokenInfo);

        const {data} = await API.post(
            '/member/emailAuth/checkVerificationNo',
            JSON.stringify(authTokenInfo)
        );
        return data;
    }
    /** 여기까지 **/

    const checkDuplicateId = () => {
        console.log(userId);
        apiCheckDuplicateId()
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

    const apiCheckDuplicateId = async () => {
        const {data} = await API.get(
            `/member/checkDuplicateUserId/${userId}`,
        );
        return data;
    }

    const signUp = () => {
        if (validDate()) {
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

    const apiSignUp = async (userDto: UserDto) => {
        const {data} = await API.post(
            '/member/signUp',
            JSON.stringify(userDto)
        );
        return data;
    }

    const validDate = () => {
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

    return (
        <div className={styles.container}>
            <h2 className={styles.container__title}>회원가입</h2>
            <Stack width='100%'>
                <InputGroup>
                    <Input type="email"
                           placeholder="이메일"
                           isInvalid
                           disabled={disabledEmailAuthForm}
                           errorBorderColor={!isEmail ? 'none' : 'red.300'}
                           onChange={onChangeEmail}/>
                    <InputRightElement width={showEmailConf ? '4.2rem' : '3.5rem'}>
                        <Button size='sm'
                                h='1.75rem'
                                variant='outline'
                                fontSize='12px'
                                onClick={onClickEmailConf}
                                disabled={disabledEmailConfBtn || disabledEmailAuthForm}
                                name="emailConfBtn"
                        >
                            {emailTokenAuthBtnName}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Text fontSize='10px'>{emailMessage}</Text>

                {
                    showEmailConf &&
                    <Stack>
                        <InputGroup>
                            <Input type="text"
                                   placeholder="인증번호"
                                   isInvalid
                                   errorBorderColor={!isEmailConf ? 'none' : 'red.300'}
                                   onChange={onChangeEmailConf}
                                   disabled={disabledEmailAuthForm}
                            />
                            <InputRightElement width='8.5rem'>
                                <Text fontSize='10px' h='1rem'>
                                    <Timer onReset={(resetFn) => (resetTimerRef.current = resetFn)}
                                           disabled={disabledEmailAuthForm}/>
                                </Text>
                            </InputRightElement>
                            <InputRightElement width='3.5rem'>
                                <Button size='sm'
                                        h='1.75rem'
                                        variant='outline'
                                        fontSize='12px'
                                        disabled={disabledDetailInfoBtn || disabledEmailAuthForm}
                                        onClick={onClickCheckAuthToken}
                                >
                                    확인
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Text fontSize='10px'>{emailConfMessage}</Text>
                    </Stack>
                }

                {
                    showDetailInfo &&
                    <div>
                        <Stack>
                            <InputGroup>
                                <Input type="text"
                                       placeholder="아이디"
                                       isInvalid
                                       errorBorderColor={!isId ? 'none' : 'red.300'}
                                       onChange={onChangeId}
                                       size='md'
                                />
                                <InputRightElement width='4.9rem'>
                                    <Button size='sm'
                                            h='1.75rem'
                                            variant='outline'
                                            fontSize='12px'
                                            onClick={checkDuplicateId}
                                    >
                                        중복확인
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Text fontSize='10px'>{idMessage}</Text>

                            <InputGroup>
                                <Input type={showPasswordText ? 'text' : "password"}
                                       placeholder="비밀번호"
                                       isInvalid
                                       errorBorderColor={!isPassword ? 'none' : 'red.300'}
                                       onChange={onChangePassword}/>

                                <InputRightElement width='3rem'>
                                    <IconButton h='1.75rem'
                                                icon={showPasswordText ? <FaRegEyeSlash/> : <FaRegEye/>}
                                                onClick={() => setShowPasswordText(!showPasswordText)}/>
                                </InputRightElement>
                            </InputGroup>
                            <Text fontSize='10px'>{passwordMessage}</Text>

                            <Input type="password"
                                   placeholder="비밀번호 확인"
                                   isInvalid
                                   errorBorderColor={!isPasswordCheck ? 'none' : 'red.300'}
                                   onChange={onChangePasswordCheck}/>
                            <Text fontSize='10px'>{passwordCheckMessage}</Text>
                        </Stack>
                        <Flex justifyContent='center' mt={10} mb={10}>
                            <Button width='300px'
                                    onClick={signUp}
                            >
                                회원가입
                            </Button>
                        </Flex>
                    </div>
                }
            </Stack>


        </div>
    );
}

export default index