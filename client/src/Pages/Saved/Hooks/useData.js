import { useCallback, useEffect, useRef, useState } from "react"
import { postsAdapter } from "../../../Adapters/post.adapter"
import { getPostsService, getSavedPostService } from "../../../Services/post.service"

const useData = () => {

    const [posts, setPosts] = useState([])

    const [blocks, setBlocks] = useState(0)

    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)

    const observer = useRef()
    const lastElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                morePosts()
            }
        })
        if (node) observer.current.observe(node)
    }, [hasMore, loading])

    const getPosts = async () => {
        const res = await getSavedPostService(0)
        setPosts(postsAdapter(res))
        setHasMore(postsAdapter(res).length > 0)
        setLoading(false)
    }

    const morePosts = async () => {
        setLoading(true)
        const res = await getSavedPostService(blocks + 1)
        setBlocks(blocks + 1)
        setPosts([...posts, ...postsAdapter(res)])
        setHasMore(postsAdapter(res).length > 0)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        setBlocks(0)
        getPosts()
    }, [])

    return { lastElementRef, loading, posts }
}
export default useData