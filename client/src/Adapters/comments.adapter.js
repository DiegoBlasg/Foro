export const userCommentsAdapter = (comments) => {
    const postsAdapted = comments.data.comments.map((com) => {
        return {
            id_comment: com.id_comment,
            content: com.content,
            comment_created_at: com.comment_created_at,
            comment_is_anonymous: com.comment_is_anonymous,
            id_post: com.id_post,
            title: com.title,
            description: com.description,
            post_is_anonymous: com.post_is_anonymous,
            post_created_at: com.post_created_at,
            email: com.email,
            user_name: com.user_name,
            user_image: com.user_image
        }
    })
    return postsAdapted
}