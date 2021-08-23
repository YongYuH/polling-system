import React from 'react'

interface CustomizedLabelProps {
  fontSize: React.SVGProps<unknown>['fontSize']
}

const CustomizedLabel = (props: CustomizedLabelProps) => {
  const { fontSize } = props
  return (
    <text
      dominantBaseline="central"
      x="50"
      y="50"
      dx="0"
      dy="0"
      fill="white"
      fontSize={fontSize}
      stroke="white"
      textAnchor="middle"
    >
      %
    </text>
  )
}

export default CustomizedLabel
