import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [cart, setCart] = useState([]);
  const [updateProduct, setUpdateProduct] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        email,
        setEmail,
        updateProduct,
        setUpdateProduct,
        cart,
        setCart,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
