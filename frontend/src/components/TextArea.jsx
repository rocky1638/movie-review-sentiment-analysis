import React from 'react'
import styled from 'styled-components'

const StyledTextArea = styled.textarea`
  margin: 10px 0px;
  padding: 10px;
  width: 94%;
  border-radius: 3px;
  border-color: ${({ theme }) => theme.colors.lightgrey};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: 0.1s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.grey};
    outline: none !important;
    transition: 0.1s;
  }
`

const TextArea = ({ children, ...props }) => (
  <StyledTextArea {...props}>{children}</StyledTextArea>
)

export default TextArea