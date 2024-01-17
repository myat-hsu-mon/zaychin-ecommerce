import React from 'react'

function LoadingCard() {
  return (
    <div className='loading-card'>
      <div className='inner'>
        <div className='one white'></div>
        <div className='two white'></div>
        <div className='three white'></div>
        <div className='four white'></div>
        <div className='five white'></div>
        <div className='six white'></div>
        <div className='seven white'></div>
      </div>
      <div className='loading-btn'></div>
    </div>
  )
}

export default function CollectionLoading({ count }) {
  var loading = []
  for (var i = 0; i < count; i++) {
    loading.push(
      <div className='col-md-2' key={i}>
        <LoadingCard  />
      </div>
    )
  }
  return <div className='row'>{loading}</div>
}
