import React from 'react'
import styled from 'styled-components'

const StyledText = styled.span`
  color: ${props =>
    props.white
      ? props.theme.colors.white : props.green
        ? props.theme.colors.green : props.red
          ? props.theme.colors.red : props.grey
            ? props.theme.colors.grey : props.white
              ? props.theme.colors.white : props.theme.colors.black};
  font-family: ${props => props.serif ? props.theme.fonts.serif : props.theme.fonts.sans};
  font-weight: ${props => props.bold ? 'bold' : ''};
  font-style: ${props => props.italic ? 'italic' : ''};
  font-size: ${props =>
    props.huge
      ? props.theme.fontSizes.huge : props.big
        ? props.theme.fontSizes.big : props.medium
          ? props.theme.fontSizes.medium : props.theme.fontSizes.small};
`

const Text = ({ children, ...props }) => (
  <StyledText {...props}>{children}</StyledText>
)

export default Text
