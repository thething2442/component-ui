import React from 'react'
import { 
  useDragAndDrop, 
  useStyling, 
  useComponentBuilder,
  Button,
  Card,
  Input,
  Text,
  ComponentBuilder
} from './index.js'

// Example 1: Using useDragAndDrop hook
export function DraggableBox() {
  const dragDrop = useDragAndDrop({
    id: 'draggable-box',
    draggable: true,
    onDragStart: () => console.log('Drag started'),
    onDragEnd: () => console.log('Drag ended')
  })

  return (
    <div
      ref={dragDrop.setNodeRef}
      style={dragDrop.getComputedStyles()}
      {...dragDrop.attributes}
      {...dragDrop.listeners}
      className="p-4 bg-blue-500 text-white rounded cursor-grab"
    >
      Drag me!
    </div>
  )
}

// Example 2: Using useStyling hook
export function StyledButton() {
  const styling = useStyling({
    theme: {
      primary: { 500: '#3b82f6', 600: '#2563eb' }
    },
    variants: {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white',
      secondary: 'bg-gray-500 hover:bg-gray-600 text-white'
    },
    sizes: {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  })

  const className = styling.getClassName({
    variant: 'primary',
    size: 'md'
  })

  return (
    <button className={className}>
      Styled Button
    </button>
  )
}

// Example 3: Using useComponentBuilder hook
export function SimpleBuilder() {
  const builder = useComponentBuilder({
    components: [Button, Card, Input, Text],
    theme: {
      primary: { 500: '#3b82f6' }
    }
  })

  return (
    <div className="p-4">
      <h2>Component Builder Example</h2>
      <p>Available components: {builder.availableComponents.length}</p>
      <p>Canvas components: {builder.canvasComponents.length}</p>
      
      <button 
        onClick={() => builder.addComponentToCanvas(Button, { x: 100, y: 100 })}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Button
      </button>
    </div>
  )
}

// Example 4: Full ComponentBuilder usage
export function FullBuilderExample() {
  const components = [Button, Card, Input, Text]
  
  const theme = {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#64748b',
      600: '#475569'
    }
  }

  const handleExport = (data) => {
    console.log('Exported canvas:', data)
    // You can save this data to localStorage or send to server
  }

  const handleImport = (data) => {
    console.log('Imported canvas:', data)
    // You can load this data from localStorage or server
  }

  return (
    <ComponentBuilder
      components={components}
      theme={theme}
      onExport={handleExport}
      onImport={handleImport}
    />
  )
}

// Example 5: Custom component with hooks
export function CustomComponent() {
  const styling = useStyling({
    variants: {
      default: 'bg-white border border-gray-300 rounded-lg p-4',
      highlighted: 'bg-yellow-100 border-yellow-300 rounded-lg p-4'
    }
  })

  const dragDrop = useDragAndDrop({
    id: 'custom-component',
    draggable: true,
    droppable: true,
    onDrop: (event) => console.log('Dropped on custom component:', event)
  })

  const className = styling.getClassName({
    variant: 'default'
  })

  return (
    <div
      ref={dragDrop.setNodeRef}
      className={className}
      style={dragDrop.getComputedStyles()}
      {...dragDrop.attributes}
      {...dragDrop.listeners}
    >
      <h3>Custom Component</h3>
      <p>This component uses both useStyling and useDragAndDrop hooks.</p>
      <p>You can drag it and drop other components on it!</p>
    </div>
  )
}

// Add metadata for the builder
CustomComponent.metadata = {
  type: 'CustomComponent',
  category: 'Custom',
  icon: '🎨',
  description: 'A custom component example',
  defaultProps: {
    children: 'Custom component content'
  },
  props: {
    children: { type: 'string', label: 'Content' }
  }
} 