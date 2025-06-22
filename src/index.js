// Hooks
export { useDragAndDrop } from './hooks/useDragAndDrop.js'
export { useStyling } from './hooks/useStyling.js'
export { useComponentBuilder } from './hooks/useComponentBuilder.js'

// Basic Components
export { Button } from './components/Button.jsx'
export { Card } from './components/Card.jsx'
export { Input } from './components/Input.jsx'
export { Text } from './components/Text.jsx'

// Builder Components
export { ComponentPalette } from './components/ComponentPalette.jsx'
export { ComponentCanvas } from './components/ComponentCanvas.jsx'
export { ComponentInspector } from './components/ComponentInspector.jsx'
export { ComponentBuilder } from './components/ComponentBuilder.jsx'

// Default component library
export const defaultComponents = [
  // Import components here to avoid circular dependencies
  // These will be populated in the demo
]

// Utility functions
export const createComponent = (type, props = {}, styles = {}) => ({
  id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  type,
  props,
  styles,
  position: { x: 0, y: 0 },
  createdAt: new Date().toISOString()
})

export const createTheme = (colors = {}, variants = {}, sizes = {}) => ({
  colors,
  variants,
  sizes
}) 