import {useAuthStore} from "@pages/user/sign_in/store/useAuthStore.tsx";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Outlet />
  }

  if (confirm('로그인 후에 사용할 수 있습니다 \n로그인 페이지로 이동하시겠습니까?')) {
    return <Navigate to={"/signIn"}/>
  } else {
    return <Navigate to={"/"}/>
  }
};

export default PrivateRoute;
