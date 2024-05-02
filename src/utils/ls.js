export function lset (key, value) {
    try {
            localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
        console.error(err)
    }
}
export function lget (key) {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch {
        return null
    }
}
export function ldel (key) {
    localStorage.removeItem(key)
}

export function lLogout () {
    localStorage.removeItem('currApp')
    localStorage.removeItem('access')
    localStorage.removeItem('expiry')
    localStorage.removeItem('refresh')
}