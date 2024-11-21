import React from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { useLogin as useLoginStore } from "@/store/login";

const Logout: React.FC = () => {
  const { setLogin } = useLoginStore((state) => state);
  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    setLogin(false);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleLogout}>
      <LogOutIcon />
    </Button>
  );
};

export { Logout };
