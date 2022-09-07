import { useEffect, useState } from "react"
import { commentsAdapter } from "../../../Adapters/comments.adapter"
import { deleteCommentsService, getReplyCommentsService, newCommentService, updateCommentsService } from "../../../Services/comments.service"
import { elapsedTime } from "../../../Utilities/format-elapsedTime.utility"

const useCommentData = (comment, getPostComments) => {
    const [timeAgo, setTimeAgo] = useState("")
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const [replyComments, setReplyComments] = useState([])
    const [is_anonymous, setIs_anonymous] = useState(false)
    const [is_deleteModalOpen, setIs_DeleteComment] = useState(false)
    const [value, setValue] = useState("")

    const newComment = async () => {
        const commentData = {
            content: value,
            is_anonymous: is_anonymous,
            parent_comment_id: comment.id_comment
        }
        await newCommentService(comment.id_post, commentData)
        getReplyComments()
        setValue("")
    }

    const getReplyComments = async () => {
        const res = await getReplyCommentsService(comment.id_comment)
        setReplyComments(commentsAdapter(res));
    }

    const deleteComment = async () => {
        setIs_DeleteComment(false)
        await deleteCommentsService(comment.id_comment)
        getPostComments()
    }

    const updateComment = async () => {
        const data = {
            content: value,
            is_anonymous: is_anonymous
        }
        await updateCommentsService(comment.id_comment, data)
        getPostComments()
    }

    useEffect(() => {
        setTimeAgo(elapsedTime(comment.comment_created_at))
        getReplyComments()
    }, [])

    return {
        is_deleteModalOpen, timeAgo, reply, edit, value, is_anonymous, replyComments,
        setIs_DeleteComment, deleteComment, setReply, setEdit, setIs_anonymous, newComment, updateComment, setValue, getReplyComments
    }
}
export default useCommentData