import axios from "axios";

const apiUrl = 'http://localhost:4000/post';

export const getPostsService = async () => {
    return await axios.get(apiUrl)
}

export const getSinglePostService = async (id_post) => {
    return await axios.get(apiUrl + `/${id_post}`)
}

export const getTagsService = async () => {
    return await axios.get(apiUrl + '/tags/all')
}

export const getPostTagsService = async (id_post) => {
    return await axios.get(apiUrl + `/${id_post}/tags`)
}

export const getNumberOfCommentsService = async (id_post) => {
    return await axios.get(apiUrl + `/${id_post}/comments/number`)
}

export const getPostCommentsService = async (id_post) => {
    return await axios.get(apiUrl + `/${id_post}/comments`)
}

export const newCommentService = async (id_post, data) => {
    return await axios.post(apiUrl + `/${id_post}/comments`, data, { withCredentials: true })
}

export const newPostService = async (data) => {
    return await axios.post(apiUrl, data, { withCredentials: true })
}

export const newTagService = async (id_post, data) => {
    return await axios.post(apiUrl + `/${id_post}/tags`, data, { withCredentials: true })
}

