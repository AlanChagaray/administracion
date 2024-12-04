import React from 'react'

interface Props{
    value : string;
}
export const Subtitle = ({value}:Props) => {
  return (
    <>
        <p className=' text-base text-gray-400 pl-2'>{value}</p>
    </>
  )
}
