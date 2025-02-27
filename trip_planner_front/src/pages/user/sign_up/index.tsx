import {useCallback, useEffect, useState} from 'react';
import styles from './index.module.scss';
import {FaRegEye} from "react-icons/fa";
import {FaRegEyeSlash} from "react-icons/fa";
import {
    Input,
    InputGroup,
    Button,
    Flex,
    Stack,
    Text,
    InputRightElement,
    IconButton
} from '@chakra-ui/react';
import {UserDto} from './types/user';
import * as React from "react";

const index = () => {
    const [show, setShow] = useState(false);

    const onSubmit: any = (data: UserDto) => {
        console.log(data);
        console.log(value.length);
    }

    const [value, setValue] = useState('');


    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [idMessage, setIdMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState('');

    const [isId, setIsId] = useState(true);
    const [isEmail, setIsEmail] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [isPasswordCheck, setIsPasswordCheck] = useState(true);

    const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
        console.log(e.target.value);

        if (e.target.value.length < 2 || e.target.value.length > 8) {
            setIdMessage('2글자 이상 8글자 미만으로 입력해주세요.');
            setIsId(false);
        } else {
            setIdMessage('');
            setIsId(true);
        }
    }, []);

    const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        setEmail(e.target.value);

        if (!emailRegex.test(e.target.value)) {
            setEmailMessage('올바른 이메일 주소를 입력해주세요.');
            setIsEmail(false);
        } else {
            setEmailMessage('');
            setIsEmail(true);
        }
    }, []);

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        setPassword(e.target.value);

        if (!passwordRegex.test(e.target.value)) {
            setPasswordMessage('숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요.');
            setIsPassword(false);
        } else {
            setPasswordMessage('');
            setIsPassword(true);
        }

    }, []);

    const onChangePasswordCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value);

        if (password === e.target.value) {
            setPasswordCheckMessage('');
            setIsPasswordCheck(true);
        } else {
            setPasswordCheckMessage('비밀번호가 일치하지 않습니다 :(');
            setIsPasswordCheck(false);
        }

    }, [password]);

    return (
        <div className={styles.container}>
            <h2 className={styles.container__title}>회원가입</h2>
            <Stack width='100%'>
                <InputGroup>
                    <Input type="email"
                           placeholder="이메일"
                           isInvalid
                           errorBorderColor={isEmail ? 'none' : 'red.300'}
                           onChange={onChangeEmail}/>
                    <Text fontSize='10px'>{emailMessage}</Text>
                    <InputRightElement width='3.5rem'>
                        <Button size='sm'
                                h='1.75rem'
                                variant='outline'
                                fontSize='12px'
                        >
                            인증
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <InputGroup>
                    <Input type="text"
                           placeholder="아이디"
                           isInvalid
                           errorBorderColor={isId ? 'none' : 'red.300'}
                           onChange={onChangeId}
                           size='md'
                    />
                    <InputRightElement width='4.9rem'>
                        <Button size='sm'
                                h='1.75rem'
                                variant='outline'
                                fontSize='12px'
                        >
                            중복확인
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Text fontSize='10px'>{idMessage}</Text>

                <InputGroup>
                    <Input type={show ? 'text' : "password"}
                           placeholder="비밀번호"
                           isInvalid
                           errorBorderColor={isPassword ? 'none' : 'red.300'}
                           onChange={onChangePassword}/>

                    <InputRightElement width='3rem'>
                        <IconButton h='1.75rem'
                                    icon={show ? <FaRegEyeSlash/> : <FaRegEye/>}
                                    onClick={() => setShow(!show)}/>
                    </InputRightElement>
                </InputGroup>
                <Text fontSize='10px'>{passwordMessage}</Text>

                <Input type="password"
                       placeholder="비밀번호 확인"
                       isInvalid
                       errorBorderColor={isPasswordCheck ? 'none' : 'red.300'}
                       onChange={onChangePasswordCheck}/>
                <Text fontSize='10px'>{passwordCheckMessage}</Text>
            </Stack>

            <Flex justifyContent='center' mt={10} mb={10}>
                <Button onClick={onSubmit} width='300px'>회원가입</Button>
            </Flex>
        </div>
    );
}

export default index