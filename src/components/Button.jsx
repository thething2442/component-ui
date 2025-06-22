import React from 'react'
import { useStyling } from '../hooks/useStyling.js'
import { useDragAndDrop } from '../hooks/useDragAndDrop.js'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

/**
 * Customizable Button component with Framer Motion animations
 */
export const Button = React.forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  draggable = false,
  droppable = false,
  onDrop,
  onDragStart,
  onDragEnd,
  customStyles = {},
  animations = {},
  ...props
}, ref) => {
  // Styling hook
  const styling = useStyling({
    variants: {
      default: 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
      primary: 'bg-primary-600 border-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500',
      secondary: 'bg-secondary-600 border-secondary-600 text-white hover:bg-secondary-700 focus:ring-2 focus:ring-secondary-500',
      success: 'bg-success-600 border-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-success-500',
      error: 'bg-error-600 border-error-600 text-white hover:bg-error-700 focus:ring-2 focus:ring-error-500',
      warning: 'bg-warning-600 border-warning-600 text-white hover:bg-warning-700 focus:ring-2 focus:ring-warning-500',
      outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-2 focus:ring-primary-500',
      ghost: 'bg-transparent border-transparent text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500',
    },
    sizes: {
      xs: 'px-2 py-1 text-xs rounded',
      sm: 'px-3 py-1.5 text-sm rounded',
      md: 'px-4 py-2 text-base rounded-md',
      lg: 'px-6 py-3 text-lg rounded-lg',
      xl: 'px-8 py-4 text-xl rounded-xl',
    },
    defaultStyles: {
      base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
      states: {
        'animate-spin': loading,
      }
    },
    animations: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      whileHover: { scale: 1.02, y: -1 },
      whileTap: { scale: 0.98 },
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  })

  // Drag and drop hook
  const dragDrop = useDragAndDrop({
    id: `button-${Date.now()}`,
    draggable,
    droppable,
    onDrop,
    onDragStart,
    onDragEnd,
    styles: customStyles,
    animations: {
      ...styling.animations,
      ...animations
    }
  })

  // Get computed class names
  const buttonClasses = styling.getClassName({
    variant,
    size,
    disabled,
    loading,
    className
  })

  // Get motion props
  const motionProps = styling.getMotionProps({
    ...dragDrop.getMotionProps(),
    whileHover: disabled ? {} : styling.animations.whileHover,
    whileTap: disabled ? {} : styling.animations.whileTap,
  })

  // Handle click
  const handleClick = (event) => {
    if (!disabled && !loading && onClick) {
      onClick(event)
    }
  }

  const MotionButton = dragDrop.motion.button

  return (
    <MotionButton
      ref={dragDrop.setNodeRef}
      className={buttonClasses}
      style={dragDrop.getComputedStyles()}
      disabled={disabled || loading}
      onClick={handleClick}
      {...motionProps}
      {...dragDrop.attributes}
      {...dragDrop.listeners}
      {...props}
    >
      {loading && (
        <motion.svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </motion.svg>
      )}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.span>
    </MotionButton>
  )
})

Button.displayName = 'Button'

// Default props for component library
Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  children: 'Button',
  draggable: true
}

// Component metadata for the library
Button.metadata = {
  type: 'Button',
  category: 'Basic',
  icon: '🔘',
  description: 'A customizable button component with multiple variants and sizes',
  defaultProps: {
    variant: 'primary',
    size: 'md',
    children: 'Button'
  },
  defaultStyles: {
    base: {},
    dragging: {},
    over: {}
  },
  variants: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'outline', 'ghost'],
  sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
  props: {
    children: { type: 'string', label: 'Text Content' },
    variant: { type: 'select', options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'outline', 'ghost'] },
    size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { type: 'boolean' },
    loading: { type: 'boolean' }
  }
} 