import React from 'react'
import LazyLoad from 'react-lazyload'
import { Image } from 'react-bootstrap'

export default function Img(props) {
  return (
    <figure>
      <Image {...props} fluid />
      <noscript>
        <img src={props.src} />
      </noscript>
    </figure>
  )
}
