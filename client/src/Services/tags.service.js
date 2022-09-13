import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_URL}/api/tags`;

export const getTagsService = async () => {
    return await axios.get(apiUrl)
}

export const newTagService = async (data) => {
    return await axios.post(apiUrl, data, { withCredentials: true })
}

export const deleteTagsService = async (data) => {
    return await axios.put(apiUrl, data, { withCredentials: true })
}

export const getPostTagsService = async (id_post) => {
    return await axios.get(apiUrl + `/post/${id_post}`)
}

export const newPostTagService = async (id_post, data) => {
    return await axios.post(apiUrl + `/post/${id_post}`, data, { withCredentials: true })
}

