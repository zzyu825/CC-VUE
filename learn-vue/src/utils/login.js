function isLogin() {
    return document.cookie.includes('login=true')
}

function login() {
    const date = new Date();
    const day = 30;
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = `login=true;expires=${date.toUTCString()}`;
}

function cancelLogin() {
    const date = new Date();
    date.setTime(date.getTime() - 100000000);
    document.cookie = `login=true;expires=${date.toUTCString()}`;
}

export default {
    isLogin,
    login,
    cancelLogin
}