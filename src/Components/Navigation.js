import { useDispatch, useSelector } from 'react-redux';
import { ChangeRouter } from '../Actions/index';

function Navigation(){
    const dispatch = useDispatch();
    const currentRouter = useSelector(e => e.router);
    const Button = (props) => {
        const move = (e) => {
            const router = e.target.id;
            dispatch(ChangeRouter(router))
        }
        let className = 'navigation-btn';
        className += currentRouter === props.id ? ' selected' : '';
        return <li onClick={move} id={props.id} className={className}>{props.text}</li>
    }
    
    return <ul id='navigation'>
        <Button id='home' text='홈'/>
        <Button id='game' text='게임'/>
        <Button id='board' text='게시판'/>
        <Button id='ranking' text='랭킹'/>
        <Button id='myinfo' text='내 정보'/>
    </ul>
}

export default Navigation