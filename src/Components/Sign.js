class LoginButton extends React.Component {
    render(){
        return <img className='account-btn' src='/icon_user.png' />;
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLogin: true };
        this.changeType = this.changeType.bind(this);
    }

    changeType() {
        this.isLogin = !this.isLogin;
        this.setState({
            isLogin: !this.isLogin
        })
    }

    render() {
        return this.state.isLogin ?
            <Login changeType={this.changeType} /> :
            <SignUp changeType={this.changeType} />;
    }
}

class Login extends React.Component {
    constructor(props){
        super(props)
        this.loginCheck = this.loginCheck.bind(this);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    loginCheck(e){
        console.debug("Login check...", this.state);
        // 이곳에서 this.state 를 이용하여 계정 검사
        // this.state = {
        //     'id' : '',
        //     'pw' : '',
        // }
    }

    render() {
        return <div id='login-form' className='centered'>
            <input onChange={this.handleChange} name='id' placeholder='ID' />
            <input onChange={this.handleChange} name='pw' placeholder='PW' />
            <button onClick={this.loginCheck} id='login'>로그인</button>
            <button onClick={this.props.changeType} id='sign-up' >회원가입</button>
        </div>;
    }
}

class SignUp extends React.Component {

    constructor(props){
        super(props)
        this.registerNewAccount = this.registerNewAccount.bind(this);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    registerNewAccount = async (e) =>{
        console.debug("Login check...", this.state);

        // 회원가입 체크
        
        let data = {
            email   : this.state.email,
            id      : this.state.id,
            name    : this.state.name,
            pw1     : this.state.pw,
            pw2     : this.state.pw2
        }

        // if(Object.keys(this.state).length == 0 || )
        // let z = {};
        // console.log(this.state in '');
        // console.log(Object.values(this.state))
        // console.log(Object.values(this.state).map(x => {return x == '' ? false : true} ))
        // if(Object.values(this.state).length != 5 || )

        if (data.name.length == 0 || data.id.length == 0 || data.pw1.length == 0 || data.pw2.length == 0 || data.email.length == 0) {
            alert("입력하지 않은 정보가 있습니다.");
            return;
        }
        else if (data.pw1 != data.pw2) {
            alert("비밀번호가 서로 일치하지 않습니다");
            return;
        }
    

        let ret = await PostAsync('/account/register', data);
        console.log(ret);
        // let data = {
        //     name: name,
        //     id: id,
        //     pw: pw1
        // }
    
        // // 여기서 회원가입 가능한지 체크하고 등록
        // if (true) {
        //     alert("등록되었습니다");
        //     document.getElementById("sign-up").click();
        // }
        // else {
        //     // 회원가입 실패시 실패 내용 출력
        //     // ex) 중복된 아이디
        // }
    }


    render() {
        return <div id='login-form' className='centered'>
            <input onChange={this.handleChange} name='name' placeholder='이름' />
            <input onChange={this.handleChange} name='id' placeholder='ID' />
            <input onChange={this.handleChange} name='pw' placeholder='PW' />
            <input onChange={this.handleChange} name='pw2' placeholder='PW2' />
            <input onChange={this.handleChange} name='email' placeholder='E-mail' />
            <button onClick={this.registerNewAccount}>회원가입</button>
            <button onClick={this.props.changeType}>돌아가기</button>
        </div>;
    }
}