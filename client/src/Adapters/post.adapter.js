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
            user_name: post.user_name,
            number_of_comments: post.number_of_comments,
            tags: post.tags.map((tag) => {
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

export const singlePostAdapter = (post) => {
    const postAdapted = {
        id_post: post.data.post.id_post,
        title: post.data.post.title,
        description: post.data.post.description,
        is_anonymous: post.data.post.is_anonymous,
        created_at: post.data.post.created_at,
        email: post.data.post.email,
        user_image: post.data.post.user_image,
        user_name: post.data.post.user_name,
        tags: post.data.post.tags.map((tag) => {
            return {
                id_tag: tag.id_tag,
                name: tag.name,
                color: tag.color
            }
        })
    }
    return postAdapted
}

export const numberOfUserPostsAdapter = (posts) => {
    return posts.data.numberOfPosts
}
export const numberOfPostsAdapter = (posts) => {
    return posts.data.numberOfPosts
}

export const createdPostIdAdapter = (id_post) => {
    return id_post.data.insertId
}