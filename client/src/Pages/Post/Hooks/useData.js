import { useEffect, useState } from "react"
import { singlePostAdapter } from "../../../Adapters/post.adapter"
import { commentsAdapter } from "../../../Adapters/comments.adapter"
import { getPostCommentsService, newCommentService } from "../../../Services/comments.service"
import { deletePostService, getSinglePostService } from "../../../Services/post.service"
import { elapsedTime } from "../../../Utilities/format-elapsedTime.utility"
import { useNavigate } from "react-router-dom"

const useData = (postId) => {
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const [is_anonymous, setIs_anonymous] = useState(false)
    const [timeAgo, setTimeAgo] = useState("")
    const [is_deleteModalOpen, setis_deleteModalOpen] = useState(false)

    const navigate = useNavigate();

    const newComment = async () => {
        const commentData = {
            content: document.getElementById("commentContent").value,
            is_anonymous: is_anonymous,
            parent_comment_id: null
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

    const deletePost = async () => {
        deletePostService(postId)
        setis_deleteModalOpen(false)
        navigate("/");
    }

    useEffect(() => {
        if (post) setTimeAgo(elapsedTime(post.created_at))
    }, [post])

    useEffect(() => {
        getPostComments()
        getPostInfo()
    }, [])
    return {
        newComment, getPostComments, setis_deleteModalOpen, deletePost, setIs_anonymous, setis_deleteModalOpen, deletePost, setIs_anonymous,
        comments, post, is_anonymous, timeAgo, is_deleteModalOpen
    }
}
export default useData