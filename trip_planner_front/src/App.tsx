import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from '@pages/user/sign_up/index.tsx'
import SignIn from '@pages/user/sign_in/index.tsx'

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
