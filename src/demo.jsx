import React from 'react'
import { createRoot } from 'react-dom/client'
import { ComponentBuilder } from './components/ComponentBuilder.jsx'
import { Button } from './components/Button.jsx'
import { Card } from './components/Card.jsx'
import { Input } from './components/Input.jsx'
import { Text } from './components/Text.jsx'
import './styles.css'

// Create default components array
const defaultComponents = [
  Button,
  Card,
  Input,
  Text
]

// Custom theme
const customTheme = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  }
}

function Demo() {
  const handleExport = (data) => {
    console.log('Exported canvas:', data)
  }

  const handleImport = (data) => {
    console.log('Imported canvas:', data)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ComponentBuilder
        components={defaultComponents}
        theme={customTheme}
        onExport={handleExport}
        onImport={handleImport}
      />
    </div>
  )
}

// Create root and render
const root = createRoot(document.getElementById('root'))
root.render(<Demo />) 