import { memo } from 'react'
import COLOR from '../../utils/color'

const HomeIcon = (prop) => {
  return (
    <>
      <svg
        width="1.5em"
        height="1.5em"
        fill="none"
        viewBox="0 0 1024 1024"
        version="1.1"
        color={prop.color}
      >
        <g>
          <g>
            <path
              fill={prop.light ? COLOR.PRIMARY.WHITE : `#3a416f`}
              d="M968,556.4h-90.2v323.8c0,24-10.5,54-54,54H607.9V610.4H392.1v323.8H176.2c-43.5,0-54-29.9-54-54V556.4H32c-32.3,0-25.4-17.5-3.2-40.4l433-433.4c10.5-10.9,24.3-16.3,38.2-16.8c13.9,0.5,27.7,5.9,38.2,16.8L971.2,516C993.3,539,1000.2,556.4,968,556.4L968,556.4z"
            />
          </g>
        </g>
      </svg>
    </>
  )
}

export default memo(HomeIcon)

