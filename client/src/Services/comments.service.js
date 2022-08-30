import axios from "axios";

const apiUrl = 'http://localhost:4000/comments';

export const getPostCommentsService = async (id_post) => {
    return await axios.get(apiUrl + `/post/${id_post}`)
}

export const newCommentService = async (id_post, data) => {
    return await axios.post(apiUrl + `/post/${id_post}`, data, { withCredentials: true })
}

export const getUserCommentsService = async (pag = 0) => {
    return await axios.get(apiUrl + `/user/${pag * 10}`, { withCredentials: true })
}

export const getNumberOfUserCommentsService = async () => {
    return await axios.get(apiUrl + `/number/user`, { withCredentials: true })
}


