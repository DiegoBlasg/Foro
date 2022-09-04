import { useEffect, useState } from "react"
import { commentsAdapter } from "../../Adapters/comments.adapter"
import TextEditor from "../../Components/TextEditor/TextEditor"
import { deleteCommentsService, getReplyCommentsService, newCommentService, updateCommentsService } from "../../Services/comments.service"
import { elapsedTime } from "../../Utilities/format-elapsedTime.utility"
import './animation.css'


const Comment = ({ comment, getPostComments }) => {
    const [timeAgo, setTimeAgo] = useState("")
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const [replyComments, setReplyComments] = useState([])
    const [is_anonymous, setIs_anonymous] = useState(false)
    const [is_deleteModalOpen, setIs_DeleteComment] = useState(false)
    const [value, setValue] = useState("")

    useEffect(() => {
        setTimeAgo(elapsedTime(comment.comment_created_at))
        getReplyComments()
    }, [])
    const newComment = async () => {
        const commentData = {
            content: value,
            is_anonymous: is_anonymous,
            parent_comment_id: comment.id_comment
        }
        await newCommentService(comment.id_post, commentData)
        getReplyComments()
        setValue("")
    }
    const getReplyComments = async () => {
        const res = await getReplyCommentsService(comment.id_comment)
        setReplyComments(commentsAdapter(res));
    }
    const deleteComment = async () => {
        setIs_DeleteComment(false)
        await deleteCommentsService(comment.id_comment)
        getPostComments()
    }
    const updateComment = async () => {
        const data = {
            content: value,
            is_anonymous: is_anonymous
        }
        await updateCommentsService(comment.id_comment, data)
        getPostComments()

    }
    return (
        <div>
            {
                is_deleteModalOpen &&
                <div className="fixed w-full h-full z-50 top-0 left-0 deletemodal">
                    <div className='absolute w-full h-full flex flex-col justify-center items-center'>
                        <div className="rounded-md p-5 shadow-md bg-zinc-100 dark:bg-zinc-900 w-1/2">
                            <div className="flex justify-center flex-col mb-3">
                                <h1 className="text-white text-2xl font-semibold">Are you sure you want to delete this comment?</h1>
                                <h1 className="text-white text-sm mt-2">The message and all its replies will be deleted</h1>

                            </div>
                            <div className="flex justify-end space-x-4">
                                <div className="cursor-pointer bg-green-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-green-500" onClick={() => { setIs_DeleteComment(false) }} >Back</div>
                                <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={deleteComment} >Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="overflow-ellipsis overflow-hidden commentinit" id={"comment" + comment.id_comment}>
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
                    <div className="text-md text-zinc-800 sm:px-5 px-2 dark:text-zinc-300" style={{ wordWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                </div>
                <div className="flex items-center flex-wrap my-4 sm:px-5 px-2 cursor-pointer text-zinc-600 dark:text-zinc-500  dark:border-zinc-700 border-zinc-300 ">
                    <div className="flex items-center mr-2" onClick={() => { setReply(!reply); setEdit(false); setValue("") }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="-scale-x-100" viewBox="0 0 16 16">
                            <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                            <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z" />
                        </svg>
                        <h1 className="ml-2">Reply</h1>
                    </div>
                    {
                        comment.is_owner &&
                        <>
                            <div className="flex items-center mr-2" onClick={() => { setEdit(!edit); setValue(comment.content); setReply(false); setIs_anonymous(comment.is_anonymous) }}>

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                                <h1 className="ml-2">Edit</h1>
                            </div>
                            <div className="flex items-center" onClick={() => setIs_DeleteComment(true)}>

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

                                <TextEditor value={value} setValue={setValue} />
                                <div className="w-full flex justify-between">
                                    <div className={`${is_anonymous ? 'bg-red-600 text-zinc-300' : 'text-zinc-800 dark:text-zinc-300'} cursor-pointer rounded-full p-1`} onClick={() => setIs_anonymous(!is_anonymous)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </div>
                                    <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={() => { if (value != "") newComment(); setReply(false) }}>Post</div>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
            {
                edit &&
                <div className="rounded-md p-5 shadow-md w-full bg-zinc-200 dark:bg-zinc-700 my-3">
                    <div className="flex items-center justify-center">
                        <form className="flex flex-col bg-zinc-200 dark:bg-zinc-700 w-full md:w-10/12">

                            <TextEditor value={value} setValue={setValue} />
                            <div className="w-full flex justify-between">
                                <div className={`${is_anonymous ? 'bg-red-600 text-zinc-300' : 'text-zinc-800 dark:text-zinc-300'} cursor-pointer rounded-full p-1`} onClick={() => setIs_anonymous(!is_anonymous)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </div>
                                <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={() => { if (value != "") updateComment(); setEdit(false) }}>Update</div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {
                replyComments.map((com) => (
                    <div key={com.id_comment} className="pl-3 border-l-2 border-zinc-300 dark:border-zinc-700 ">
                        <Comment comment={com} getPostComments={getReplyComments} />
                    </div>
                ))
            }
        </div>
    )
}
export default Comment