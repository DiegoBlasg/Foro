import axios from "axios";

const apiUrl = 'http://localhost:4000/posts';

export const newPostService = async (data) => {
    return await axios.post(apiUrl, data, { withCredentials: true })
}

export const getPostsService = async (pag = 0) => {
    return await axios.get(apiUrl + `/all/${pag * 10}`)
}

export const getPostsWithSearchService = async (pag = 0, search) => {
    return await axios.get(apiUrl + `/${pag * 10}/search/${search}`)
}

export const getNumberOfPostWithSearchService = async (search) => {
    return await axios.get(apiUrl + `/search/${search}/number`)
}

export const getSinglePostService = async (id_post) => {
    return await axios.get(apiUrl + `/single/${id_post}`)
}

export const getNumberOfPostsService = async () => {
    return await axios.get(apiUrl + `/number`)
}

export const getUserPostsService = async (pag = 0) => {
    return await axios.get(apiUrl + `/user/${pag * 10}`, { withCredentials: true })
}

export const getNumberOfUserPostsService = async () => {
    return await axios.get(apiUrl + `/number/user`, { withCredentials: true })
}

