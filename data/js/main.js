AddEvent("login", "click", (e) => {
    let data = {
        id : document.getElementById("id").value,
        pw : document.getElementById("pw").value
    }

    // 이곳에서 계정 검사 후 로비로 이동
    if(true){
        location.href = "/lobby/2048";
    } else{
        alert("로그인 정보가 일치하지 않습니다.");
    }
});

AddEvent("sign-up", "click", (e) => {
    e.target.classList.toggle("signing");
    e.target.blur();

    let name = document.getElementById("name");
    let pw2 = document.getElementById("pw2");
    let login = document.getElementById("login");
    let submit = document.getElementById("sign-up-submit");

    if(e.target.classList.contains("signing")){
        Show([name,pw2,submit])
        Hide([login])
        e.target.innerHTML = "돌아가기";
    }
    else{
        Hide([name,pw2,submit])
        Show([login])
        e.target.innerHTML = "회원가입";
    }
});

AddEvent("sign-up-submit", "click", (e) => {
    let name    = document.getElementById("name").value;
    let id      = document.getElementById("id").value;
    let pw1     = document.getElementById("pw").value;
    let pw2     = document.getElementById("pw2").value;

    if(name.length == 0 || id.length == 0 || pw1.length == 0 || pw2.length == 0){
        alert("입력하지 않은 정보가 있습니다.");
        return;
    }
    else if(pw1 != pw2){
        alert("비밀번호가 서로 일치하지 않습니다");
        return;
    }

    let data ={
        name : name,
        id : id,
        pw : pw1
    }

    // 여기서 회원가입 가능한지 체크하고 등록
    if(true){
        alert("등록되었습니다");
        document.getElementById("sign-up").click();
    }
    else{
        // 회원가입 실패시 실패 내용 출력
        // ex) 중복된 아이디
    }
})