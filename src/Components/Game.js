import { ChangeRouter } from '../Actions';
import gameList from '../config';
import { useDispatch } from 'react-redux';

function Game(props) {
    const dispatch = useDispatch();

    const loadGameList = () => {
        let list = [];
        const onClick = (game) => {
            console.log(game);
            dispatch(ChangeRouter('/game/' + game));
        }

        Object.keys(gameList).forEach((game) => {
            list.push(<button className='game-button' onClick={() => onClick(game)} key={game}>{gameList[game]}</button>);
        })
        return list;
    }

    return <div>{loadGameList()}</div>
}


export default Game;