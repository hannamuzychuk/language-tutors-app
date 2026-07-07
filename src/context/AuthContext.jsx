import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { AuthContext } from './contexts';

export function AuthProvider({ children }) {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    });
    return () => unSubscribe();
}, []);
return (
    <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
);
}