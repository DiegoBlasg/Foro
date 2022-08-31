export const numberOfUserCommentsAdapter = (comment) => {
    return comment.data.numberOfComments
}

export const numberOfCommentsAdapter = (comment) => {
    return comment.data.numberOfComments
}

export const commentsAdapter = (comments) => {
    const postsAdapted = comments.data.comments.map((com) => {
        return {
            content: com.content,
            created_at: com.created_at,
            email: com.email,
            id_comment: com.id_comment,
            id_post: com.id_post,
            is_anonymous: com.is_anonymous,
            user_image: com.user_image,
            user_name: com.user_name,
            is_owner: com.is_owner
        }
    })
    return postsAdapted
}

export const userCommentsAdapter = (comments) => {
    const postsAdapted = comments.data.comments.map((com) => {
        return {
            content: com.content,
            created_at: com.created_at,
            email: com.email,
            id_comment: com.id_comment,
            id_post: com.id_post,
            is_anonymous: com.is_anonymous,
            user_image: com.user_image,
            user_name: com.user_name,
            title: com.title,
            description: com.description,
            post_is_anonymous: com.post_is_anonymous,
            post_created_at: com.post_created_at,
            post_email: com.post_email,
            post_user_image: com.post_user_image,
            post_user_name: com.post_user_name,
            number_of_comments: com.number_of_comments,
            tags: com.tags.map((tag) => {
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