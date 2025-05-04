import styles from './index.module.scss';
import {Button, Flex, IconButton, Input, InputGroup, InputRightElement, Stack, Text} from "@chakra-ui/react";
import * as React from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {useEffect} from "react";
import {SignInFormData} from "@pages/user/sign_in/types/SignInFormData.tsx";
import useSignInFormValidStore from "@pages/user/sign_in/store/useSignInFormValidStore.tsx";
import {useSignInHandle} from "@pages/user/sign_in/hook/useSignInHandle.tsx";
import useSignInFormStore from "@pages/user/sign_in/store/useSignInFormStore.tsx";
import {apiSignIn} from "@pages/user/sign_in/service/signInService.api.tsx";
import {useNavigate} from "react-router-dom";

const Index = () => {
    const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

    const {
        userId, password,
    } = useSignInFormStore();

    const {
        isId, isPassword, idMessage, passwordMessage,
        setIsId, setIsPassword, setIdMessage, setPasswordMessage,
        isNotInputId, isNotInputPassword
    } = useSignInFormValidStore();

    const {
        handleId, handlePassword,
    } = useSignInHandle();

    const navigate = useNavigate();

    const signIn = () => {
        if (isNotInputId || isNotInputPassword) {
            if (isNotInputId) {
                setIsId(true);
                setIdMessage('아이디를 입력해주세요.');
            }

            if (isNotInputPassword) {
                setIsPassword(true);
                setPasswordMessage('비밀번호를 입력해주세요.');
            }

            return;
        }

        const data: SignInFormData = {
            userId: userId,
            password: password
        };

        apiSignIn(data)
            .then((r) => {
                navigate('/');
            })
            .catch((e) => {
                alert('이이디 혹은 비밀번호가 존재하지 않거나 틀렸습니다.');
            })
    }


    useEffect(() => {
        handleId.cancel();
        handlePassword.cancel();
    }, [handleId, handlePassword]);

    return (
        <div className={styles.container}>
            <h2 className={styles.container__title}>
                로그인
            </h2>
            <Stack width={"100%"}>
                <InputGroup>
                    <Input type={"text"}
                           placeholder="아이디"
                           onChange={handleId}
                           isInvalid
                           errorBorderColor={!isId ? 'none' : 'red.300'}
                    />
                </InputGroup>
                <Text fontSize='10px'>{idMessage}</Text>

                <InputGroup>
                    <Input type={isShowPassword ? 'text' : "password"}
                           placeholder="비밀번호"
                           onChange={handlePassword}
                           isInvalid
                           errorBorderColor={!isPassword ? 'none' : 'red.300'}
                    />
                    <InputRightElement width='3rem'>
                        <IconButton h='1.75rem'
                                    icon={isShowPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
                                    onClick={() => setIsShowPassword(!isShowPassword)}/>
                    </InputRightElement>
                </InputGroup>
                <Text fontSize='10px'>{passwordMessage}</Text>

                <Flex justifyContent='center' mt={6} mb={3}>
                    <Button width='300px'
                            onClick={signIn}
                    >
                        로그인
                    </Button>
                </Flex>
                <Flex>
                    <Text fontSize={'13px'} >아직 회원이 아니신가요? <a href={'/signUp'} style={{fontWeight: 'bolder', color: 'indianred'}}>회원가입</a>을 해보세요. :)</Text>
                </Flex>
            </Stack>
        </div>
    );
};

export default Index;