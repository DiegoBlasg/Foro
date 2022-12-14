import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_URL || ''}/api/posts`;

export const newPostService = async (data) => {
    return await axios.post(apiUrl, data, { withCredentials: true })
}

export const getPostsService = async (page, search, tags) => {
    let string = ""
    if (tags) {
        tags.map(id => {
            string = string + 'tag=' + id + '&'
        })
    }
    return await axios.get(apiUrl + `?page=${page ? (page + "&") : "0&"}${search ? ('search=' + search + "&") : ""}${string.substring(0, string.length - 1)}`)
}

export const getSinglePostService = async (id_post) => {
    return await axios.get(apiUrl + `/single/${id_post}`, { withCredentials: true })
}

export const getUserPostsService = async (page, search, tags) => {
    let string = ""
    if (tags) {
        tags.map(id => {
            string = string + 'tag=' + id + '&'
        })
    }
    return await axios.get(apiUrl + `/user?page=${page ? (page + "&") : "0&"}${search ? ('search=' + search + "&") : ""}${string.substring(0, string.length - 1)}`, { withCredentials: true })
}

export const getNumberOfUserPostsService = async () => {
    return await axios.get(apiUrl + `/number/user`, { withCredentials: true })
}

export const deletePostService = async (id_post) => {
    return await axios.delete(apiUrl + `/single/${id_post}`, { withCredentials: true })
}

export const updatePostService = async (id_post, data) => {
    return await axios.put(apiUrl + `/single/${id_post}`, data, { withCredentials: true })
}

export const savePostService = async (id_post) => {
    return await axios.post(apiUrl + `/save/${id_post}`, {}, { withCredentials: true })
}

export const unsavePostService = async (id_post) => {
    return await axios.delete(apiUrl + `/unsave/${id_post}`, { withCredentials: true })
}

export const getSavedPostService = async (page) => {
    return await axios.get(apiUrl + `/saved?page=${page}`, { withCredentials: true })
}

