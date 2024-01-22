import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  children: React.ReactNode;
}

function Auth(props: AuthProps) {
  const navigate = useNavigate();
  const { children } = props;
  const { username } = useSelector(
    (state: { signin: { username: string } }) => state.signin
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate("/signin");
    }

    setMounted(true);
  }, [username, navigate]);

  return mounted ? <>{children}</> : <span></span>;
}

export default Auth;
