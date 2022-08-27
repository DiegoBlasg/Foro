import { useEffect, useState } from "react"
import { singlePostAdapter } from "../../../Adapters/post.adapter"
import { commentsAdapter } from "../../../Adapters/comments.adapter"
import { getPostCommentsService, newCommentService } from "../../../Services/comments.service"
import { getSinglePostService } from "../../../Services/post.service"
import { elapsedTime } from "../../../Utilities/format-elapsedTime.utility"

const useData = (postId) => {
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const [is_anonymous, setIs_anonymous] = useState(false)
    const [timeAgo, setTimeAgo] = useState("")

    const newComment = async () => {
        const commentData = {
            content: document.getElementById("commentContent").value,
            is_anonymous: is_anonymous
        }
        await newCommentService(postId, commentData)
        getPostComments()
        document.getElementById("commentContent").value = ""
    }

    const getPostInfo = async () => {
        const res = await getSinglePostService(postId)
        setPost(singlePostAdapter(res))
    }

    const getPostComments = async () => {
        const res = await getPostCommentsService(postId)
        setComments(commentsAdapter(res))
    }

    useEffect(() => {
        if (post) setTimeAgo(elapsedTime(post.created_at))
    }, [post])

    useEffect(() => {
        getPostComments()
        getPostInfo()
    }, [])
    return { newComment, comments, post, is_anonymous, timeAgo, setIs_anonymous }
}
export default useData