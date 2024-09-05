import React from 'react'

export default function page({ params }: { params: { Artist: string } }) {
  return (
    <div className=' flex flex-1 flex-col'>
      <h1>Artist Page: {params.Artist}</h1>
      <p>This is the Artist page for {params.Artist}</p>
      
    </div>
  )
}
