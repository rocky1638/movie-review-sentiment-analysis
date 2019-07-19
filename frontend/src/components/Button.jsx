import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px;
  margin: 5px 0px;
  font-family: ${({ theme }) => theme.fonts.sans};
  background-color: ${props => props.green
    ? props.theme.colors.green : props.red
      ? props.theme.colors.red : props.theme.colors.purple};
  color: ${ ({ theme }) => theme.colors.white};
  font-size: ${ ({ theme }) => theme.fontSizes.medium};
  width: 100%;
  transition: 0.2s;

  &:hover {
  cursor: pointer;
  transition: 0.2s;
  background-color: "#3a0a7e" !important;
}
`

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

export default Button