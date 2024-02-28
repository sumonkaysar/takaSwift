import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
import { server } from '../links';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logOut = () => {
        Cookies.set('takaSwiftToken', '', { expires: 0, path: '/' });
        setUser(null);
    }

    useEffect(() => {
        const cookie = Cookies.get("takaSwiftToken");
        if (cookie) {
            fetch(`${server}/auth/isLoggedIn`, {
                headers: {
                    authorization: `Bearer ${cookie}`
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result.status === 200) {
                        setUser(result.user);
                        setLoading(false);
                    } else {
                        setUser(null);
                        setLoading(false);
                    }
                    console.log(result.message);
                })
                .catch(error => console.log(error));
        }else{
            setLoading(false)
        }
    }, [])



    const authInfo = {
        logOut,
        user,
        loading,
        setUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;