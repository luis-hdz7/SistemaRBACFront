import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [email, setEmail] =useState("");
  const [password, setPassword] =useState("");
  const { login } =useAuthStore();
  const navigate= useNavigate();
  return (
    <div
      className="
      max-w-md
      mx-auto
      mt-20
      "
    >
      <input
        className="
        input
        input-bordered
        w-full
        mb-3
        "
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />
      <input
        type="password"
        className="
        input
        input-bordered
        w-full
        mb-3
        "
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />
      <button
        className="
        btn
        btn-primary
        w-full
        "
        onClick={async ()=>{
            const success=await login(email,password);
            if (success){
                navigate("/")
            }
            
        }}
      >
        Login
      </button>
    </div>
  );
}
export default LoginPage;