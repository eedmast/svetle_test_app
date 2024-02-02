export function generateToken() {
    let token = '';
    for(let i = 0; i < 128; i++) {
        let charCode = Math.floor(Math.random() * 26 + 97);
        let char = String.fromCharCode(charCode);
        token = `${token}${Math.random() > 0.5 ? char : char.toUpperCase()}`;
    }
    return token;
}

export function formatCurrentTime() {
    const options = {
        day: 'numeric', month: '2-digit', year: 'numeric'
    }

    let currentTime = new Date();
    const formattedTime = currentTime.toLocaleString("ru", options);
    return formattedTime;
}