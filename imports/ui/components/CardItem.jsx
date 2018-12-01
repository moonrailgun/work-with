import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  border-radius: ${props => props.theme.shape.borderRadius}px;
  margin-bottom: ${props => props.theme.spacing.unit}px;
  padding: ${props => props.theme.spacing.unit * 2}px;
  user-select: none;
  background-color: ${props => props.theme.palette.common.white};
  box-shadow: 'none';

  &:hover, &:active {
    box-shadow: ${props => props.theme.shadows[1]};
  }
`

class CardItem extends React.Component {
  render() {
    return (
      <Root {...this.props}>
        {this.props.children}
      </Root>
    )
  }
}

export default CardItem;
