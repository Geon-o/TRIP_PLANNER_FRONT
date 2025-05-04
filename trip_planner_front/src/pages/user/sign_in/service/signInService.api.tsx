import {SignInFormData} from "@pages/user/sign_in/types/SignInFormData.tsx";
import Api from "@/config/Api.ts";

export const apiSignIn = async (signInFormData: SignInFormData) => {
    const {data} = await Api.post(
        '/member/signIn',
        JSON.stringify(signInFormData)
    );
    return data;
}