import { createContext, useContext, useState } from "react";

const RegisterContext = createContext({ continueWithEmail: false, signup: false })

export const RegisterContextProvider = ({ children }) => {

    const [continueWithEmail, setContinueWithEmail] = useState(false);
    const [headerRegClick, setHeaderRegClick] = useState(false)
    const [signup, setSignUp] = useState(false)
    const [test, setTest] = useState(false)

    const value = {
        continueWithEmail,
        setContinueWithEmail,
        signup,
        setSignUp,
        headerRegClick,
        setHeaderRegClick
    }

    return <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>
}

export const useGlobalRegisterContext = () => {
    return useContext(RegisterContext)
}