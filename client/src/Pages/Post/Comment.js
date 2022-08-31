import { useEffect, useState } from "react"
import { commentsAdapter } from "../../Adapters/comments.adapter"
import { getReplyCommentsService, newCommentService } from "../../Services/comments.service"
import LayoutDiv from "../../Styled-components/LayoutDiv"
import { elapsedTime } from "../../Utilities/format-elapsedTime.utility"


const Comment = ({ comment }) => {
    const [timeAgo, setTimeAgo] = useState("")
    const [reply, setReply] = useState(false)
    const [replyComments, setReplyComments] = useState([])
    const [is_anonymous, setIs_anonymous] = useState(false)
    const [commentIsYours, setCommentIsYours] = useState(comment.is_owner)

    useEffect(() => {
        setTimeAgo(elapsedTime(comment.created_at))
        getReplyComments()
    }, [])
    const newComment = async () => {
        const commentData = {
            content: document.getElementById("commentContent").value,
            is_anonymous: is_anonymous,
            parent_comment_id: comment.id_comment
        }
        await newCommentService(comment.id_post, commentData)
        getReplyComments()
        document.getElementById("commentContent").value = ""
    }
    const getReplyComments = async () => {
        const res = await getReplyCommentsService(comment.id_comment)
        setReplyComments(commentsAdapter(res));
    }
    return (
        <div>
            <div className="overflow-ellipsis overflow-hidden ">
                <div className="flex flex-wrap justify-between space-x-3 w-full mt-4">
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full dark:text-zinc-300">
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
                            <div className="text-lg font-bold text-zinc-700 dark:text-zinc-300">{comment.is_anonymous ? 'Anonymous' : comment.user_name}</div>
                            <div className="text-xs font-bold text-zinc-500">{comment.is_anonymous ? '' : comment.email}</div>
                        </div>
                    </div>

                    <div className="flex space-x-4 md:space-x-8">
                        <div className="flex items-center">
                            <div className="text-xs text-neutral-500">{timeAgo}</div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="text-md text-zinc-800 sm:px-5 px-2 dark:text-zinc-300" style={{ wordWrap: "break-word" }}>{comment.content}</div>
                </div>
                <div className="flex items-center flex-wrap my-4 sm:px-5 px-2 cursor-pointer text-zinc-600 dark:text-zinc-500  dark:border-zinc-700 border-zinc-300 " onClick={() => setReply(!reply)}>
                    <div className="flex items-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="-scale-x-100" viewBox="0 0 16 16">
                            <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                            <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z" />
                        </svg>
                        <h1 className="ml-2">Reply</h1>
                    </div>
                    {
                        commentIsYours &&
                        <>
                            <div className="flex items-center mr-2">

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                                <h1 className="ml-2">Edit</h1>
                            </div>
                            <div className="flex items-center">

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg>
                                <h1 className="ml-2">Delete</h1>

                            </div>
                        </>
                    }
                </div>



                {
                    reply &&
                    <div className="rounded-md p-5 shadow-md w-full bg-zinc-200 dark:bg-zinc-700 my-3">
                        <div className="flex items-center justify-center">
                            <form className="flex flex-col bg-zinc-200 dark:bg-zinc-700 w-full md:w-10/12">
                                <div className="flex flex-col items-center w-full">
                                    <div className="flex justify-between w-full dark:text-zinc-300">
                                        <h2 className="cursor-pointer px-4 pt-3 pb-2 text-center w-full bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-300">Write</h2>
                                        <h2 className="cursor-pointer px-4 pt-3 pb-2 text-center w-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300">Preview</h2>
                                    </div>
                                    <div className="flex justify-between cursor-pointer w-full sm:px-6 my-3 dark:text-zinc-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-justify" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-text-center" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-text-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-text-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-ol" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                                            <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-type-bold" viewBox="0 0 16 16">
                                            <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-type-italic" viewBox="0 0 16 16">
                                            <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-code-slash" viewBox="0 0 16 16">
                                            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-at" viewBox="0 0 16 16">
                                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full md:w-full my-2">
                                    <textarea
                                        className="rounded border border-zinc-400 dark:text-zinc-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-700 resize-y w-full h-32 py-2 px-3"
                                        name="body"
                                        placeholder='Add Your Comment...' required id="commentContent"></textarea>
                                </div>
                                <div className="w-full flex justify-between">
                                    <div className={`${is_anonymous ? 'bg-red-600 text-zinc-300' : 'text-zinc-800 dark:text-zinc-300'} cursor-pointer rounded-full p-1`} onClick={() => setIs_anonymous(!is_anonymous)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </div>
                                    <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={() => { if (document.getElementById("commentContent").value != "") newComment(); setReply(false) }}>Post</div>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
            {
                replyComments.map((com) => (
                    <div key={com.id_comment} className="pl-3 border-l-2 border-zinc-700 ">
                        <Comment comment={com} />
                    </div>
                ))
            }
        </div>
    )
}
export default Comment