import { signInWithPopup } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";

export default function Auth() {
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
    navigate("/home");
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center  bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0] gap-6">
      <h1 className="text-lg font-extrabold ">Welcome To ToDo List App </h1>
      <h1 className="lg:text-4xl text-xl font-extrabold text-white">
        Sign In with Google to Continue
      </h1>
      <button
        variant="contained"
        sx={{ bgcolor: "red" }}
        onClick={handleSignInWithGoogle}
        className="lg:text-2xl text-lg rounded-3xl btn text-white bg-black "
      >
        Sign In With Google
      </button>
    </div>
  );
}
