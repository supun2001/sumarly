import SignInSide from "../components/sign-in/SignInSide"

function Login() {
    return <SignInSide route="/api/token/" method="login" />
}

export default Login