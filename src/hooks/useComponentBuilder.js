import { useState, useCallback, useMemo } from 'react'
import { useDragAndDrop } from './useDragAndDrop.js'
import { useStyling } from './useStyling.js'

/**
 * Custom hook for building and managing draggable components
 * @param {Object} options - Configuration options
 * @param {Array} options.components - Available components
 * @param {Array} options.canvas - Canvas components
 * @param {Object} options.theme - Theme configuration
 * @returns {Object} Component builder utilities and state
 */
export const useComponentBuilder = ({
  components = [],
  canvas = [],
  theme = {}
} = {}) => {
  const [availableComponents, setAvailableComponents] = useState(components)
  const [canvasComponents, setCanvasComponents] = useState(canvas)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isDraggingFromPalette, setIsDraggingFromPalette] = useState(false)

  // Styling hook for the builder
  const styling = useStyling({ theme })

  // Add component to canvas
  const addComponentToCanvas = useCallback((component, position = null) => {
    const newComponent = {
      id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: component.type,
      props: { ...component.defaultProps },
      styles: { ...component.defaultStyles },
      position: position || { x: 0, y: 0 },
      createdAt: new Date().toISOString()
    }

    setCanvasComponents(prev => [...prev, newComponent])
    return newComponent
  }, [])

  // Remove component from canvas
  const removeComponentFromCanvas = useCallback((componentId) => {
    setCanvasComponents(prev => prev.filter(comp => comp.id !== componentId))
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null)
    }
  }, [selectedComponent])

  // Update component properties
  const updateComponentProps = useCallback((componentId, newProps) => {
    setCanvasComponents(prev => prev.map(comp => 
      comp.id === componentId 
        ? { ...comp, props: { ...comp.props, ...newProps } }
        : comp
    ))
  }, [])

  // Update component styles
  const updateComponentStyles = useCallback((componentId, newStyles) => {
    setCanvasComponents(prev => prev.map(comp => 
      comp.id === componentId 
        ? { ...comp, styles: { ...comp.styles, ...newStyles } }
        : comp
    ))
  }, [])

  // Move component in canvas
  const moveComponent = useCallback((componentId, newPosition) => {
    setCanvasComponents(prev => prev.map(comp => 
      comp.id === componentId 
        ? { ...comp, position: newPosition }
        : comp
    ))
  }, [])

  // Duplicate component
  const duplicateComponent = useCallback((componentId) => {
    const component = canvasComponents.find(comp => comp.id === componentId)
    if (component) {
      const duplicated = {
        ...component,
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position: {
          x: component.position.x + 20,
          y: component.position.y + 20
        }
      }
      setCanvasComponents(prev => [...prev, duplicated])
      return duplicated
    }
  }, [canvasComponents])

  // Handle drag start from palette
  const handlePaletteDragStart = useCallback((component) => {
    setIsDraggingFromPalette(true)
    setSelectedComponent(component)
  }, [])

  // Handle drop on canvas
  const handleCanvasDrop = useCallback((event, position) => {
    if (selectedComponent && isDraggingFromPalette) {
      addComponentToCanvas(selectedComponent, position)
      setIsDraggingFromPalette(false)
      setSelectedComponent(null)
    }
  }, [selectedComponent, isDraggingFromPalette, addComponentToCanvas])

  // Get component by type
  const getComponentByType = useCallback((type) => {
    return availableComponents.find(comp => comp.type === type)
  }, [availableComponents])

  // Export canvas as JSON
  const exportCanvas = useCallback(() => {
    return {
      components: canvasComponents,
      theme: styling.theme,
      exportedAt: new Date().toISOString()
    }
  }, [canvasComponents, styling.theme])

  // Import canvas from JSON
  const importCanvas = useCallback((data) => {
    if (data.components) {
      setCanvasComponents(data.components)
    }
    if (data.theme) {
      styling.updateCustomStyles(data.theme)
    }
  }, [styling])

  // Clear canvas
  const clearCanvas = useCallback(() => {
    setCanvasComponents([])
    setSelectedComponent(null)
  }, [])

  // Get canvas statistics
  const canvasStats = useMemo(() => {
    const stats = {
      total: canvasComponents.length,
      byType: {},
      byVariant: {}
    }

    canvasComponents.forEach(comp => {
      stats.byType[comp.type] = (stats.byType[comp.type] || 0) + 1
      if (comp.props.variant) {
        stats.byVariant[comp.props.variant] = (stats.byVariant[comp.props.variant] || 0) + 1
      }
    })

    return stats
  }, [canvasComponents])

  return {
    // State
    availableComponents,
    canvasComponents,
    selectedComponent,
    isDraggingFromPalette,
    
    // Methods
    addComponentToCanvas,
    removeComponentFromCanvas,
    updateComponentProps,
    updateComponentStyles,
    moveComponent,
    duplicateComponent,
    handlePaletteDragStart,
    handleCanvasDrop,
    getComponentByType,
    exportCanvas,
    importCanvas,
    clearCanvas,
    
    // Utilities
    canvasStats,
    styling,
    
    // Setters
    setAvailableComponents,
    setCanvasComponents,
    setSelectedComponent,
  }
} 