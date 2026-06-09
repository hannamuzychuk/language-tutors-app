import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeachersPage from './pages/TeachersPage'
import FavoritesPage from './pages/FavoritesPage' 
import Header from './components/Header/Header'

function App() {
 
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router> 
  );
}

export default App
