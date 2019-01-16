import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';

const Main = styled(Card)`
  margin-top: 180px;
  width: 600px;
`

class NotFound extends React.Component {
  render() {
    const {
      classes
    } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Main>
            <CardContent>
              <Typography variant="h2" align="center">
                <ErrorIcon fontSize="inherit" color="error" />
              </Typography>
              <Typography variant="h4" align="center">没有找到合适的内容, 可能数据已被删除</Typography>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Button color="primary" onClick={() => this.props.history.goBack()}>
                  回到上一页
                </Button>
                <Button color="secondary" onClick={() => this.props.history.push('/')}>
                  回到首页
                </Button>
              </Grid>
            </CardContent>
          </Main>
        </Grid>
      </Grid>
    )
  }
}

export default NotFound;
