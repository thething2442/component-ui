import React from 'react'
import { useComponentBuilder } from '../hooks/useComponentBuilder.js'
import { ComponentPalette } from './ComponentPalette.jsx'
import { ComponentCanvas } from './ComponentCanvas.jsx'
import { ComponentInspector } from './ComponentInspector.jsx'
import { useStyling } from '../hooks/useStyling.js'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Main Component Builder - combines palette, canvas, and inspector with Framer Motion animations
 */
export const ComponentBuilder = ({
  components = [],
  initialCanvas = [],
  theme = {},
  className = '',
  onExport,
  onImport,
  ...props
}) => {
  const styling = useStyling({ theme })

  const {
    availableComponents,
    canvasComponents,
    selectedComponent,
    addComponentToCanvas,
    removeComponentFromCanvas,
    updateComponentProps,
    updateComponentStyles,
    handlePaletteDragStart,
    handleCanvasDrop,
    exportCanvas,
    importCanvas,
    clearCanvas,
    canvasStats,
    setAvailableComponents,
    setSelectedComponent
  } = useComponentBuilder({
    components,
    canvas: initialCanvas,
    theme
  })

  // Initialize available components
  React.useEffect(() => {
    if (components.length > 0) {
      setAvailableComponents(components)
    }
  }, [components, setAvailableComponents])

  // Handle export
  const handleExport = () => {
    const data = exportCanvas()
    onExport?.(data)
    
    // Create download link
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'component-canvas.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Handle import
  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          importCanvas(data)
          onImport?.(data)
        } catch (error) {
          console.error('Failed to import canvas:', error)
          alert('Failed to import canvas file')
        }
      }
      reader.readAsText(file)
    }
  }

  // Render canvas components
  const renderCanvasComponents = () => {
    return canvasComponents.map((componentData, index) => {
      const Component = availableComponents.find(comp => comp.metadata?.type === componentData.type)
      
      if (!Component) {
        return (
          <motion.div
            key={componentData.id}
            className="absolute p-4 bg-red-100 border border-red-300 rounded-md"
            style={{
              left: componentData.position?.x || 0,
              top: componentData.position?.y || 0,
              ...componentData.styles
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              delay: index * 0.1 
            }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            <p className="text-red-600">Unknown component: {componentData.type}</p>
          </motion.div>
        )
      }

      return (
        <motion.div
          key={componentData.id}
          className="absolute cursor-move"
          style={{
            left: componentData.position?.x || 0,
            top: componentData.position?.y || 0,
            ...componentData.styles
          }}
          onClick={() => setSelectedComponent(componentData)}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            delay: index * 0.1 
          }}
          whileHover={{ 
            scale: 1.02, 
            y: -2,
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
          }}
          whileTap={{ scale: 0.98 }}
          layout
        >
          <Component {...componentData.props} />
        </motion.div>
      )
    })
  }

  const builderClasses = styling.getClassName({
    className: 'grid grid-cols-12 gap-6 h-screen p-6 bg-gray-100'
  })

  return (
    <motion.div 
      className={builderClasses} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {/* Component Palette */}
      <motion.div 
        className="col-span-3"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ComponentPalette
          components={availableComponents}
          onDragStart={handlePaletteDragStart}
        />
      </motion.div>

      {/* Component Canvas */}
      <motion.div 
        className="col-span-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-gray-900"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Component Builder
          </motion.h2>
          <div className="flex space-x-2">
            <motion.button
              onClick={handleExport}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Export
            </motion.button>
            <motion.label 
              className="px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </motion.label>
            <motion.button
              onClick={clearCanvas}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear
            </motion.button>
          </div>
        </motion.div>

        <ComponentCanvas
          onDrop={handleCanvasDrop}
          title={`Canvas (${canvasStats.total} components)`}
        >
          <AnimatePresence>
            {renderCanvasComponents()}
          </AnimatePresence>
        </ComponentCanvas>
      </motion.div>

      {/* Component Inspector */}
      <motion.div 
        className="col-span-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ComponentInspector
          selectedComponent={selectedComponent}
          onUpdateProps={updateComponentProps}
          onUpdateStyles={updateComponentStyles}
          onDelete={removeComponentFromCanvas}
          onDuplicate={(id) => {
            const component = canvasComponents.find(comp => comp.id === id)
            if (component) {
              addComponentToCanvas(component, {
                x: component.position.x + 20,
                y: component.position.y + 20
              })
            }
          }}
        />
      </motion.div>
    </motion.div>
  )
}

ComponentBuilder.displayName = 'ComponentBuilder' 