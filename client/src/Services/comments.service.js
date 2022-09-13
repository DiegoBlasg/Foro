import axios from "axios";

const apiUrl = `${process.env.API_PATH || 'http://localhost:4000'}/comments`;

export const getPostCommentsService = async (id_post) => {
    return await axios.get(apiUrl + `/post/${id_post}`, { withCredentials: true })
}

export const getReplyCommentsService = async (id_comment) => {
    return await axios.get(apiUrl + `/parentcomment/${id_comment}`, { withCredentials: true })
}

export const updateCommentsService = async (id_comment, data) => {
    return await axios.put(apiUrl + `?id_comment=${id_comment}`, data, { withCredentials: true })
}
export const deleteCommentsService = async (id_comment) => {
    return await axios.delete(apiUrl + `?id_comment=${id_comment}`, { withCredentials: true })
}

export const newCommentService = async (id_post, data) => {
    return await axios.post(apiUrl + `/post/${id_post}`, data, { withCredentials: true })
}

export const getUserCommentsService = async (page, search, tags) => {
    let string = ""
    if (tags) {
        tags.map(id => {
            string = string + 'tag=' + id + '&'
        })
    }
    return await axios.get(apiUrl + `/user?page=${page ? (page + "&") : "0&"}${search ? ('search=' + search + "&") : ""}${string.substring(0, string.length - 1)}`, { withCredentials: true })
}

export const getNumberOfUserCommentsService = async () => {
    return await axios.get(apiUrl + `/number/user`, { withCredentials: true })
}


