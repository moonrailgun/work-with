import React from 'react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: #efefef;

  nav {
    position: relative;
    width: 2.5rem;
    padding: 1rem 0;

    &::before {
      content: ' ';
      width: 1px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: #ccc;
      transform: scaleX(0.5);
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
      background: transparent;
      outline: 0;

      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }

  main {
    position: relative;
    overflow: hidden;
    transition: width 0.4s ease-in-out;
    width: ${props => props.collapse ? 0 : '280px'};

    &::before {
      content: ' ';
      width: 1px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: #ccc;
      transform: scaleX(0.5);
    }
  }
`

class CardDetailContainer extends React.Component {
  state = {
    isShow: true,
  }

  render() {
    return (
      <Container collapse={this.state.isShow}>
        <nav>
          <button onClick={() => this.setState({isShow: !this.state.isShow})}>
            {
              this.state.isShow ? (
                <FirstPageIcon />
              ) : (
                <LastPageIcon />
              )
            }
          </button>
        </nav>
        <main>
          card detail....
        </main>
      </Container>
    )
  }
}

export default CardDetailContainer;
