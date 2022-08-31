import { useCallback, useEffect, useRef, useState } from "react"
import { postsAdapter } from "../../../Adapters/post.adapter"
import { tagsAdapter } from "../../../Adapters/tags.adapter"
import { getPostsService } from "../../../Services/post.service"
import { getTagsService } from "../../../Services/tags.service"

const useData = () => {

    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])

    const [blocks, setBlocks] = useState(0)
    const [search, setSearch] = useState(null)
    const [tagFilter, setTagFilter] = useState([])

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
        const res = await getPostsService(0, search, tagFilter)
        setPosts(postsAdapter(res))
        setHasMore(postsAdapter(res).length > 0)
        setLoading(false)
    }

    const getTags = async () => {
        const res = await getTagsService()
        setTags(tagsAdapter(res))
    }

    const morePosts = async () => {
        setLoading(true)
        const res = await getPostsService(blocks + 1, search, tagFilter)
        setBlocks(blocks + 1)
        setPosts([...posts, ...postsAdapter(res)])
        setHasMore(postsAdapter(res).length > 0)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        setBlocks(0)
        setPosts([])
        getPosts()
    }, [search, tagFilter])

    useEffect(() => {
        getTags()
    }, [])
    return { setSearch, setTagFilter, lastElementRef, tagFilter, loading, posts, tags }
}
export default useData