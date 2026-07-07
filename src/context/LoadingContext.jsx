import { useCallback, useMemo, useState } from 'react';
import GlobalLoader from '../components/GlobalLoader/GlobalLoader';
import { LoadingContext } from './contexts';

const LOADING_KEYS = {
    TEACHERS: 'teachers',
    TEACHERS_MORE: 'teachersMore',
    FAVORITES: 'favorites',
    AUTH: 'auth',
};

const GLOBAL_LOADER_KEYS = new Set([LOADING_KEYS.TEACHERS]);

export function LoadingProvider({ children }) {
    const [loadingCounts, setLoadingCounts] = useState({});

    const startLoading = useCallback((key = 'default') => {
        setLoadingCounts((prev) => ({
            ...prev,
            [key]: (prev[key] || 0) + 1,
        }));
    }, []);

    const stopLoading = useCallback((key = 'default') => {
        setLoadingCounts((prev) => {
            const nextCount = Math.max(0, (prev[key] || 0) - 1);
            if (nextCount === 0) {
                const { [key]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [key]: nextCount };
        });
    }, []);

    const withLoading = useCallback(async (key, callback) => {
        startLoading(key);
        try {
            return await callback();
        } finally {
            stopLoading(key);
        }
    }, [startLoading, stopLoading]);

    const isLoadingKey = useCallback((key) => (loadingCounts[key] || 0) > 0, [loadingCounts]);

    const isGlobalLoading = useMemo(
        () => [...GLOBAL_LOADER_KEYS].some((key) => (loadingCounts[key] || 0) > 0),
        [loadingCounts]
    );

    const contextValue = useMemo(
        () => ({
            LOADING_KEYS,
            isLoadingKey,
            isGlobalLoading,
            startLoading,
            stopLoading,
            withLoading,
        }),
        [isLoadingKey, isGlobalLoading, startLoading, stopLoading, withLoading]
    );

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
            <GlobalLoader isLoading={isGlobalLoading} />
        </LoadingContext.Provider>
    );
}
