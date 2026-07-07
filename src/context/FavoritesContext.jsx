import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useError } from '../hooks/useError';
import { useLoading } from '../hooks/useLoading';
import { FavoritesContext } from './contexts';
import {
    subscribeFavorite,
    addFavorite,
    removeFavorite,
    getTeacherKey,
} from '../firebase/favoriteService';

export function FavoritesProvider({children}) {
    const {user} = useAuth();
    const { showError } = useError();
    const { withLoading, LOADING_KEYS } = useLoading();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if(!user) {
            return;
        }

        const unsubscribe = subscribeFavorite(user.uid, setFavorites);
        return unsubscribe;
    }, [user]);

    const isFavorite = (teacher) => {
        if (!user) return false;
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
