import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes, CSSProperties } from 'react'

interface WrapperProps {
  backgroundColor: CSSProperties['backgroundColor']
}

const Wrapper = styled.button<WrapperProps>`
  background-color: ${(props) => props.backgroundColor};
  border: 0;
  box-shadow: none;
  color: white;
  cursor: pointer;
  margin: 0;
  padding: 4px 8px;
`

interface PollButtonProps {
  backgroundColor: CSSProperties['backgroundColor']
  label: string
  onClick: ButtonHTMLAttributes<unknown>['onClick']
}

const PollButton = (props: PollButtonProps) => {
  const { backgroundColor, label, onClick } = props

  return (
    <Wrapper backgroundColor={backgroundColor} onClick={onClick}>
      {label}
    </Wrapper>
  )
}

export default PollButton
