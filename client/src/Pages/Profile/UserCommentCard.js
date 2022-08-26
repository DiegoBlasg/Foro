import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { singlePostAdapter, tagsAdapter } from "../../Adapters/post.adapter"
import { getPostTagsService, getSinglePostService } from "../../Services/post.service"
import { elapsedTime } from "../../Utilities/format-elapsedTime.utility"

const UserCommentCard = ({ comment }) => {
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({})
    const [timeAgo, setTimeAgo] = useState("")

    const getPostTags = async () => {
        const res = await getPostTagsService(comment.id_post)
        setTags(tagsAdapter(res))
    }
    const getPost = async () => {
        const res = await getSinglePostService(comment.id_post)
        setPost(singlePostAdapter(res))
    }
    useEffect(() => {
        setTimeAgo(elapsedTime(comment.created_at))
        getPostTags()
        getPost()
    }, [])
    return (
        <div className='flex items-center justify-center my-5'>
            <Link to={`/post/${comment.id_post}`} className="rounded-md p-5 shadow-md w-full bg-zinc-100 dark:bg-zinc-800 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                <div className="flex items-center justify-between space-x-3">
                    <div className="flex">
                        <div className="h-8 w-8 rounded-full">
                            {
                                post.is_anonymous ?
                                    <div className="text-zinc-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </div>
                                    :
                                    <img src={post.user_image} alt="" className='rounded-full' />
                            }


                        </div>
                        <div className="mx-2">
                            <div className="text-md font-bold text-zinc-700 dark:text-zinc-300">{post.is_anonymous ? 'Anonymous' : post.user_name}</div>
                            <div className="text-xs font-bold text-zinc-500">{post._anonymous ? '' : post.email}</div>
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap">
                        {
                            tags.map((tag) => (
                                <div className={`rounded-2xl mb-2 mx-1 text-white px-3 py-1 text-xs font-semibold`} style={{ backgroundColor: tag.color }} key={tag.id_tag}>{tag.name}</div>
                            ))
                        }
                    </div>
                </div>

                <div className="mt-4 mx-4">
                    <div className="mb-3 text-lg font-bold text-center" style={{ wordWrap: "break-word" }}>{comment.title}</div>
                </div>
                <div className="bg-zinc-200 dark:bg-zinc-700 rounded mt-5 p-4">
                    <div className="mb-6">
                        <div className="mb-2 flex justify-between">
                            <div className="flex text-lg font-bold text-zinc-700 dark:text-zinc-300">
                                {
                                    comment.is_anonymous ?
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                            </svg>
                                            <h1 className="mx-2">Your comment</h1>
                                        </>
                                        :
                                        "Your comment"
                                }
                            </div>
                            <div className="flex items-center">
                                <div className="text-xs text-neutral-500">{timeAgo}</div>
                            </div>
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-zinc-400 px-4" style={{ wordWrap: "break-word" }}>{comment.content}</div>
                    </div>

                    <div>
                    </div>
                </div>

            </Link>
        </div>
    )
}
export default UserCommentCard