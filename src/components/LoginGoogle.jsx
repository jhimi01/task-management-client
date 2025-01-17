import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

const LoginGoogle = () => {
  const [googleData, setGoogleData] = useState()
  console.log("googledata", googleData)
  const userData = {
    email: googleData?.email,
    firstName: googleData?.name,
    img: googleData?.picture,
    isVerified: googleData?.email_verified
  }
  console.log("user data", userData)
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );
        if(res.status === 200){
          setGoogleData(res.data)
        }
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <button
      className="hover:bg-gray-300 rounded-full bg-gray-200 w-full py-1 flex justify-center items-center"
      onClick={() => login()}
    >
      <img
        src="https://storage.googleapis.com/libraries-lib-production/images/GoogleLogo-canvas-404-300px.original.png"
        alt="google icon"
        className="h-14 w-14"
      />
    </button>
  );
};
export default LoginGoogle;
