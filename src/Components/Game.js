import React from 'react';
import gameList from '../config'

class Game extends React.Component {
    render() {
        return <div>{this.loadGameList()}</div>
    }

    loadGameList() {
        let list = [];
        Object.keys(gameList).forEach((game) => {
            list.push(<button onClick={
                () => { window.location.href = "/game/" + game }}
                key={game}>{gameList[game]}</button>);
        })
        return list;
    }
}


export default Game;