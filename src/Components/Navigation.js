import React from 'react';
import { CHANGE_ROUTER } from '../Actions/index'
import { connect } from 'react-redux';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.move = this.move.bind(this);
    }

    render() {
        return <ul id='navigation'>
            <li onClick={this.move} id="navigation-home" className="navigation-btn">홈</li>
            <li onClick={this.move} id="navigation-game" className="navigation-btn">게임</li>
            <li onClick={this.move} id="navigation-board" className="navigation-btn">게시판</li>
            <li onClick={this.move} id="navigation-ranking" className="navigation-btn">랭킹</li>
            <li onClick={this.move} id="navigation-myinfo" className="navigation-btn">내 정보</li>
        </ul>
    }

    move(e) {
        this.props.dispatch({ type: CHANGE_ROUTER, value: e.target.id.split('-')[1] })
    }
}

export default connect(undefined)(Navigation)