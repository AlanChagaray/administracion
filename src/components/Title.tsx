import React from 'react'

interface Props{
    value : string;
}
export const Title = ({value}:Props) => {
  return (
    <>
        <p className='text-lg '>{value}</p>
    </>
  )
}
