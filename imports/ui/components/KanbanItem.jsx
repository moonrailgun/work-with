import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class KanbanItem extends React.Component {
  render() {
    const {
      isNew = false,
      title,
      onClick,
    } = this.props;

    return (
      <Card onClick={onClick}>
        {
          isNew ? (
            <CardContent>
              创建新看板
            </CardContent>
          ) : (
            <CardContent>
              {title}
            </CardContent>
          )
        }
      </Card>
    )
  }
}

export default KanbanItem;
