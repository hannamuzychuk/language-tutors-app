import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { useError } from './ErrorContext.jsx';
import { useLoading } from './LoadingContext.jsx';
import {
    subscribeFavorite,
    addFavorite,
    removeFavorite,
    getTeacherKey,
} from '../firebase/favoriteService';

const FavoritesContext = createContext();

export function FavoritesProvider({children}) {
    const {user} = useAuth();
    const { showError } = useError();
    const { withLoading, LOADING_KEYS } = useLoading();
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

        try {
            await withLoading(LOADING_KEYS.FAVORITES, async () => {
                if(isFavorite(teacher)) {
                    await removeFavorite(user.uid, teacher);
                } else {
                    await addFavorite(user.uid, teacher);
                }
            });
        } catch (error) {
            showError(error.message || 'Failed to update favorites.');
        }
    }

    return (
        <FavoritesContext.Provider value={{favorites, toggleFavorites, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
}

