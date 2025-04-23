import { Route, Routes } from "react-router-dom"
import { LoginForm } from "./components/login-form"
import { SignupForm } from "./components/signup-form"
import Home from "./components/Home"
function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={< LoginForm />} />
                <Route path='/signup' element={< SignupForm />} />
            </Routes>
        </>
    )
}

export default App
