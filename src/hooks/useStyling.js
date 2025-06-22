import { useState, useCallback, useMemo } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Custom hook for component styling and theming
 * @param {Object} options - Configuration options
 * @param {Object} options.theme - Theme configuration
 * @param {Object} options.variants - Component variants
 * @param {Object} options.sizes - Component sizes
 * @param {Object} options.defaultStyles - Default styles
 * @returns {Object} Styling utilities and state
 */
export const useStyling = ({
  theme = {},
  variants = {},
  sizes = {},
  defaultStyles = {}
} = {}) => {
  const [customStyles, setCustomStyles] = useState({})
  const [activeVariant, setActiveVariant] = useState('default')
  const [activeSize, setActiveSize] = useState('md')

  // Default theme colors
  const defaultTheme = {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    }
  }

  // Merge theme with defaults
  const mergedTheme = useMemo(() => ({
    ...defaultTheme,
    ...theme
  }), [theme])

  // Default variants
  const defaultVariants = {
    default: 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50',
    primary: 'bg-primary-600 border-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-secondary-600 border-secondary-600 text-white hover:bg-secondary-700',
    success: 'bg-success-600 border-success-600 text-white hover:bg-success-700',
    error: 'bg-error-600 border-error-600 text-white hover:bg-error-700',
    warning: 'bg-warning-600 border-warning-600 text-white hover:bg-warning-700',
    outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost: 'bg-transparent border-transparent text-gray-700 hover:bg-gray-100',
  }

  // Default sizes
  const defaultSizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  }

  // Merge variants and sizes with defaults
  const mergedVariants = useMemo(() => ({
    ...defaultVariants,
    ...variants
  }), [variants])

  const mergedSizes = useMemo(() => ({
    ...defaultSizes,
    ...sizes
  }), [sizes])

  // Generate class names
  const getClassName = useCallback(({
    variant = activeVariant,
    size = activeSize,
    className = '',
    disabled = false,
    loading = false,
    ...props
  } = {}) => {
    const baseClasses = defaultStyles.base || ''
    const variantClasses = mergedVariants[variant] || mergedVariants.default
    const sizeClasses = mergedSizes[size] || mergedSizes.md
    
    const stateClasses = clsx({
      'opacity-50 cursor-not-allowed': disabled,
      'animate-pulse': loading,
      ...defaultStyles.states
    })

    const customClasses = customStyles[variant] || customStyles.base || ''

    return twMerge(
      clsx(
        baseClasses,
        variantClasses,
        sizeClasses,
        stateClasses,
        customClasses,
        className
      )
    )
  }, [activeVariant, activeSize, mergedVariants, mergedSizes, defaultStyles, customStyles])

  // Update custom styles
  const updateCustomStyles = useCallback((newStyles) => {
    setCustomStyles(prev => ({
      ...prev,
      ...newStyles
    }))
  }, [])

  // Get theme color
  const getThemeColor = useCallback((colorName, shade = 500) => {
    const color = mergedTheme[colorName]
    return color ? color[shade] : undefined
  }, [mergedTheme])

  // Create CSS variables for theme
  const getThemeCSSVariables = useCallback(() => {
    const variables = {}
    Object.entries(mergedTheme).forEach(([colorName, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        variables[`--color-${colorName}-${shade}`] = value
      })
    })
    return variables
  }, [mergedTheme])

  return {
    // State
    theme: mergedTheme,
    activeVariant,
    activeSize,
    customStyles,
    
    // Methods
    getClassName,
    updateCustomStyles,
    setActiveVariant,
    setActiveSize,
    getThemeColor,
    getThemeCSSVariables,
    
    // Utilities
    variants: mergedVariants,
    sizes: mergedSizes,
    
    // Helpers
    cn: getClassName, // Alias for convenience
  }
} 