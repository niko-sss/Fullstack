import { useState, useImperativeHandle, forwardRef } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: black;
  background-color: DarkOrange;
  border: solid 1px black;
  border-radius: 7px 7px;
  fornt-size: 1rem;
  cursor: pointer;
  transition: transform 0.1s ease,
    color 0.1s ease,
    background-color 0.1s ease,
    font-style 0.1s ease;

  &:hover {
    color: DarkOrange;
    background-color: black;
    font-style: bold;
    transform: scale(1.2);
  }
`

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <span style={hideWhenVisible}>
        <StyledButton onClick={toggleVisibility}>{props.buttonLabel}</StyledButton>
      </span>
      <span style={showWhenVisible}>

        <StyledButton onClick={toggleVisibility}>{props.cancelButtonLabel}</StyledButton>
        {props.children}
      </span>
    </>
  )
})

export default Togglable
