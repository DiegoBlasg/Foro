import { useEffect, useState } from "react"
import { numberOfUserPostsAdapter, postsAdapter } from "../../../Adapters/post.adapter"
import { numberOfUserCommentsAdapter, userCommentsAdapter } from "../../../Adapters/comments.adapter"
import { getNumberOfUserCommentsService, getUserCommentsService } from "../../../Services/comments.service"
import { getNumberOfUserPostsService, getUserPostsService } from "../../../Services/post.service"

const useData = () => {
    const [posts, setPosts] = useState([])
    const [userCommentInfo, setUserCommentInfo] = useState([])
    const [choice, setChoice] = useState("")
    const [viewAnonymous, setViewAnonymous] = useState(false)
    const [postsBlocks, setPostsBlocks] = useState(0)
    const [commentsBlocks, setCommentsBlocks] = useState(0)

    const [numberOfUserPosts, setNumberOfUserPosts] = useState(0)
    const [numberOfUserComments, setNumberOfUserComments] = useState(0)

    const getUserPosts = async () => {
        const res = await getUserPostsService()
        setPosts(postsAdapter(res))

    }
    const getUserCommentsInfo = async () => {
        const res = await getUserCommentsService()
        setUserCommentInfo(userCommentsAdapter(res))

    }
    const morePosts = async () => {
        const res = await getUserPostsService(postsBlocks + 1)
        setPostsBlocks(prev => prev + 1)
        setPosts(prev => [...prev, ...postsAdapter(res)])
    }
    const moreComments = async () => {
        const res = await getUserCommentsService(commentsBlocks + 1)
        setCommentsBlocks(prev => prev + 1)
        setUserCommentInfo(prev => [...prev, ...userCommentsAdapter(res)])
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
        getUserCommentsInfo()
    }, [])
    return { posts, userCommentInfo, choice, setChoice, viewAnonymous, setViewAnonymous, postsBlocks, commentsBlocks, numberOfUserPosts, numberOfUserComments, morePosts, moreComments }
}
export default useData