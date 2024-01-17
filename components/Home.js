import React from 'react'
import AliceCarousel from 'react-alice-carousel'

export default function Home(props) {
  const handleOnDragStart = (e) => e.preventDefault()
  return (
    <div>
      <div className='home-slider'>
        <AliceCarousel
          mouseTrackingEnabled
          stagePadding={{
            paddingLeft: 30, // in pixels
            paddingRight: 30,
          }}
          dotsDisabled
          buttonsDisabled
        >
          <div className='home-slider-item'>
            <img
              src='https://source.unsplash.com/351x180/?grocery=1'
              onDragStart={handleOnDragStart}
              alt={'Slider 1'}
            />
          </div>
          <div className='home-slider-item'>
            <img
              src='https://source.unsplash.com/351x180/?grocery=2'
              onDragStart={handleOnDragStart}
              alt={'Slider 2'}
            />
          </div>
          <div className='home-slider-item'>
            <img
              src='https://source.unsplash.com/351x180/?grocery=3'
              onDragStart={handleOnDragStart}
              alt={'Slider 3'}
            />
          </div>
        </AliceCarousel>
      </div>
    </div>
  )
}