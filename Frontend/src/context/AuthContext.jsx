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
    const payLoadDecoded = atob(payloadBase64);

    const payloadObj = JSON.parse(payLoadDecoded);

    console.log(payloadObj);

    return json;
  } catch {
    return null;
  }
}

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
};
