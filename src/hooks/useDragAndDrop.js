import { useState, useCallback, useRef } from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Custom hook for drag and drop functionality with Framer Motion animations
 * @param {Object} options - Configuration options
 * @param {string} options.id - Unique identifier for the draggable item
 * @param {boolean} options.draggable - Whether the item can be dragged
 * @param {boolean} options.droppable - Whether the item can accept drops
 * @param {Function} options.onDrop - Callback when item is dropped
 * @param {Function} options.onDragStart - Callback when drag starts
 * @param {Function} options.onDragEnd - Callback when drag ends
 * @param {Object} options.styles - Custom styles for drag states
 * @param {Object} options.animations - Custom Framer Motion animations
 * @returns {Object} Drag and drop handlers and state
 */
export const useDragAndDrop = ({
  id,
  draggable = true,
  droppable = false,
  onDrop,
  onDragStart,
  onDragEnd,
  styles = {},
  animations = {}
} = {}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const elementRef = useRef(null)

  // Draggable configuration
  const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({
    id,
    disabled: !draggable,
  })

  // Droppable configuration
  const { setNodeRef: setDroppableRef, isOver: droppableIsOver } = useDroppable({
    id: `${id}-drop`,
    disabled: !droppable,
  })

  // Combined ref for both draggable and droppable
  const setNodeRef = useCallback((node) => {
    setDraggableRef(node)
    if (droppable) {
      setDroppableRef(node)
    }
    elementRef.current = node
  }, [setDraggableRef, setDroppableRef, droppable])

  // Handle drag start
  const handleDragStart = useCallback((event) => {
    setIsDragging(true)
    onDragStart?.(event)
  }, [onDragStart])

  // Handle drag end
  const handleDragEnd = useCallback((event) => {
    setIsDragging(false)
    setIsOver(false)
    onDragEnd?.(event)
  }, [onDragEnd])

  // Handle drop
  const handleDrop = useCallback((event) => {
    setIsOver(false)
    onDrop?.(event)
  }, [onDrop])

  // Handle drag over
  const handleDragOver = useCallback(() => {
    if (droppable) {
      setIsOver(true)
    }
  }, [droppable])

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setIsOver(false)
  }, [])

  // Default animations
  const defaultAnimations = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -20 },
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    drag: { scale: 1.05, rotate: 2, zIndex: 1000 },
    drop: { scale: 1, rotate: 0 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }

  // Merge custom animations with defaults
  const mergedAnimations = {
    ...defaultAnimations,
    ...animations
  }

  // Get computed styles based on state
  const getComputedStyles = useCallback(() => {
    const baseStyles = {
      cursor: draggable ? 'grab' : 'default',
      transition: 'all 0.2s ease-in-out',
      ...styles.base
    }

    if (isDragging) {
      return {
        ...baseStyles,
        cursor: 'grabbing',
        opacity: 0.5,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: 1000,
        ...styles.dragging
      }
    }

    if (isOver || droppableIsOver) {
      return {
        ...baseStyles,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '2px dashed #3b82f6',
        ...styles.over
      }
    }

    return baseStyles
  }, [isDragging, isOver, droppableIsOver, transform, draggable, styles])

  // Get motion props for Framer Motion
  const getMotionProps = useCallback(() => {
    const motionProps = {
      ...mergedAnimations,
      drag: draggable,
      dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
      dragElastic: 0.1,
      dragMomentum: false,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onHoverStart: () => setIsOver(true),
      onHoverEnd: () => setIsOver(false),
    }

    if (isDragging) {
      motionProps.animate = { ...motionProps.animate, ...mergedAnimations.drag }
    }

    return motionProps
  }, [draggable, handleDragStart, handleDragEnd, isDragging, mergedAnimations])

  return {
    // State
    isDragging,
    isOver: isOver || droppableIsOver,
    transform,
    
    // Refs
    setNodeRef,
    elementRef,
    
    // Event handlers
    attributes,
    listeners,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    
    // Styles
    getComputedStyles,
    
    // Framer Motion
    motion,
    AnimatePresence,
    getMotionProps,
    
    // Utilities
    canDrag: draggable,
    canDrop: droppable
  }
} 