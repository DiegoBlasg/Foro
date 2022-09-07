import { useCallback, useEffect, useRef, useState } from "react"
import { postsAdapter } from "../../../Adapters/post.adapter"
import { getUserPostsService } from "../../../Services/post.service"

const useProfilePostsData = (search, tagFilter) => {
    const [userPosts, setUserPosts] = useState([])

    const [postsBlocks, setPostsBlocks] = useState(0)

    const [postHasMore, setPostHasMore] = useState(false)
    const [postsLoading, setPostsLoading] = useState(false)

    const observer = useRef()
    const lastPostRef = useCallback(node => {
        if (postsLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && postHasMore) {
                moreUserPosts()
            }
        })
        if (node) observer.current.observe(node)
    }, [postHasMore, postsLoading])

    const getUserPosts = async () => {
        setPostsLoading(true)
        const res = await getUserPostsService(0, search, tagFilter)
        setPostHasMore(postsAdapter(res).length > 0)
        setUserPosts(postsAdapter(res))
        setPostsLoading(false)

    }
    const moreUserPosts = async () => {
        setPostsLoading(true)
        const res = await getUserPostsService(postsBlocks + 1, search, tagFilter)
        setPostHasMore(postsAdapter(res).length > 0)
        setPostsBlocks(prev => prev + 1)
        setUserPosts([...userPosts, ...postsAdapter(res)])
        setPostsLoading(false)
    }
    useEffect(() => {
        setPostsBlocks(0)
        getUserPosts()
    }, [search, tagFilter])

    return {
        userPosts, lastPostRef, postsLoading
    }
}
export default useProfilePostsData