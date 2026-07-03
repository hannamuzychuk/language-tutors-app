import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    subscribeFavorite,
    addFavorite,
    removeFavorite,
    getTeacherKey,
} from '../firebase/favoriteService';

const FavoritesContext = createContext();

export function FavoritesProvider({children}) {
    const {user} = useAuth();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if(!user) {
            setFavorites([]);
            return;
        }

        const unsubscribe = subscribeFavorite(user.uid, setFavorites);
        return unsubscribe;
    }, [user]);

    const isFavorite = (teacher) => {
        const key = getTeacherKey(teacher);
        return favorites.some((favorite) => getTeacherKey(favorite) === key);
    }

    const toggleFavorites = async (teacher) => {
        if(!user) return;

        if(isFavorite(teacher)) {
            await removeFavorite(user.uid, teacher);
        } else {
            await addFavorite(user.uid, teacher);
        }
    }

    return (
        <FavoritesContext.Provider value={{favorites, toggleFavorites, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    return useContext(FavoritesContext);
}

