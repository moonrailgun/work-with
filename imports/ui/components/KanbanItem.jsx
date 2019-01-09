import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

const Root = styled(Card)`
  height: 96px;

  .actionArea {
    padding: ${props => props.theme.spacing.unit}px;
    width: 100%;
    height: 100%;

    .content {
      padding: 0;
      height: 100%;
      overflowWrap: break-word;
    }

    .newCard {
      padding: 0;
      text-align: center;
    }
  }
`

function KanbanItem (props) {
  const {
    className,
    isNew = false,
    title,
    onClick,
  } = props;

  return (
    <Root onClick={onClick} className={className}>
      <CardActionArea className="actionArea">
        {
          isNew ? (
            <CardContent className="newCard">
              创建新看板
            </CardContent>
          ) : (
            <CardContent className="content">
              {title}
            </CardContent>
          )
        }
      </CardActionArea>
    </Root>
  )
}

KanbanItem.propTypes = {
  className: PropTypes.string,
  isNew: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
}

export default KanbanItem;
