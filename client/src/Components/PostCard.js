import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { elapsedTime } from "../Utilities/format-elapsedTime.utility"
import { updateReplyService } from '../Services/replies.service';

const PostCard = ({ post }) => {
    const [timeAgo, setTimeAgo] = useState("")

    const updateReplyIs_read = async () => {
        await updateReplyService(post.id_reply)
    }

    useEffect(() => {
        setTimeAgo(elapsedTime(post.post_created_at))
    }, [])

    return (
        <div className='flex items-center justify-center mt-5'>
            <Link to={`/post/${post.id_post}`} className={`rounded-md p-5 shadow-md w-full bg-zinc-100 dark:bg-zinc-800 cursor-pointer ${post.is_read == false && "border-4 border-red-400 dark:border-red-900"}`} onClick={() => { window.scrollTo(0, 0); if (post.is_read == false) updateReplyIs_read() }}>
                <div className="flex flex-wrap flex-col  sm:flex-row items-center justify-between space-y-4 w-full sm:space-y-0 border-b dark:border-zinc-800 pb-3">
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full dark:text-zinc-300">
                            {
                                post.post_is_anonymous ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                    :
                                    <img src={post.user_image} alt="" className='rounded-full' />
                            }


                        </div>
                        <div>
                            <div className="text-lg font-bold text-zinc-700 dark:text-zinc-300">{post.post_is_anonymous ? 'Anonymous' : post.user_name}</div>
                            <div className="text-xs font-bold text-zinc-500">{post.post_is_anonymous ? '' : post.email}</div>
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap">
                        {
                            post.tags.map((tag) => (
                                <div className={`rounded-2xl mb-2 mx-1 text-zinc-100 px-3 py-1 text-xs font-semibold`} style={{ backgroundColor: tag.color }} key={tag.id_tag}>{tag.name}</div>
                            ))
                        }
                    </div>
                </div>

                <div className="mb-4 pl-3">
                    <div className="text-2xl font-bold text-center sm:text-left dark:text-zinc-100" style={{ wordWrap: "break-word" }}>{post.title}</div>
                </div>
                <div>
                    <div className="flex items-center justify-between text-zinc-500">
                        <div className="flex space-x-4 md:space-x-8">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                <span>{post.number_of_comments}</span>
                            </div>
                        </div>
                        <div className="flex space-x-4 md:space-x-8">
                            <div className="flex items-center">
                                <div className="text-xs text-zinc-500">{timeAgo}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )

}
export default PostCard