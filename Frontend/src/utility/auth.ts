interface UserData {
  access_token: string;
}

function auth() {
  const setAuth = (userData: UserData | null) => {
    localStorage.setItem("username", JSON.stringify(userData));
  };

  const getAuth = (): UserData | null => {
    const userDataString = localStorage.getItem("username");
    return userDataString ? JSON.parse(userDataString) : null;
  };

  const getToken = (): string | null => {
    const userData = getAuth();
    return userData?.access_token || null;
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return {
    setAuth,
    getAuth,
    getToken,
    logout,
  };
}

export default auth();
