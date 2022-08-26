import axios from "axios";

const apiUrl = 'http://localhost:4000/user';

export const getUserPostsService = async (pag = 0) => {
    return await axios.get(apiUrl + `/posts/${pag * 10}`, { withCredentials: true })
}
export const getUserCommentsService = async (pag = 0) => {
    return await axios.get(apiUrl + `/comments/${pag * 10}`, { withCredentials: true })
}
export const getNumberOfUserCommentsService = async () => {
    return await axios.get(apiUrl + `/number/comments`, { withCredentials: true })
}
export const getNumberOfUserPostsService = async () => {
    return await axios.get(apiUrl + `/number/posts`, { withCredentials: true })
}

