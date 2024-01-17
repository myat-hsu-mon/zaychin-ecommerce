import React from 'react'
import * as I from 'react-bootstrap-icons'

export default function Icon({ name, size = 32, color, className }) {
  const Component =I[name]
  return <Component size={size} color={color} className={className} />
}
