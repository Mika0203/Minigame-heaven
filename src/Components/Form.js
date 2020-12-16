import { useEffect } from 'react';
import MyInfo from './Information';
import Home from './Home';
import Ranking from './Ranking';
import Game from './Game';
import { Board, WritePost, ViewPost } from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeRouter } from '../Actions/index';

function Form(props) {
    const dispatch = useDispatch();
    const profile = useSelector((store) => store.router);
    console.log(profile)
    useEffect(() => {
        window.addEventListener('popstate', (e) => {
            const router = e.path[0].location.pathname.split('/')[1]
            dispatch(ChangeRouter(router))
        })
    })

    const getFormRender = () => {
        switch (profile) {
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
            default :
        }
    }

    return <div id='form'>
        {getFormRender()}
    </div>
}


export default Form