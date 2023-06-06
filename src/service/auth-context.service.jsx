import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [email_cred, setEmailCred] = useState("user@example.com");
    const [pass_cred, setPasswordCred] = useState("Password@123");

    return (
        <AuthContext.Provider value={{ email_cred, setEmailCred, pass_cred, setPasswordCred }}>
            {children}
        </AuthContext.Provider>
    );
}