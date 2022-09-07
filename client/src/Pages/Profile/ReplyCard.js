import PostCard from "../../Components/PostCard";
import UserCommentCard from "./UserCommentCard";

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


