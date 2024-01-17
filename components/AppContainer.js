import React from 'react'
import styles from '../scss/AppContainer.module.scss'
import { Container } from 'react-bootstrap'

export default function AppContainer(props) {
  return (
    <Container
      {...props}
      className={`${styles.container} ${props.className}`}
    />
  )
}
