import API from "@/config/Api.ts";
import {AuthTokenInfo} from "@pages/user/sign_up/types/AuthTokenInfo.tsx";
import {UserDto} from "@pages/user/sign_up/types/User.tsx";
import {EmailAuthInfo} from "@pages/user/sign_up/types/EmailAuthInfo.tsx";
export const apiEmailAuth = async (emailAuthInfo: EmailAuthInfo) => {
    const {data} = await API.post(
        '/member/emailAuth/sendVerificationNo',
        JSON.stringify(emailAuthInfo)
    );

    return data;
}

export const apiAuthToken = async (authTokenInfo: AuthTokenInfo) => {
    const {data} = await API.post(
        '/member/emailAuth/checkVerificationNo',
        JSON.stringify(authTokenInfo)
    );
    return data;
}

export const apiCheckDuplicateId = async (userId) => {
    const {data} = await API.get(
        `/member/checkDuplicateUserId/${userId}`,
    );
    return data;
}

export const apiSignUp = async (userDto: UserDto) => {
    const {data} = await API.post(
        '/member/signUp',
        JSON.stringify(userDto)
    );
    return data;
}
