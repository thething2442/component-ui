declare module 'react-drag-builder-ui' {
  import { ReactNode, RefObject } from 'react'
  import { MotionProps } from 'framer-motion'

  // Hook Types
  export interface DragAndDropOptions {
    id: string
    draggable?: boolean
    droppable?: boolean
    onDrop?: (event: any) => void
    onDragStart?: (event: any) => void
    onDragEnd?: (event: any) => void
    styles?: {
      base?: React.CSSProperties
      dragging?: React.CSSProperties
      over?: React.CSSProperties
    }
    animations?: MotionProps
  }

  export interface StylingOptions {
    theme?: Record<string, any>
    variants?: Record<string, string>
    sizes?: Record<string, string>
    defaultStyles?: {
      base?: string
      states?: Record<string, string>
    }
    animations?: MotionProps
  }

  export interface ComponentBuilderOptions {
    components?: any[]
    canvas?: any[]
    theme?: Record<string, any>
  }

  // Hook Return Types
  export interface DragAndDropReturn {
    isDragging: boolean
    isOver: boolean
    transform: any
    setNodeRef: (node: HTMLElement | null) => void
    elementRef: RefObject<HTMLElement>
    attributes: any
    listeners: any
    handleDragStart: (event: any) => void
    handleDragEnd: (event: any) => void
    handleDrop: (event: any) => void
    handleDragOver: () => void
    handleDragLeave: () => void
    getComputedStyles: () => React.CSSProperties
    motion: any
    AnimatePresence: any
    getMotionProps: () => MotionProps
    canDrag: boolean
    canDrop: boolean
  }

  export interface StylingReturn {
    theme: Record<string, any>
    activeVariant: string
    activeSize: string
    customStyles: Record<string, any>
    getClassName: (options?: any) => string
    updateCustomStyles: (styles: Record<string, any>) => void
    setActiveVariant: (variant: string) => void
    setActiveSize: (size: string) => void
    getThemeColor: (colorName: string, shade?: number) => string | undefined
    getThemeCSSVariables: () => Record<string, string>
    getMotionProps: (customAnimations?: MotionProps) => MotionProps
    variants: Record<string, string>
    sizes: Record<string, string>
    animations: MotionProps
    motion: any
    cn: (options?: any) => string
  }

  export interface ComponentBuilderReturn {
    availableComponents: any[]
    canvasComponents: any[]
    selectedComponent: any
    isDraggingFromPalette: boolean
    addComponentToCanvas: (component: any, position?: any) => any
    removeComponentFromCanvas: (componentId: string) => void
    updateComponentProps: (componentId: string, newProps: any) => void
    updateComponentStyles: (componentId: string, newStyles: any) => void
    moveComponent: (componentId: string, newPosition: any) => void
    duplicateComponent: (componentId: string) => any
    handlePaletteDragStart: (component: any) => void
    handleCanvasDrop: (event: any, position: any) => void
    getComponentByType: (type: string) => any
    exportCanvas: () => any
    importCanvas: (data: any) => void
    clearCanvas: () => void
    canvasStats: {
      total: number
      byType: Record<string, number>
      byVariant: Record<string, number>
    }
    styling: StylingReturn
    setAvailableComponents: (components: any[]) => void
    setCanvasComponents: (components: any[]) => void
    setSelectedComponent: (component: any) => void
  }

  // Component Props Types
  export interface ButtonProps {
    children?: ReactNode
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'outline' | 'ghost'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    disabled?: boolean
    loading?: boolean
    onClick?: (event: any) => void
    className?: string
    draggable?: boolean
    droppable?: boolean
    onDrop?: (event: any) => void
    onDragStart?: (event: any) => void
    onDragEnd?: (event: any) => void
    customStyles?: Record<string, any>
    animations?: MotionProps
  }

  export interface CardProps {
    children?: ReactNode
    title?: string
    subtitle?: string
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'dark' | 'elevated'
    size?: 'sm' | 'md' | 'lg'
    padding?: boolean
    shadow?: boolean
    border?: boolean
    className?: string
    draggable?: boolean
    droppable?: boolean
    onDrop?: (event: any) => void
    onDragStart?: (event: any) => void
    onDragEnd?: (event: any) => void
    customStyles?: Record<string, any>
    animations?: MotionProps
  }

  export interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
    placeholder?: string
    value?: string
    label?: string
    error?: string
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    required?: boolean
    className?: string
    draggable?: boolean
    droppable?: boolean
    onDrop?: (event: any) => void
    onDragStart?: (event: any) => void
    onDragEnd?: (event: any) => void
    onChange?: (event: any) => void
    customStyles?: Record<string, any>
    animations?: MotionProps
  }

  export interface TextProps {
    children?: ReactNode
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small' | 'code'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'muted' | 'white'
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
    align?: 'left' | 'center' | 'right' | 'justify'
    className?: string
    draggable?: boolean
    droppable?: boolean
    onDrop?: (event: any) => void
    onDragStart?: (event: any) => void
    onDragEnd?: (event: any) => void
    customStyles?: Record<string, any>
    animations?: MotionProps
  }

  export interface ComponentPaletteProps {
    components?: any[]
    onDragStart?: (component: any) => void
    className?: string
    title?: string
  }

  export interface ComponentCanvasProps {
    children?: ReactNode
    onDrop?: (componentData: any, position: any) => void
    onDragOver?: (event: any) => void
    onDragLeave?: (event: any) => void
    className?: string
    title?: string
    emptyMessage?: string
  }

  export interface ComponentInspectorProps {
    selectedComponent?: any
    onUpdateProps?: (componentId: string, newProps: any) => void
    onUpdateStyles?: (componentId: string, newStyles: any) => void
    onDelete?: (componentId: string) => void
    onDuplicate?: (componentId: string) => void
    className?: string
  }

  export interface ComponentBuilderProps {
    components?: any[]
    initialCanvas?: any[]
    theme?: Record<string, any>
    className?: string
    onExport?: (data: any) => void
    onImport?: (data: any) => void
  }

  // Component Metadata Types
  export interface ComponentMetadata {
    type: string
    category: string
    icon: string
    description: string
    defaultProps: Record<string, any>
    defaultStyles: {
      base: Record<string, any>
      dragging: Record<string, any>
      over: Record<string, any>
    }
    variants: string[]
    sizes: string[]
    props: Record<string, {
      type: string
      label?: string
      options?: string[]
    }>
  }

  // Utility Types
  export interface ComponentData {
    id: string
    type: string
    props: Record<string, any>
    styles: Record<string, any>
    position: { x: number; y: number }
    createdAt: string
  }

  export interface CanvasData {
    components: ComponentData[]
    theme: Record<string, any>
    exportedAt: string
  }

  // Hook Functions
  export function useDragAndDrop(options: DragAndDropOptions): DragAndDropReturn
  export function useStyling(options?: StylingOptions): StylingReturn
  export function useComponentBuilder(options?: ComponentBuilderOptions): ComponentBuilderReturn

  // Components
  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>
  export const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>
  export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>
  export const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>
  export const ComponentPalette: React.FC<ComponentPaletteProps>
  export const ComponentCanvas: React.FC<ComponentCanvasProps>
  export const ComponentInspector: React.FC<ComponentInspectorProps>
  export const ComponentBuilder: React.FC<ComponentBuilderProps>

  // Utility Functions
  export function createComponent(type: string, props?: Record<string, any>, styles?: Record<string, any>): ComponentData
  export function createTheme(colors?: Record<string, any>, variants?: Record<string, any>, sizes?: Record<string, any>): Record<string, any>

  // Default Components
  export const defaultComponents: any[]
}

// Global module augmentation for better TypeScript support
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'customize-ui-button': any
      'customize-ui-card': any
      'customize-ui-input': any
      'customize-ui-text': any
      'customize-ui-palette': any
      'customize-ui-canvas': any
      'customize-ui-inspector': any
      'customize-ui-builder': any
    }
  }
} 