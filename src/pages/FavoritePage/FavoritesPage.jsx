import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

function FavoritesPage() {
    const {user, loading} = useAuth();
    const {isFavorite, toggleFavorites} = useFavorites();

    if(loading) return <Loader />;

    const handleToggleFavorite = (teacher) => {
        if(!user) {
            alert('Please login to add to favorites');
            return;
        }

        toggleFavorites(teacher);
    }

    return <div>
        <h1> Favorites Page </h1>
    </div>
}

export default FavoritesPage;