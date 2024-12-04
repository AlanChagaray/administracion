import React from 'react'
import { SpinnerCircularFixed } from 'spinners-react'

export const Spinner = () => {
  return (
    <div>
        <div className="flex items-center content-center justify-center">
          <SpinnerCircularFixed
            size={45}
            thickness={100}
            speed={100}
            color="gray"
            secondaryColor="rgba(0,0,0,0)"
          />
        </div>
    </div>
  )
}
