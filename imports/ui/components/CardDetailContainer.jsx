import React from 'react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: white;

  nav {
    width: 2.5rem;
    position: relative;
    padding: 2rem 0;

    &::after {
      content: ' ';
      width: 1px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: #ccc;
    }

    button {
      display: block;
      margin: auto;
      padding: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 3px;
      border: 0;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`

class CardDetailContainer extends React.Component {
  state = {
    isShow: true,
  }

  render() {
    return (
      <Container>
        <nav>
          <button onClick={() => this.setState({isShow: !this.state.isShow})}>
            <LastPageIcon />
          </button>
        </nav>
        card detail....
      </Container>
    )
  }
}

export default CardDetailContainer;
