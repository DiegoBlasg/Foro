export const elapsedTime = (creation_date) => {
    const now = new Date();
    const created_at = new Date(creation_date)

    const seconds = Math.floor(((now - created_at) / 1000))
    const minutes = Math.floor(((now - created_at) / 1000) / 60)
    const hours = Math.floor(((now - created_at) / 1000) / 3600)
    const days = Math.floor(((now - created_at) / 1000) / 86400)
    const weeks = Math.floor(((now - created_at) / 1000) / 604800)

    if (weeks > 0) {
        return (weeks + " weeks ago")
    } else if (days > 0) {
        return (days + " days ago")
    } else if (hours > 0) {
        return (hours + " hours ago")
    } else if (minutes > 0) {
        return (minutes + " minutes ago")
    } else if (seconds > 0) {
        return (seconds + " seconds ago")
    } else {
        return ("now")
    }
}