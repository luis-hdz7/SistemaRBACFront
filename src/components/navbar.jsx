import { Link, useResolvedPath } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  LogInIcon,
} from "lucide-react";

import ThemeSelector from "./ThemeSelector";
import { useProductStore } from "../store/useProductStore";

function Navbar() {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";

  const { user, logout } = useAuthStore();

  const { products } = useProductStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <span
                  className="
                    font-semibold
                    font-mono
                    tracking-widest
                    text-2xl
                    bg-clip-text
                    text-transparent
                    bg-gradient-to-r
                    from-primary
                    to-secondary
                  "
                >
                  Brawhalla Authentication
                </span>
              </div>
            </Link>
          </div>
          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <ThemeSelector />
            {user && (
              <span className="badge badge-primary">
                {user.role}
              </span>
            )}
            {!user ? (
              <Link
                to="/login"
                className="btn btn-ghost btn-circle"
              >
                <LogInIcon className="size-5" />
              </Link>
            ) : (
              <button
                className="btn btn-ghost btn-circle"
                onClick={handleLogout}
              >
                <LogInIcon className="size-5 rotate-180" />
              </button>
            )}
            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <ShoppingBagIcon className="size-5" />
                  <span className="badge badge-sm badge-primary indicator-item">
                    {products.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;