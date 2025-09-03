'use client';

import { useState, useEffect } from 'react';
import type { ContentEngine, ContentResult, ContentFilters } from './contentTypes';

export const useContent = <T = Record<string, any>>(
  filename: string, 
  provider: ContentEngine
) => {
  const [content, setContent] = useState<ContentResult<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await provider.loadContent<T>(filename);
      setContent(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Content loading failed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, [filename, provider]);

  return { content, loading, error, refetch: loadContent };
};

export const useContentCollection = <T = Record<string, any>>(
  filters: ContentFilters,
  provider: ContentEngine
) => {
  const [content, setContent] = useState<ContentResult<T>[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await provider.loadContentCollection<T>(filters);
        setContent(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Content collection loading failed'));
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [filters, provider]);

  return { content, loading, error };
};