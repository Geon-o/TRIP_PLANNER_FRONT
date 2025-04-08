import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from '@pages/user/sign_up'

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
