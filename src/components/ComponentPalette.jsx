import React from 'react'
import { useStyling } from '../hooks/useStyling.js'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Component Palette - displays available components for dragging with Framer Motion animations
 */
export const ComponentPalette = ({
  components = [],
  onDragStart,
  className = '',
  title = 'Components',
  ...props
}) => {
  const styling = useStyling({
    defaultStyles: {
      base: 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm',
    },
    animations: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  })

  const paletteClasses = styling.getClassName({
    className
  })

  const handleDragStart = (event, component) => {
    event.dataTransfer.setData('application/json', JSON.stringify(component))
    event.dataTransfer.effectAllowed = 'copy'
    onDragStart?.(component)
  }

  // Group components by category
  const groupedComponents = components.reduce((acc, component) => {
    const category = component.metadata?.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(component)
    return acc
  }, {})

  return (
    <motion.div 
      className={paletteClasses} 
      {...styling.getMotionProps()}
      {...props}
    >
      <motion.h3 
        className="text-lg font-semibold text-gray-900 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h3>
      
      <div className="space-y-4">
        <AnimatePresence>
          {Object.entries(groupedComponents).map(([category, categoryComponents], categoryIndex) => (
            <motion.div 
              key={category} 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <motion.h4 
                className="text-sm font-medium text-gray-700 uppercase tracking-wide"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {category}
              </motion.h4>
              <div className="grid grid-cols-2 gap-2">
                <AnimatePresence>
                  {categoryComponents.map((Component, index) => (
                    <motion.div
                      key={`${Component.metadata?.type || Component.name}-${index}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, Component)}
                      className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors duration-200"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25,
                        delay: index * 0.05 
                      }}
                      layout
                    >
                      <motion.span 
                        className="text-lg mr-2"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: index * 0.1 
                        }}
                      >
                        {Component.metadata?.icon || '📦'}
                      </motion.span>
                      <motion.span 
                        className="text-sm font-medium text-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                      >
                        {Component.metadata?.type || Component.name}
                      </motion.span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {components.length === 0 && (
        <motion.div 
          className="text-center py-8 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="text-4xl mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            📦
          </motion.div>
          <p className="text-lg font-medium">No components available</p>
        </motion.div>
      )}
    </motion.div>
  )
}

ComponentPalette.displayName = 'ComponentPalette' 