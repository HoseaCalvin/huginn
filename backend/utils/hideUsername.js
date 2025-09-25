export function maskUsername(username) {
    if(!username) {
        return "";
    }

    if(username.length <= 2) {
        return "*".repeat(username.length);
    }

    return username[0] + "*".repeat(username.length - 1);
}