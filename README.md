# Customize UI - Drag & Drop Component Library

A powerful React component library with customizable hooks for drag-and-drop functionality, Framer Motion animations, and styling. Build beautiful UIs by dragging components and customizing their appearance in real-time.

## Features

- 🎨 **Drag & Drop Interface** - Intuitive component palette and canvas
- 🎛️ **Customizable Hooks** - Powerful hooks for styling and drag-and-drop
- 🎨 **Theme System** - Flexible theming with color palettes and variants
- 📦 **Component Library** - Pre-built components (Button, Card, Input, Text)
- 🔧 **Live Inspector** - Real-time property and style editing
- 💾 **Import/Export** - Save and load your component configurations
- 🎯 **TypeScript Ready** - Full TypeScript support with comprehensive types
- 📱 **Responsive** - Works on all screen sizes
- ✨ **Framer Motion** - Smooth animations and transitions

## Installation

### NPM

```bash
npm install customize-ui
```

### Yarn

```bash
yarn add customize-ui
```

### PNPM

```bash
pnpm add customize-ui
```

## Quick Start

### Basic Usage

```jsx
import React from 'react'
import { ComponentBuilder, Button, Card, Input, Text } from 'customize-ui'

function App() {
  const components = [Button, Card, Input, Text]
  
  return (
    <ComponentBuilder
      components={components}
      theme={{
        primary: {
          500: '#3b82f6',
          600: '#2563eb',
        }
      }}
    />
  )
}
```

### TypeScript Support

The library includes full TypeScript support with comprehensive type definitions:

```tsx
import { 
  ButtonProps, 
  CardProps, 
  InputProps, 
  TextProps,
  useDragAndDrop,
  useStyling,
  useComponentBuilder 
} from 'customize-ui'

// All components and hooks are fully typed
const MyComponent: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## Hooks

### useDragAndDrop

A customizable hook for drag-and-drop functionality with Framer Motion animations.

```jsx
import { useDragAndDrop } from 'customize-ui'

function MyComponent() {
  const dragDrop = useDragAndDrop({
    id: 'my-component',
    draggable: true,
    droppable: false,
    onDrop: (event) => console.log('Dropped!'),
    animations: {
      whileHover: { scale: 1.05, y: -2 },
      whileTap: { scale: 0.95 }
    }
  })

  return (
    <div
      ref={dragDrop.setNodeRef}
      style={dragDrop.getComputedStyles()}
      {...dragDrop.attributes}
      {...dragDrop.listeners}
    >
      Draggable content
    </div>
  )
}
```

### useStyling

A powerful styling hook with theme support and Framer Motion animations.

```jsx
import { useStyling } from 'customize-ui'

function MyComponent() {
  const styling = useStyling({
    theme: {
      primary: { 500: '#3b82f6' }
    },
    variants: {
      primary: 'bg-primary-500 text-white',
      secondary: 'bg-gray-500 text-white'
    },
    sizes: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base'
    },
    animations: {
      whileHover: { scale: 1.02, y: -1 },
      whileTap: { scale: 0.98 }
    }
  })

  const className = styling.getClassName({
    variant: 'primary',
    size: 'md'
  })

  return <div className={className}>Styled content</div>
}
```

### useComponentBuilder

The main hook for managing the component builder state.

```jsx
import { useComponentBuilder } from 'customize-ui'

function MyBuilder() {
  const builder = useComponentBuilder({
    components: [Button, Card, Input],
    canvas: [],
    theme: {}
  })

  return (
    <div>
      <ComponentPalette components={builder.availableComponents} />
      <ComponentCanvas>
        {builder.canvasComponents.map(component => (
          <Component key={component.id} {...component} />
        ))}
      </ComponentCanvas>
    </div>
  )
}
```

## Components

### Basic Components

#### Button
```jsx
import { Button } from 'customize-ui'

<Button 
  variant="primary" 
  size="md" 
  onClick={() => console.log('clicked')}
  animations={{
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 }
  }}
>
  Click me
</Button>
```

#### Card
```jsx
import { Card } from 'customize-ui'

<Card 
  title="My Card" 
  variant="primary" 
  padding={true}
  animations={{
    whileHover: { y: -4, scale: 1.02 }
  }}
