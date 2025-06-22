import React from 'react'
import { useStyling } from '../hooks/useStyling.js'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Component Inspector - for editing component properties and styles with Framer Motion animations
 */
export const ComponentInspector = ({
  selectedComponent,
  onUpdateProps,
  onUpdateStyles,
  onDelete,
  onDuplicate,
  className = '',
  ...props
}) => {
  const styling = useStyling({
    defaultStyles: {
      base: 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm',
    },
    animations: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  })

  const inspectorClasses = styling.getClassName({
    className
  })

  const handlePropChange = (key, value) => {
    onUpdateProps?.(selectedComponent.id, { [key]: value })
  }

  const handleStyleChange = (key, value) => {
    onUpdateStyles?.(selectedComponent.id, { [key]: value })
  }

  const renderPropertyEditor = (key, propConfig, value) => {
    const { type, label, options } = propConfig

    switch (type) {
      case 'string':
        return (
          <motion.input
            type="text"
            value={value || ''}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={label}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        )
      
      case 'boolean':
        return (
          <motion.input
            type="checkbox"
            checked={value || false}
            onChange={(e) => handlePropChange(key, e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            whileTap={{ scale: 0.95 }}
          />
        )
      
      case 'select':
        return (
          <motion.select
            value={value || ''}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </motion.select>
        )
      
      default:
        return (
          <motion.input
            type="text"
            value={value || ''}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        )
    }
  }

  if (!selectedComponent) {
    return (
      <motion.div 
        className={inspectorClasses} 
        {...styling.getMotionProps()}
        {...props}
      >
        <motion.h3 
          className="text-lg font-semibold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Inspector
        </motion.h3>
        <motion.div 
          className="text-center py-8 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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
            🔍
          </motion.div>
          <p>Select a component to edit its properties</p>
        </motion.div>
      </motion.div>
    )
  }

  const componentMetadata = selectedComponent.metadata || {}
  const componentProps = selectedComponent.props || {}
  const componentStyles = selectedComponent.styles || {}

  return (
    <motion.div 
      className={inspectorClasses} 
      {...styling.getMotionProps()}
      {...props}
    >
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-gray-900">
          Inspector
        </h3>
        <div className="flex space-x-2">
          <motion.button
            onClick={() => onDuplicate?.(selectedComponent.id)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            title="Duplicate"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            📋
          </motion.button>
          <motion.button
            onClick={() => onDelete?.(selectedComponent.id)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🗑️
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Component Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Component Info
          </h4>
          <motion.div 
            className="bg-gray-50 p-3 rounded-md"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {componentMetadata.type || 'Unknown'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">ID:</span> {selectedComponent.id}
            </p>
          </motion.div>
        </motion.div>

        {/* Properties */}
        {componentMetadata.props && Object.keys(componentMetadata.props).length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Properties
            </h4>
            <div className="space-y-3">
              {Object.entries(componentMetadata.props).map(([key, propConfig], index) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {propConfig.label || key}
                  </label>
                  {renderPropertyEditor(key, propConfig, componentProps[key])}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Styles */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Styles
          </h4>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Background Color
              </label>
              <motion.input
                type="color"
                value={componentStyles.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Text Color
              </label>
              <motion.input
                type="color"
                value={componentStyles.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Border Radius (px)
              </label>
              <motion.input
                type="number"
                value={componentStyles.borderRadius || 0}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                min="0"
                max="50"
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Padding (px)
              </label>
              <motion.input
                type="number"
                value={componentStyles.padding || 0}
                onChange={(e) => handleStyleChange('padding', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                min="0"
                max="100"
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

ComponentInspector.displayName = 'ComponentInspector' 