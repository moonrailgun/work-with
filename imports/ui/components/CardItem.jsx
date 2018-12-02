import React from 'react';
import styled from 'styled-components';

import NotesIcon from '@material-ui/icons/Notes';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Root = styled.div`
  border-radius: ${props => props.theme.shape.borderRadius}px;
  margin-bottom: ${props => props.theme.spacing.unit}px;
  padding: ${props => props.theme.spacing.unit}px;
  user-select: none;
  background-color: ${props => props.theme.palette.common.white};
  box-shadow: 'none';
  display: flex;

  &:hover, &:active {
    box-shadow: ${props => props.theme.shadows[1]};
  }

  .main {
    flex: 1;
    padding: ${props => props.theme.spacing.unit}px 0;
    width: 0;
    overflow-wrap: break-word;
  }

  .type, .action {
    & > svg {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: ${props => props.theme.palette.grey[700]};
    }
    margin: ${props => props.theme.spacing.unit}px;
    cursor: pointer;
  }
`

class CardItem extends React.Component {
  render() {
    return (
      <Root>
        <div className="type"><NotesIcon /></div>
        <div className="main">{this.props.children}</div>
        <div className="action"><MoreHorizIcon /></div>
      </Root>
    )
  }
}

export default CardItem;
