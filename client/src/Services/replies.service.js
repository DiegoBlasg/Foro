import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_URL || ''}/api/replies`;

export const getRepliesService = async (page, search, tags) => {
    let string = ""
    if (tags) {
        tags.map(id => {
            string = string + 'tag=' + id + '&'
        })
    }
    return await axios.get(apiUrl + `?page=${page ? (page + "&") : "0&"}${search ? ('search=' + search + "&") : ""}${string.substring(0, string.length - 1)}`, { withCredentials: true })
}

export const updateReplyService = async (id_reply) => {
    await axios.put(apiUrl + `/${id_reply}`, { withCredentials: true })
}

