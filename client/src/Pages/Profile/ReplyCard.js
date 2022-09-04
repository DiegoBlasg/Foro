import axios from "axios"
import { useEffect, useState } from "react"
import PostCard from "../../Components/PostCard";
import UserCommentCard from "./UserCommentCard";
import { Link } from "react-router-dom"

const ReplyCard = ({ reply }) => {
    if (reply.id_comment) {
        return (
            <UserCommentCard commentInfo={reply} />
        )
    } else {
        return (
            <PostCard post={reply} />
        )
    }
}
export default ReplyCard


