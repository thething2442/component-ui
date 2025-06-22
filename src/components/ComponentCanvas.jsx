import React from 'react'
import { useStyling } from '../hooks/useStyling.js'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Component Canvas - drop zone for components with Framer Motion animations
 */
export const ComponentCanvas = ({
  children,
  onDrop,
  onDragOver,
  onDragLeave,
  className = '',
  title = 'Canvas',
  emptyMessage = 'Drag components here to build your UI',
  ...props
}) => {
  const styling = useStyling({
    defaultStyles: {
      base: 'bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[400px] transition-colors duration-200',
      states: {
        'border-primary-400 bg-primary-50': false, // Will be set dynamically
      }
    },
    animations: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      whileHover: { scale: 1.01 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  })

  const [isDragOver, setIsDragOver] = React.useState(false)

  const canvasClasses = styling.getClassName({
    className: clsx(
      className,
      isDragOver && 'border-primary-400 bg-primary-50'
    )
  })

  const handleDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    setIsDragOver(true)
    onDragOver?.(event)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragOver(false)
    onDragLeave?.(event)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragOver(false)
    
    try {
      const componentData = JSON.parse(event.dataTransfer.getData('application/json'))
      onDrop?.(componentData, {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top
      })
    } catch (error) {
      console.error('Failed to parse dropped component data:', error)
    }
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <motion.h3 
        className="text-lg font-semibold text-gray-900"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      
      <motion.div
        className={canvasClasses}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        {...styling.getMotionProps()}
        whileHover={{ scale: 1.005 }}
        {...props}
      >
        {children && children.length > 0 ? (
          <motion.div 
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence>
              {children}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="flex items-center justify-center h-full min-h-[300px] text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.4 
              }}
            >
              <motion.div 
                className="text-4xl mb-4"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🎨
              </motion.div>
              <motion.p 
                className="text-lg font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {emptyMessage}
              </motion.p>
              <motion.p 
                className="text-sm text-gray-400 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Start building by dragging components from the palette
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

ComponentCanvas.displayName = 'ComponentCanvas' 