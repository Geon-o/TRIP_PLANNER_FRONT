import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from '@pages/user/sign_up'
import SignIn from '@pages/user/sign_in/index.tsx'
import PrivateRoute from "@/routes/PrivateRoute.tsx";
import Test from '@pages/test/index.tsx';

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />

          <Route element={<PrivateRoute />}>
            {/*여기에 라우트 적용하면 됨*/}
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
