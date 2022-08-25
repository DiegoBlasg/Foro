import axios from "axios";

const apiUrl = 'http://localhost:4000/user';

export const getUserPostsService = async () => {
    return await axios.get(apiUrl + `/posts`, { withCredentials: true })
}
export const getUserCommentsService = async () => {
    return await axios.get(apiUrl + `/comments`, { withCredentials: true })
}
