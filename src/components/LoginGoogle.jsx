import { useGoogleLogin } from "@react-oauth/google";

const LoginGoogle = () => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
      });
      // const localStorage = localStorage.localStorage
    return (
      <button className="hover:bg-gray-300 rounded-full bg-gray-200 w-full py-1 flex justify-center items-center" onClick={() => login()}> <img
      src="https://storage.googleapis.com/libraries-lib-production/images/GoogleLogo-canvas-404-300px.original.png"
      alt="google icon"
      className="h-14 w-14"
    /></button>
    );
  };
export default LoginGoogle
