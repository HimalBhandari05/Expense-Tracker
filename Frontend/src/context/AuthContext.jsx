import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  Children,
} from "react";
import axios from "axios";

const AuthContext = createContext(); // auth context

function decodeJwt(token) {
  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );

    console.log(json);

    return json;
  } catch {
    return null;
  }
}

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading = true -> app is checking if the user is logged in or not. else not checking

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    if (access) {
      const payload = decodeJwt(access);
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser(payload);
        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      }
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    setLoading(false);
  }, []);

  const login = ({ access, refresh }) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    setUser(decodeJwt(access));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // yesle context lai sajilo use garna help garxa
