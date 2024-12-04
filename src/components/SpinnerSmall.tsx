import React from 'react'
import { SpinnerCircularFixed } from 'spinners-react'

export const SpinnerSmall = () => {
  return (
    <div>
        <div className="flex items-center content-center justify-center">
          <SpinnerCircularFixed
            size={20}
            thickness={100}
            speed={100}
            color="grey"
            secondaryColor="rgba(0,0,0,0)"
          />
        </div>
    </div>
  )
}
