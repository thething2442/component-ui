import React from 'react'
import { useStyling } from '../hooks/useStyling.js'
import { useDragAndDrop } from '../hooks/useDragAndDrop.js'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

/**
 * Customizable Text component with Framer Motion animations
 */
export const Text = React.forwardRef(({
  children,
  variant = 'body',
  size = 'md',
  color = 'default',
  weight = 'normal',
  align = 'left',
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
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-medium',
      h6: 'text-base font-medium',
      body: 'text-base',
      caption: 'text-sm',
      small: 'text-xs',
      code: 'font-mono bg-gray-100 px-1 py-0.5 rounded',
    },
    sizes: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    defaultStyles: {
      base: 'transition-colors duration-200',
      states: {}
    },
    animations: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      whileHover: { scale: 1.01 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  })

  // Drag and drop hook
  const dragDrop = useDragAndDrop({
    id: `text-${Date.now()}`,
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

  // Color classes
  const colorClasses = {
    default: 'text-gray-900',
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    success: 'text-success-600',
    error: 'text-error-600',
    warning: 'text-warning-600',
    muted: 'text-gray-500',
    white: 'text-white',
  }

  // Weight classes
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }

  // Get computed class names
  const textClasses = styling.getClassName({
    variant,
    size,
    className: clsx(
      className,
      colorClasses[color],
      weightClasses[weight],
      alignClasses[align]
    )
  })

  // Get motion props
  const motionProps = styling.getMotionProps({
    ...dragDrop.getMotionProps(),
    layout: true
  })

  // Determine the HTML element based on variant
  const getElement = () => {
    if (variant.startsWith('h')) {
      return variant
    }
    return 'p'
  }

  const Element = getElement()
  const MotionElement = dragDrop.motion[Element] || motion.div

  return (
    <MotionElement
      ref={dragDrop.setNodeRef}
      className={textClasses}
      style={dragDrop.getComputedStyles()}
      {...motionProps}
      {...dragDrop.attributes}
      {...dragDrop.listeners}
      {...props}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.span>
    </MotionElement>
  )
})

Text.displayName = 'Text'

// Default props for component library
Text.defaultProps = {
  variant: 'body',
  size: 'md',
  color: 'default',
  weight: 'normal',
  align: 'left',
  children: 'Sample text content',
  draggable: true
}

// Component metadata for the library
Text.metadata = {
  type: 'Text',
  category: 'Typography',
  icon: '📄',
  description: 'A customizable text component for displaying various types of content',
  defaultProps: {
    variant: 'body',
    size: 'md',
    color: 'default',
    weight: 'normal',
    align: 'left',
    children: 'Sample text content'
  },
  defaultStyles: {
    base: {},
    dragging: {},
    over: {}
  },
  variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'small', 'code'],
  sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
  props: {
    children: { type: 'string', label: 'Text Content' },
    variant: { type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'small', 'code'] },
    size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] },
    color: { type: 'select', options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'muted', 'white'] },
    weight: { type: 'select', options: ['light', 'normal', 'medium', 'semibold', 'bold'] },
    align: { type: 'select', options: ['left', 'center', 'right', 'justify'] }
  }
} 