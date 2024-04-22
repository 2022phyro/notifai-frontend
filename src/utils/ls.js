export function lset (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function lget (key) {
    return JSON.parse(localStorage.getItem(key))
}
export function ldel (key) {
    localStorage.removeItem(key)
}