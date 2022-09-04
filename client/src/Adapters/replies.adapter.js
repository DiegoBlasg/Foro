export const repliesAdapter = (replies) => {
    const postsAdapted = replies.data.replies.map((reply) => {
        return {
            id_comment: reply.id_comment,
            content: reply.content,
            comment_created_at: reply.comment_created_at,
            comment_is_anonymous: reply.comment_is_anonymous,
            email: reply.email,
            user_name: reply.user_name,
            user_image: reply.user_image,
            id_post: reply.id_post,
            title: reply.title,
            description: reply.description,
            post_is_anonymous: reply.post_is_anonymous,
            post_created_at: reply.post_created_at,
            number_of_comments: reply.number_of_comments,
            is_read: reply.is_read,
            id_reply: reply.id_reply,
            id_comment_reply: reply.id_comment_reply,
            tags: reply.tags.map((tag) => {
                return {
                    id_tag: tag.id_tag,
                    name: tag.name,
                    color: tag.color
                }
            })
        }
    })
    return postsAdapted
}