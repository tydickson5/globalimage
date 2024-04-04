export async function checkLogin(email, password){
    const url2='https://canvassed.net/globalimage_backend/Signin/LoginCheck.php';
    var user = {
        "email": email,
        "password": password
    };
    var postrequestparams = {
        "method": "POST",
        "mode": "cors",
        "headers": {
        "Content-Type": "application/json; charset=utf-8",
        
        },
        "body": JSON.stringify(user)
    }
    let res = await fetch(url2, postrequestparams);
    //console.log(res);
    return res.json();
}

export async function getUser(id){
    const url2='https://canvassed.net/globalimage_backend/getUser.php';
    var user = {
        "id": id
    };
    var postrequestparams = {
        "method": "POST",
        "mode": "cors",
        "headers": {
        "Content-Type": "application/json; charset=utf-8",
        
        },
        "body": JSON.stringify(user)
    }
    let u = await fetch(url2, postrequestparams);
    //console.log(u);
    return u.json();
}

export async function sendSignupEmail(email){
    const url2='https://canvassed.net/globalimage_backend/Signin/signinEmailSend.php';
    var user = {
        "email": email
    };
    var postrequestparams = {
        "method": "POST",
        "mode": "cors",
        "headers": {
        "Content-Type": "application/json; charset=utf-8",
        
        },
        "body": JSON.stringify(user)
    };
    let u = await fetch(url2, postrequestparams);
    return u.json();
}

export async function signup(email, password, confirmPassword, username){
    const url2='https://canvassed.net/globalimage_backend/Signin/signup.php';
    var user = {
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
        "username": username
    };
    var postrequestparams = {
        "method": "POST",
        "mode": "cors",
        "headers": {
        "Content-Type": "application/json; charset=utf-8",
        
        },
        "body": JSON.stringify(user)
    };
    let u = await fetch(url2, postrequestparams);
    return u.json();
}