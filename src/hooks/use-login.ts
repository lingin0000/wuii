import { setUserInfo, getUserInfo, removeUserInfo } from "@/lib/stroge";
import { useNavigate } from "@tanstack/react-router";

export function useLogin() {
  const navigate = useNavigate();
  const login = (userInfo: any) => {
    setUserInfo(userInfo);
    navigate({
      to: "/",
    });
  };
  const logout = () => {
    removeUserInfo();
  };

  const isLoggedIn = () => {
    return !!getUserInfo();
  };
  return { login, logout, isLoggedIn };
}
