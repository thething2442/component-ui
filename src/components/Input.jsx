import React, { useState } from 'react'
import { useStyling } from '../hooks/useStyling.js'
import { useDragAndDrop } from '../hooks/useDragAndDrop.js'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

/**
 * Customizable Input component with Framer Motion animations
 */
export const Input = React.forwardRef(({
  type = 'text',
  placeholder = '',
  value = '',
  label,
  error,
  variant = 'default',
  size = 'md',
  disabled = false,
  required = false,
  className = '',
  draggable = false,
  droppable = false,
  onDrop,
  onDragStart,
  onDragEnd,
  onChange,
  customStyles = {},
  animations = {},
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)

  // Styling hook
  const styling = useStyling({
    variants: {
      default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
      primary: 'border-primary-300 focus:border-primary-500 focus:ring-primary-500',
      secondary: 'border-secondary-300 focus:border-secondary-500 focus:ring-secondary-500',
      success: 'border-success-300 focus:border-success-500 focus:ring-success-500',
      error: 'border-error-300 focus:border-error-500 focus:ring-error-500',
      warning: 'border-warning-300 focus:border-warning-500 focus:ring-warning-500',
    },
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    defaultStyles: {
      base: 'block w-full rounded-md border bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      states: {}
    },
    animations: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      whileFocus: { scale: 1.01 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  })

  // Drag and drop hook
  const dragDrop = useDragAndDrop({
    id: `input-${Date.now()}`,
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
  const inputClasses = styling.getClassName({
    variant: error ? 'error' : variant,
    size,
    disabled,
    className
  })

  // Get motion props
  const motionProps = styling.getMotionProps({
    ...dragDrop.getMotionProps(),
    whileFocus: isFocused ? styling.animations.whileFocus : {}
  })

  // Handle input change
  const handleChange = (event) => {
    const newValue = event.target.value
    setInputValue(newValue)
    if (onChange) {
      onChange(event)
    }
  }

  // Handle focus
  const handleFocus = (event) => {
    setIsFocused(true)
    props.onFocus?.(event)
  }

  // Handle blur
  const handleBlur = (event) => {
    setIsFocused(false)
    props.onBlur?.(event)
  }

  const MotionDiv = dragDrop.motion.div
  const MotionInput = motion.input
  const MotionLabel = motion.label

  return (
    <MotionDiv
      ref={dragDrop.setNodeRef}
      style={dragDrop.getComputedStyles()}
      {...motionProps}
      {...dragDrop.attributes}
      {...dragDrop.listeners}
    >
      {label && (
        <MotionLabel 
          className="block text-sm font-medium text-gray-700 mb-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </MotionLabel>
      )}
      <MotionInput
        ref={ref}
        type={type}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        {...props}
      />
      {error && (
        <motion.p 
          className="mt-1 text-sm text-error-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {error}
        </motion.p>
      )}
    </MotionDiv>
  )
})

Input.displayName = 'Input'

// Default props for component library
Input.defaultProps = {
  type: 'text',
  variant: 'default',
  size: 'md',
  placeholder: 'Enter text...',
  draggable: true
}

// Component metadata for the library
Input.metadata = {
  type: 'Input',
  category: 'Form',
  icon: '📝',
  description: 'A customizable input field with various types and validation',
  defaultProps: {
    type: 'text',
    variant: 'default',
    size: 'md',
    placeholder: 'Enter text...'
  },
  defaultStyles: {
    base: {},
    dragging: {},
    over: {}
  },
  variants: ['default', 'primary', 'secondary', 'success', 'error', 'warning'],
  sizes: ['sm', 'md', 'lg'],
  props: {
    type: { type: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    placeholder: { type: 'string', label: 'Placeholder' },
    label: { type: 'string', label: 'Label' },
    variant: { type: 'select', options: ['default', 'primary', 'secondary', 'success', 'error', 'warning'] },
    size: { type: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { type: 'boolean' },
    required: { type: 'boolean' }
  }
} 