>
  Card content
</Card>
```

#### Input
```jsx
import { Input } from 'customize-ui'

<Input 
  type="text" 
  placeholder="Enter text..." 
  label="Name"
  variant="primary"
  animations={{
    whileFocus: { scale: 1.01 }
  }}
/>
```

#### Text
```jsx
import { Text } from 'customize-ui'

<Text 
  variant="h1" 
  color="primary" 
  weight="bold"
  animations={{
    whileHover: { scale: 1.01 }
  }}
>
  Heading
</Text>
```

### Builder Components

#### ComponentPalette
Displays available components for dragging with smooth animations.

#### ComponentCanvas
Drop zone for components with visual feedback and animations.

#### ComponentInspector
Real-time property and style editor with animated transitions.

#### ComponentBuilder
Main component that combines all builder functionality with Framer Motion.

## Customization

### Creating Custom Components

```jsx
import { useStyling, useDragAndDrop } from 'customize-ui'

export const MyCustomComponent = ({ children, variant = 'default', ...props }) => {
  const styling = useStyling({
    variants: {
      default: 'bg-white border border-gray-300',
      primary: 'bg-blue-500 text-white'
    },
    animations: {
      whileHover: { scale: 1.02, y: -1 },
      whileTap: { scale: 0.98 }
    }
  })

  const dragDrop = useDragAndDrop({
    id: 'my-custom-component',
    draggable: true,
    animations: {
      whileHover: { scale: 1.05, rotate: 2 },
      whileTap: { scale: 0.95 }
    }
  })

  return (
    <div
      ref={dragDrop.setNodeRef}
      className={styling.getClassName({ variant })}
      style={dragDrop.getComputedStyles()}
      {...dragDrop.attributes}
      {...dragDrop.listeners}
      {...props}
    >
      {children}
    </div>
  )
}

// Add metadata for the builder
MyCustomComponent.metadata = {
  type: 'MyCustomComponent',
  category: 'Custom',
  icon: '🎨',
  description: 'My custom component',
  defaultProps: {
    variant: 'default',
    children: 'Custom content'
  },
  props: {
    children: { type: 'string', label: 'Content' },
    variant: { type: 'select', options: ['default', 'primary'] }
  }
}
```

### Custom Themes

```jsx
const customTheme = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },
  custom: {
    brand: '#ff6b6b',
    accent: '#4ecdc4'
  }
}
```

## API Reference

### ComponentBuilder Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `components` | `Array` | `[]` | Available components |
| `initialCanvas` | `Array` | `[]` | Initial canvas components |
| `theme` | `Object` | `{}` | Theme configuration |
| `onExport` | `Function` | - | Export callback |
| `onImport` | `Function` | - | Import callback |

### useDragAndDrop Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | `string` | - | Unique identifier |
| `draggable` | `boolean` | `true` | Enable dragging |
| `droppable` | `boolean` | `false` | Enable dropping |
| `onDrop` | `Function` | - | Drop callback |
| `onDragStart` | `Function` | - | Drag start callback |
| `onDragEnd` | `Function` | - | Drag end callback |
| `styles` | `Object` | `{}` | Custom styles |
| `animations` | `MotionProps` | `{}` | Framer Motion animations |

### useStyling Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `theme` | `Object` | `{}` | Theme colors |
| `variants` | `Object` | `{}` | Component variants |
| `sizes` | `Object` | `{}` | Component sizes |
| `defaultStyles` | `Object` | `{}` | Default styles |
| `animations` | `MotionProps` | `{}` | Framer Motion animations |

## Development

### Setup

```bash
git clone <repository>
cd customize-ui
npm install
npm run dev
```

### Build

```bash
# Build for development
npm run build

# Build library for npm
npm run build:lib
```

### Type Checking

```bash
npm run type-check
```

### Preview

```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions, please open an issue on GitHub.

## Changelog

### v1.0.0
- Initial release
- Drag and drop functionality
- Framer Motion animations
- TypeScript support
- Component library with Button, Card, Input, Text
- Builder interface with palette, canvas, and inspector
- Theme system
- Import/Export functionality #   c o m p o n e n t - u i  
 