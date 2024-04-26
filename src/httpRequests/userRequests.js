export async function updatePassword(id, newPassword){
    const url2='https://canvassed.net/globalimage_backend/User/updatePassword.php';
    var user = {
        "id": id,
        "newPassword": newPassword,
        "app_key": import.meta.env.VITE_APP_API_CONFIRMATION_KEY,
        "public_key": sessionStorage.getItem('userpublickey'),
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
    return u.json();
}

export async function updateInstagram(id, newPassword){
    const url2='https://canvassed.net/globalimage_backend/User/updateInstagram.php';
    var user = {
        "id": id,
        "newPassword": newPassword,
        "app_key": import.meta.env.VITE_APP_API_CONFIRMATION_KEY,
        "public_key": sessionStorage.getItem('userpublickey'),
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
    return u.json();
}

export async function updateTiktok(id, newPassword){
    const url2='https://canvassed.net/globalimage_backend/User/updateTiktok.php';
    var user = {
        "id": id,
        "newPassword": newPassword,
        "app_key": import.meta.env.VITE_APP_API_CONFIRMATION_KEY,
        "public_key": sessionStorage.getItem('userpublickey'),
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
    return u.json();
}

export async function deleteAccount(id){
    const url2='https://canvassed.net/globalimage_backend/User/deleteAccount.php';
    var user = {
        "id": id,
        "app_key": import.meta.env.VITE_APP_API_CONFIRMATION_KEY,
        "public_key": sessionStorage.getItem('userpublickey'),
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
    return u.json();
}

export async function getTime(userid){
    const url2='https://canvassed.net/timerSet.php';
    var user = {
        "userid": userid,

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
    let ur = await u.json();
    return ur;
}