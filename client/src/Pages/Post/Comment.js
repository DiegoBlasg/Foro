import { useEffect, useState } from "react"
import { elapsedTime } from "../../Utilities/format-elapsedTime.utility"


const Comment = ({ comment }) => {
    const [timeAgo, setTimeAgo] = useState("")

    useEffect(() => {
        setTimeAgo(elapsedTime(comment.created_at))
    }, [])

    return (
        <div>
            <div className="flex justify-between space-x-3 w-full">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full">
                        {
                            comment.is_anonymous ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                </svg>
                                :
                                <img src={comment.user_image} alt="image" className='rounded-full' />
                        }
                    </div>
                    <div>
                        <div className="text-lg font-bold text-zinc-700">{comment.is_anonymous ? 'Anonymous' : comment.user_name}</div>
                        <div className="text-xs font-bold text-zinc-500">{comment.is_anonymous ? '' : comment.email}</div>
                    </div>
                </div>

                <div className="flex space-x-4 md:space-x-8">
                    <div className="flex items-center">
                        <div className="text-xs text-neutral-500">{timeAgo}</div>
                    </div>
                </div>
            </div>
            <div className="mt-4 mb-6 border-b-2 border-zinc-300 py-3 pb-8">
                <div className="text-md text-zinc-800 sm:px-5 px-2" style={{ wordWrap: "break-word" }}>{comment.content}</div>
            </div>
        </div>
    )
}
export default Comment