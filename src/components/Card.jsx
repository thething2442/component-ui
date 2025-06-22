import React from 'react'
import { useStyling } from '../hooks/useStyling.js'
import { useDragAndDrop } from '../hooks/useDragAndDrop.js'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

/**
 * Customizable Card component with Framer Motion animations
 */
export const Card = React.forwardRef(({
  children,
  title,
  subtitle,
  variant = 'default',
  size = 'md',
  padding = true,
  shadow = true,
  border = true,
  className = '',
  draggable = false,
  droppable = true,
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
      default: 'bg-white border border-gray-200',
      primary: 'bg-primary-50 border-primary-200',
      secondary: 'bg-secondary-50 border-secondary-200',
      success: 'bg-success-50 border-success-200',
      error: 'bg-error-50 border-error-200',
      warning: 'bg-warning-50 border-warning-200',
      dark: 'bg-gray-800 border-gray-700 text-white',
      elevated: 'bg-white border-0',
    },
    sizes: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    defaultStyles: {
      base: 'rounded-lg transition-all duration-200',
      states: {}
    },
    animations: {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      whileHover: { y: -4, scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  })

  // Drag and drop hook
  const dragDrop = useDragAndDrop({
    id: `card-${Date.now()}`,
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
  const cardClasses = styling.getClassName({
    variant,
    size,
    className: clsx(
      className,
      padding && 'p-4',
      shadow && 'shadow-sm',
      border && 'border',
      !border && 'border-0'
    )
  })

  // Get motion props
  const motionProps = styling.getMotionProps({
    ...dragDrop.getMotionProps(),
    layout: true,
    layoutId: `card-${props.id || 'default'}`
  })

  const MotionDiv = dragDrop.motion.div

  return (
    <MotionDiv
      ref={dragDrop.setNodeRef}
      className={cardClasses}
      style={dragDrop.getComputedStyles()}
      onDrop={dragDrop.handleDrop}
      onDragOver={dragDrop.handleDragOver}
      onDragLeave={dragDrop.handleDragLeave}
      {...motionProps}
      {...dragDrop.attributes}
      {...dragDrop.listeners}
      {...props}
    >
      {(title || subtitle) && (
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title && (
            <motion.h3 
              className="text-lg font-semibold text-gray-900 mb-1"
              layout
            >
              {title}
            </motion.h3>
          )}
          {subtitle && (
            <motion.p 
              className="text-sm text-gray-600"
              layout
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      )}
      <motion.div 
        className="min-h-[100px]"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    </MotionDiv>
  )
})

Card.displayName = 'Card'

// Default props for component library
Card.defaultProps = {
  variant: 'default',
  size: 'md',
  padding: true,
  shadow: true,
  border: true,
  droppable: true,
  children: 'Drop components here'
}

// Component metadata for the library
Card.metadata = {
  type: 'Card',
  category: 'Layout',
  icon: '🃏',
  description: 'A container component that can hold other components and be styled',
  defaultProps: {
    variant: 'default',
    size: 'md',
    padding: true,
    shadow: true,
    border: true,
    children: 'Drop components here'
  },
  defaultStyles: {
    base: {},
    dragging: {},
    over: {}
  },
  variants: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'dark', 'elevated'],
  sizes: ['sm', 'md', 'lg'],
  props: {
    title: { type: 'string', label: 'Title' },
    subtitle: { type: 'string', label: 'Subtitle' },
    variant: { type: 'select', options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'dark', 'elevated'] },
    size: { type: 'select', options: ['sm', 'md', 'lg'] },
    padding: { type: 'boolean', label: 'Show Padding' },
    shadow: { type: 'boolean', label: 'Show Shadow' },
    border: { type: 'boolean', label: 'Show Border' }
  }
} 