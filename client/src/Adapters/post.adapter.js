export const postsAdapter = (posts) => {
    const postsAdapted = posts.data.posts.map((post) => {
        return {
            id_post: post.id_post,
            title: post.title,
            description: post.description,
            is_anonymous: post.is_anonymous,
            created_at: post.created_at,
            email: post.email,
            user_image: post.user_image,
            user_name: post.user_name
        }
    })
    return postsAdapted
}

export const singlePostAdapter = (post) => {
    const postAdapted = {
        id_post: post.data.post.id_post,
        title: post.data.post.title,
        description: post.data.post.description,
        is_anonymous: post.data.post.is_anonymous,
        created_at: post.data.post.created_at,
        email: post.data.post.email,
        user_image: post.data.post.user_image,
        user_name: post.data.post.user_name
    }
    return postAdapted
}

export const tagsAdapter = (tags) => {
    const tagsAdapted = tags.data.tags.map((tag) => {
        return {
            id_tag: tag.id_tag,
            name: tag.name,
            color: tag.color
        }
    })
    return tagsAdapted
}

export const numberOfCommentsAdapter = (comment) => {
    return comment.data.numberOfComments
}

export const createdPostIdAdapter = (id_post) => {
    return id_post.data.insertId
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
            user_name: com.user_name
        }
    })
    return postsAdapted
}