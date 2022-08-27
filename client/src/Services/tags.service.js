import axios from "axios";

const apiUrl = 'http://localhost:4000/tags';

export const getTagsService = async () => {
    return await axios.get(apiUrl)
}

export const getPostTagsService = async (id_post) => {
    return await axios.get(apiUrl + `/post/${id_post}`)
}

export const newPostTagService = async (id_post, data) => {
    return await axios.post(apiUrl + `/post/${id_post}`, data, { withCredentials: true })
}

