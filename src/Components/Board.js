import React from 'react';
import axios from 'axios';
import gameList from '../config';
import { CHANGE_ROUTER } from '../Actions/index'
import { connect } from 'react-redux';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            loading: true,
            posts: []
        }
        this.getPostList = this.getPostList.bind(this);
    }

    componentDidMount() {
        this.getPostList();
    }

    render() {
        return <>
            <ul id="taglist">{this.getTagList()}</ul>
            <div id="topnavigation">
                <button onClick={() => { console.log(this); changeRouter('board-write', this) }} id="write-post">글쓰기</button>
            </div>
            <ul id="list" className="board-list"> {this.state.posts} </ul>
            <input placeholder="검색" />
        </>
    }

    getTagList() {
        function Tag(props) {
            return <li onClick={props.onClick} className={props.className}>{props.html}</li>;
        }

        let tags = [];
        tags.push(<Tag onClick={clickTag} key='' className='board-tag selected' html='전체' />)
        Object.keys(gameList).forEach((e) => {
            tags.push(<Tag onClick={clickTag} key={e} className='board-tag' html={gameList[e]} />)
        })


        function clickTag() {
            tags.forEach(element => console.log(element));
            // GetList({tag : element.dataset.tag});
            // element.classList.add("selected");
        }

        return tags;
    }

    getPostList = async (filter) => {
        function Postli(props) {
            let data = props.data;
            return <li onClick={props.onClick} className='post' dataset-id={data.index}>
                <span className='tag'>{data.tagname}</span>
                <span className="title">{data.title}</span>
                <div className='date'>{data.date}</div>
            </li>
        };

        const ret = await axios.post("/board/get-post-list", filter);
        const info = ret.data;
        let datas = [];
        info.forEach(function (post) {
            datas.push(<Postli onClick={() => { changeRouter('board/view/?no=' + post.index, this) }} key={post.index} data={post} />);
        })

        this.setState(
            {
                loading: false,
                posts: datas
            });
    }

}

export class WritePost extends React.Component {
    state = {
        title: undefined,
        content: undefined
    }
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <select id='tag'>{this.getTags()}</select>
            <input onChange={this.keyHandler} id='title' placeholder='제목' />
            <input onChange={this.keyHandler} id='content' placeholder='내용' />
            <button onClick={this.posting} id='upload'>업로드</button>
        </div>
    }

    keyHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    getTags() {
        let tags = [];
        Object.keys(gameList).forEach((game) => {
            tags.push(<option key={game} value={game}>{gameList[game]}</option>)
        })
        return tags
    }

    posting = async () => {
        let data = {
            tag: 'tag.value',
            title: this.state.title,
            content: this.state.content,
            userid: 'testuser',
        };

        let ret = await axios.post('/board/write-post', data)

        if (ret.data == 1) {
            alert("작성되었습니다");
            changeRouter('board', this);
        }
    }
}

export class ViewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: undefined,
            content: undefined,
            index: undefined,
        }
        this.deletePost = this.deletePost.bind(this);
    }

    render() {
        return <div>
            <div id='title'>{this.state.title}</div>
            <div id='content'>{this.state.content}</div>
            <button onClick={this.deletePost} id='delete'>글 삭제</button>
        </div>
    }

    componentDidMount() {
        this.getPostData();
    }

    deletePost = async () => {
        if (window.confirm("삭제하시겠습니까?")) {
            let ret = await axios.post('/board/delete-post', { no: this.state.index });
            if (ret.data) {
                alert("삭제되었습니다");
                changeRouter('board', this);
            };
        }
    }

    getPostData = async () => {
        const ret = await axios.post("/board/get-post-data", 'GetParamsFromURL()');
        const info = ret.data;
        if (!info) {
            alert("존재하지 않거나 삭제된 게시물입니다");
            changeRouter('board', this);
            return;
        }

        this.setState(
            {
                title: info.title,
                content: info.content,
                index: info.index
            }
        );
    }
}

let changeRouter = (route, _this) => {
    _this.props.dispatch({ type: CHANGE_ROUTER, value: route })
};


Board = connect()(Board);
WritePost = connect()(WritePost);
ViewPost = connect()(ViewPost);

export default undefined;