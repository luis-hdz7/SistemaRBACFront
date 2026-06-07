import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const BASE_URL =import.meta.env.MODE === "development"? "http://localhost:3000": "";
export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  login: async (email, password) => {
    try {
      const response =
        await axios.post(
          `${BASE_URL}/api/auth/login`,
          {
            email,
            password,
          }
        );
      const token =response.data.token;
      localStorage.setItem(
        "token",
        token
      );
      const decoded =jwtDecode(token);
      set({
        token,
        user: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        },
      });
      toast.success(
        "Registro Exitoso"
      );
      return true;
    } catch {
      toast.error(
        "Credenciales Incorrectas"
      );
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem(
      "token"
    );
    set({
      token: null,
      user: null,
    });
  },
}));