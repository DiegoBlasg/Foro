import { useCallback, useEffect, useRef, useState } from "react"
import { numberOfUserPostsAdapter, postsAdapter } from "../../../Adapters/post.adapter"
import { numberOfUserCommentsAdapter, userCommentsAdapter } from "../../../Adapters/comments.adapter"
import { getNumberOfUserCommentsService, getUserCommentsService } from "../../../Services/comments.service"
import { getNumberOfUserPostsService, getUserPostsService } from "../../../Services/post.service"
import { getTagsService } from "../../../Services/tags.service"
import { tagsAdapter } from "../../../Adapters/tags.adapter"
import { getRepliesService } from "../../../Services/replies.service"
import { repliesAdapter } from "../../../Adapters/replies.adapter"

const useData = () => {
    const [tags, setTags] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [userComments, setUserComments] = useState([])
    const [replies, setReplies] = useState([])
    const [numberOfUserPosts, setNumberOfUserPosts] = useState(0)
    const [numberOfUserComments, setNumberOfUserComments] = useState(0)

    const [choice, setChoice] = useState("post")
    const [viewAnonymous, setViewAnonymous] = useState(false)

    const [postsBlocks, setPostsBlocks] = useState(0)
    const [commentsBlocks, setCommentsBlocks] = useState(0)
    const [repliesBlocks, setRepliesBlocks] = useState(0)

    const [postHasMore, setPostHasMore] = useState(false)
    const [commentHasMore, setCommentHasMore] = useState(false)
    const [replyHasMore, setReplyHasMore] = useState(false)
    const [loading, setLoading] = useState(false)

    const [search, setSearch] = useState(null)
    const [tagFilter, setTagFilter] = useState([])

    const observer = useRef()
    const lastPostRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && postHasMore) {
                moreUserPosts()
            }
        })
        if (node) observer.current.observe(node)
    }, [commentHasMore, loading])

    const lastCommentRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && commentHasMore) {
                moreUserComments()
            }
        })
        if (node) observer.current.observe(node)
    }, [commentHasMore, loading])

    const lastReplieRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && replyHasMore) {
                moreReplies()
            }
        })
        if (node) observer.current.observe(node)
    }, [replyHasMore, loading])

    const getReplies = async () => {
        const res = await getRepliesService(0, search, tagFilter)
        setReplyHasMore(repliesAdapter(res).length > 0)
        setReplies(repliesAdapter(res))
        setLoading(false)
    }

    const getUserPosts = async () => {
        const res = await getUserPostsService(0, search, tagFilter)
        setPostHasMore(postsAdapter(res).length > 0)
        setUserPosts(postsAdapter(res))
        setLoading(false)

    }
    const getUserComments = async () => {
        const res = await getUserCommentsService(0, search, tagFilter)
        setCommentHasMore(userCommentsAdapter(res).length > 0)
        setUserComments(userCommentsAdapter(res))
        setLoading(false)

    }
    const moreUserPosts = async () => {
        setLoading(true)
        const res = await getUserPostsService(postsBlocks + 1, search, tagFilter)
        setPostHasMore(postsAdapter(res).length > 0)
        setPostsBlocks(prev => prev + 1)
        setUserPosts([...userPosts, ...postsAdapter(res)])
        setLoading(false)
    }
    const moreReplies = async () => {
        setLoading(true)
        const res = await getRepliesService(repliesBlocks + 1, search, tagFilter)
        setReplyHasMore(repliesAdapter(res).length > 0)
        setRepliesBlocks(prev => prev + 1)
        setReplies([...replies, ...repliesAdapter(res)])
        setLoading(false)
    }
    const moreUserComments = async () => {
        setLoading(true)
        const res = await getUserCommentsService(commentsBlocks + 1, search, tagFilter)
        setCommentHasMore(userCommentsAdapter(res).length > 0)
        setCommentsBlocks(prev => prev + 1)
        setUserComments([...userComments, ...userCommentsAdapter(res)])
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

    const getTags = async () => {
        const res = await getTagsService()
        setTags(tagsAdapter(res))
    }
    useEffect(() => {
        setLoading(true)
        setPostsBlocks(0)
        setCommentsBlocks(0)
        setRepliesBlocks(0)
        getUserPosts()
        getUserComments()
        getReplies()
    }, [search, tagFilter])
    useEffect(() => {
        getNumberOfUserPosts()
        getNumberOfUserComments()
        getTags()
    }, [])
    return {
        userPosts, tags, search, tagFilter, loading, userComments, choice, viewAnonymous, postsBlocks, commentsBlocks, replies, numberOfUserPosts, numberOfUserComments,
        lastPostRef, setSearch, setTagFilter, lastCommentRef, lastReplieRef, setChoice, setViewAnonymous, moreUserPosts, moreUserComments
    }
}
export default useData