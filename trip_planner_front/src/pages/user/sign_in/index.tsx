import styles from './index.module.scss';
import {Button, Flex, IconButton, Input, InputGroup, InputRightElement, Stack, Text} from "@chakra-ui/react";
import * as React from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {useState} from "react";

const Index = () => {
    const [showPasswordText, setShowPasswordText] = useState(false);


    return (
        <div className={styles.container}>
            <h2 className={styles.container__title}>
                테스트
            </h2>
            <Stack width={"100%"}>
                <InputGroup>
                    <Input type={"text"}
                           placeholder="아이디"
                    />
                </InputGroup>
                <InputGroup>
                    <Input type={showPasswordText ? 'text' : "password"}
                           placeholder="비밀번호"
                           // onChange={onChangePassword}
                    />

                    <InputRightElement width='3rem'>
                        <IconButton h='1.75rem'
                                    icon={showPasswordText ? <FaRegEyeSlash/> : <FaRegEye/>}
                                    onClick={() => setShowPasswordText(!showPasswordText)}/>
                    </InputRightElement>
                </InputGroup>

                <Flex justifyContent='center' mt={10} mb={10}>
                    <Button width='300px'
                            // onClick={signUp}
                    >
                        로그인
                    </Button>
                </Flex>
            </Stack>
        </div>
    );
};

export default Index;