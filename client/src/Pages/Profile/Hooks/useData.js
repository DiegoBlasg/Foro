import { useCallback, useEffect, useRef, useState } from "react"
import { numberOfUserPostsAdapter, postsAdapter } from "../../../Adapters/post.adapter"
import { numberOfUserCommentsAdapter, userCommentsAdapter } from "../../../Adapters/comments.adapter"
import { getNumberOfUserCommentsService, getUserCommentsService } from "../../../Services/comments.service"
import { getNumberOfUserPostsService, getUserPostsService } from "../../../Services/post.service"

const useData = () => {
    const [posts, setPosts] = useState([])
    const [userComments, setUserComments] = useState([])
    const [choice, setChoice] = useState("")
    const [viewAnonymous, setViewAnonymous] = useState(false)

    const [postsBlocks, setPostsBlocks] = useState(0)
    const [commentsBlocks, setCommentsBlocks] = useState(0)

    const [numberOfUserPosts, setNumberOfUserPosts] = useState(0)
    const [numberOfUserComments, setNumberOfUserComments] = useState(0)

    const [postHasMore, setPostHasMore] = useState(false)
    const [commentHasMore, setCommentHasMore] = useState(false)
    const [loading, setLoading] = useState(false)

    const observer = useRef()
    const lastPostRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && postHasMore) {
                morePosts()
            }
        })
        if (node) observer.current.observe(node)
    }, [commentHasMore, loading])

    const lastCommentRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && commentHasMore) {
                moreComments()
            }
        })
        if (node) observer.current.observe(node)
    }, [commentHasMore, loading])

    const getUserPosts = async () => {
        const res = await getUserPostsService()
        setPostHasMore(postsAdapter(res).length > 0)
        setPosts(postsAdapter(res))

    }
    const getUserComments = async () => {
        const res = await getUserCommentsService()
        setCommentHasMore(userCommentsAdapter(res).length > 0)
        setUserComments(userCommentsAdapter(res))

    }
    const morePosts = async () => {
        setLoading(true)
        const res = await getUserPostsService(postsBlocks + 1)
        setPostHasMore(postsAdapter(res).length > 0)
        setPostsBlocks(prev => prev + 1)
        setPosts(prev => [...prev, ...postsAdapter(res)])
        setLoading(false)
    }
    const moreComments = async () => {
        setLoading(true)
        const res = await getUserCommentsService(commentsBlocks + 1)
        setCommentHasMore(userCommentsAdapter(res).length > 0)
        setCommentsBlocks(prev => prev + 1)
        setUserComments(prev => [...prev, ...userCommentsAdapter(res)])
        setLoading(false)
    }
    const getNumberOfUserPosts = async () => {
        const res = await getNumberOfUserPostsService()
        setNumberOfUserPosts(numberOfUserPostsAdapter(res))

    }
    const getNumberOfUserComments = async () => {
        const res = await getNumberOfUserCommentsService()
        setNumberOfUserComments(numberOfUserCommentsAdapter(res))

    }
    useEffect(() => {
        getNumberOfUserPosts()
        getNumberOfUserComments()
        getUserPosts()
        getUserComments()
    }, [])
    return {
        posts, loading, userComments, choice, viewAnonymous, postsBlocks, commentsBlocks, numberOfUserPosts, numberOfUserComments,
        lastPostRef, lastCommentRef, setChoice, setViewAnonymous, morePosts, moreComments
    }
}
export default useData