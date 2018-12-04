import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icon/FirstPage';
import LastPageIcon from '@material-ui/icon/LastPage';

const Container = styled.div`
  display: flex;
  height: 100%;

  nav {
    background-color: white;
    width: 40px;
  }
`

class CardDetailContainer extends React.Component {
  render() {
    return (
      <Container>
        <nav>
          <Button><LastPageIcon /></Button>
        </nav>
        card detail....
      </Container>
    )
  }
}

export default CardDetailContainer;
