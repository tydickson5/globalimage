export async function getFuturePosts(userid, count, future){
    const url2='https://canvassed.net/globalimage_backend/Post/getAccountPost.php';
    var data = {
        "userid": userid,
        "counts": count,
        "future": future
    };
    var postrequestparams = {
        "method": "POST",
        "mode": "cors",
        "headers": {
        "Content-Type": "application/json; charset=utf-8",
        
        },
        "body": JSON.stringify(data)
    }
    let u = await fetch(url2, postrequestparams);
    return u.json();
}

export async function likePost(userid, postid){
    const url2='https://canvassed.net/globalimage_backend/Post/likePost.php';
    var data = {
        "userid": userid,
        "postid": postid,
        "app_key": import.meta.env.VITE_APP_API_CONFIRMATION_KEY,
        "public_key": sessionStorage.getItem('userpublickey'),
    };
    var postrequestparams = {
        "method": "POST",
        "mode": "cors",
        "headers": {
        "Content-Type": "application/json; charset=utf-8",
        
        },
        "body": JSON.stringify(data)
    }
    let u = await fetch(url2, postrequestparams);
    return u.json();
}