export function maskUsername(username) {
    if(!username) {
        return "";
    }

    if(username.length <= 2) {
        return "*".repeat(username.length);
    }

    return username[0] + "*".repeat(username.length - 1);
}

export function exposeOrMaskUsername(username, currentUsername) {
    if(username !== currentUsername) {
        return username[0] + "*".repeat(username.length - 1);
    }

    return currentUsername;
}