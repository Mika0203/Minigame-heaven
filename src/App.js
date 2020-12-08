import React from 'react';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import { Provider, connect } from 'react-redux';
import { CHANGE_ROUTER } from './Actions/index';


import MyInfo from './Components/Information';
import Home from './Components/Home';
import Ranking from './Components/Ranking';
import Game from './Components/Game';
import { Board, WritePost, ViewPost } from './Components/Board';

const store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Form />
        <Navigation />
      </Provider>
    )
  };

}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { route: window.location.pathname.slice(1) };
  }

  componentDidMount(){
    window.addEventListener('popstate', (e) => {
      console.log(this);
      console.log(e);
      this.props.dispatch({
        type : CHANGE_ROUTER,
        route : e.path[0].location.pathname.split('/')[1]
      })
    })
  }

  render() {
    return <div id='form'>
      {this.getForm()}
    </div>
  }

  getForm = () => {
    switch (this.props.route) {
      case "":
      case 'home':
        return <Home />
      case 'board':
        return <Board />
      case 'board-write':
        return <WritePost />
      case 'board/view/':
        return <ViewPost />
      case 'game':
        return <Game />
      case 'ranking':
        return <Ranking />
      case 'myinfo':
        return <MyInfo />
    }
  }
}


let mapStateToProps = (dispatch) => {
  console.log(dispatch);
  return {
    route: dispatch.route
  }

}

Form = connect(mapStateToProps)(Form);

export default App;
