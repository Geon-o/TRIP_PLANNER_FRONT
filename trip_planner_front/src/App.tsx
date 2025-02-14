import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from '@pages/user/sign_up'

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
