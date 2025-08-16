import { useState, useEffect, useCallback, useRef } from 'react';
import type { LoadingState, ApiResponse } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { debounce } from '../utils/helpers';

// Local Storage Hook
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Session Storage Hook
export const useSessionStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// API Hook for handling async operations
export const useApi = <T, P extends any[] = []>(
  apiFunction: (...args: P) => Promise<T>,
  immediate: boolean = false
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: P) => {
    try {
      setLoading('loading');
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      setLoading('success');
      return result;
    } catch (err: any) {
      const errorMessage = err?.message || 'An error occurred';
      setError(errorMessage);
      setLoading('error');
      throw err;
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setData(null);
    setLoading('idle');
    setError(null);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    isLoading: loading === 'loading',
    isError: loading === 'error',
    isSuccess: loading === 'success',
  };
};

// Debounced Value Hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Previous Value Hook
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
};

// Window Size Hook
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Online Status Hook
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Form Hook for managing form state
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Record<keyof T, (value: any) => string | null>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  const validateField = useCallback((name: keyof T, value: any) => {
    if (!validationRules?.[name]) return null;
    
    const error = validationRules[name](value);
    setErrors(prev => ({ ...prev, [name]: error || undefined }));
    return error;
  }, [validationRules]);

  const validateForm = useCallback(() => {
    if (!validationRules) return true;
    
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(key => {
      const fieldName = key as keyof T;
      const error = validationRules[fieldName](values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const getFieldProps = useCallback((name: keyof T) => ({
    value: values[name] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValue(name, e.target.value);
    },
    onBlur: () => {
      setFieldTouched(name);
      validateField(name, values[name]);
    },
    error: touched[name] ? errors[name] : undefined,
  }), [values, errors, touched, setValue, setFieldTouched, validateField]);

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    reset,
    getFieldProps,
    isValid: Object.keys(errors).length === 0,
  };
};

// Intersection Observer Hook
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
};

// Copy to Clipboard Hook
export const useClipboard = (timeout: number = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
      return true;
    } catch (error) {
      console.error('Failed to copy text:', error);
      return false;
    }
  }, [timeout]);

  return { isCopied, copy };
};

// Theme Hook
export const useTheme = () => {
  const [theme, setThemeState] = useLocalStorage(STORAGE_KEYS.theme, {
    isDarkMode: false,
    primaryColor: '#1e40af',
    fontSize: 'medium' as const,
    highContrast: false,
  });

  const setTheme = useCallback((newTheme: Partial<typeof theme>) => {
    setThemeState(prev => ({ ...prev, ...newTheme }));
  }, [setThemeState]);

  const toggleDarkMode = useCallback(() => {
    setTheme({ isDarkMode: !theme.isDarkMode });
  }, [theme.isDarkMode, setTheme]);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    
    if (theme.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (theme.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--font-size-base', 
      theme.fontSize === 'small' ? '14px' : 
      theme.fontSize === 'large' ? '18px' : '16px'
    );
  }, [theme]);

  return {
    theme,
    setTheme,
    toggleDarkMode,
  };
};

// Auto-save Hook
export const useAutoSave = <T>(
  data: T,
  saveFunction: (data: T) => Promise<void>,
  delay: number = 30000 // 30 seconds
) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const savedDataRef = useRef<T>(data);

  const debouncedSave = useCallback(
    debounce(async (dataToSave: T) => {
      try {
        setIsSaving(true);
        await saveFunction(dataToSave);
        savedDataRef.current = dataToSave;
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }, delay),
    [saveFunction, delay]
  );

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(savedDataRef.current)) {
      debouncedSave(data);
    }
  }, [data, debouncedSave]);

  const forceSave = useCallback(async () => {
    try {
      setIsSaving(true);
      await saveFunction(data);
      savedDataRef.current = data;
      setLastSaved(new Date());
    } catch (error) {
      console.error('Force save failed:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [data, saveFunction]);

  return {
    lastSaved,
    isSaving,
    forceSave,
    hasUnsavedChanges: JSON.stringify(data) !== JSON.stringify(savedDataRef.current),
  };
};

// Notification Hook
export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return false;
    
    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  }, []);

  const showNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (permission !== 'granted' || typeof Notification === 'undefined') {
        return null;
      }

      return new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });
    },
    [permission]
  );

  return {
    permission,
    requestPermission,
    showNotification,
    isSupported: typeof Notification !== 'undefined',
  };
};