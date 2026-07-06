import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'
import { ErrorProvider } from './context/ErrorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <ErrorProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </ErrorProvider>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
