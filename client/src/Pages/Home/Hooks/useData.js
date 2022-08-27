import { useEffect, useState } from "react"
import { numberOfPostsAdapter, postsAdapter } from "../../../Adapters/post.adapter"
import { getNumberOfPostsService, getNumberOfPostWithSearchService, getPostsService, getPostsWithSearchService } from "../../../Services/post.service"

const useData = () => {
    const [posts, setPosts] = useState([])
    const [numberOfPosts, setNumberOfPosts] = useState([])
    const [blocks, setBlocks] = useState(0)
    const [search, setSearch] = useState(null)

    const getPosts = async () => {
        const res = await getPostsService()
        setPosts(postsAdapter(res))
    }
    const getPostsWithSearch = async () => {
        const res = await getPostsWithSearchService(0, search)
        setPosts(postsAdapter(res))
        console.log(postsAdapter(res));
    }

    const getNumberOfPosts = async () => {
        const res = await getNumberOfPostsService()
        setNumberOfPosts(numberOfPostsAdapter(res))
    }

    const morePosts = async () => {
        if (search) {
            const res = await getPostsWithSearchService(blocks + 1, search)
            setBlocks(prev => prev + 1)
            setPosts(prev => [...prev, ...postsAdapter(res)])
            return
        }
        const res = await getPostsService(blocks + 1)
        setBlocks(prev => prev + 1)
        setPosts(prev => [...prev, ...postsAdapter(res)])
    }
    const setNumberOfPostsWithSearch = async () => {
        const res = await getNumberOfPostWithSearchService(search)
        setNumberOfPosts(numberOfPostsAdapter(res))
    }
    useEffect(() => {
        if (search) {
            setBlocks(0)
            getPostsWithSearch()
            setNumberOfPostsWithSearch()
        } else {
            setBlocks(0)
            getPosts()
            getNumberOfPosts()
        }
    }, [search])
    return { morePosts, posts, numberOfPosts, setSearch }
}
export default useData