/**
 * 회원가입 페이지
 */

import * as React from 'react';
import {useEffect, useRef} from 'react';
import styles from './index.module.scss';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {Box, Button, Flex, IconButton, Input, InputGroup, InputRightElement, Stack, Text} from '@chakra-ui/react';
import Timer from "@pages/user/sign_up/utils/Timer.tsx";
import useSignUpStore from "@pages/user/sign_up/store/useSignUpStore.tsx";
import {useSignFormValid} from "@pages/user/sign_up/hook/useSignFormValid.tsx";
import {useSignUpDataVerification} from "@pages/user/sign_up/hook/useSignUpDataVerification.tsx";
import useSignUpFormStore from "@pages/user/sign_up/store/useSignUpFormStore.tsx";
import loginBackground from "@assets/trip_background.png";

const index = () => {
    // ==================== store =====================
    const {
        isId, isEmail,
        isEmailConf, isPassword, isPasswordCheck,
        idMessage, emailMessage,
        emailConfMessage, passwordMessage,
        passwordCheckMessage
    } = useSignUpStore();

    const {
        disabledEmailConfBtn, disabledDetailInfoBtn,
        disabledEmailAuthForm, emailTokenAuthBtnName,
        showPasswordText, showEmailConf, showDetailInfo,
        setShowPasswordText
    } = useSignUpFormStore();

    // ==================== hook =====================
    const {
        handleId,
        handleEmail,
        handlePassword,
        handlePasswordCheck,
        handleEmailConf
    } = useSignFormValid();

    const {
        checkEmail, checkAuthToken, checkDuplicateId, signUp
    } = useSignUpDataVerification();

    const resetTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            handleId.cancel();
            handleEmail.cancel();
            handleEmailConf.cancel();
            handlePassword.cancel();
            handlePasswordCheck.cancel()
        }
    }, [handleId, handleEmail, handleEmailConf, handlePassword, handlePasswordCheck]);

    return (
        <Box bgImage={`url(${loginBackground})`}
             bgSize="cover"
             bgPosition="center"
             bgRepeat="no-repeat"
             minH="100vh"
             minW="100vw"
             display="flex"
             justifyContent="center"
             alignItems="center">
            <Box
                bg="rgba(255, 255, 255, 0.3)" // 반투명 흰 배경
                backdropFilter="blur(3px)"    // 배경 흐림 효과
                height="100vh"
                width="100vw"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box justifyContent="center"
                     alignItems="center"
                     display="flex"
                     flexDirection="column"
                >
                    <div className={styles.container}>
                        <h2 className={styles.container__title}>회원가입</h2>
                        <Stack width='100%'>
                            <InputGroup>
                                <Input type="email"
                                       placeholder="이메일"
                                       isInvalid
                                       disabled={disabledEmailAuthForm}
                                       errorBorderColor={!isEmail ? 'none' : 'red.300'}
                                       onChange={handleEmail}/>
                                <InputRightElement width={showEmailConf ? '4.2rem' : '3.5rem'}>
                                    <Button size='sm'
                                            h='1.75rem'
                                            variant='outline'
                                            fontSize='12px'
                                            onClick={checkEmail}
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
                                               onChange={handleEmailConf}
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
                                                    onClick={checkAuthToken}
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
                                                   onChange={handleId}
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
                                                   onChange={handlePassword}/>

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
                                               onChange={handlePasswordCheck}/>
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
                </Box>
            </Box>
        </Box>
    );
}

export default index