import { Link, useParams } from "react-router-dom"
import Comment from "./Comment"
import GlobalDiv from "../../Styled-components/GlobalDiv"
import LayoutDiv from "../../Styled-components/LayoutDiv"
import usePostData from "./Hooks/usePostData"
import TextEditor from "../../Components/TextEditor/TextEditor"

const Post = ({ user }) => {
    const postId = useParams().id_post
    const { newPostComment, getPostComments, setIs_anonymous, setis_deleteModalOpen, deletePost,
        comments, post, is_anonymous, timeAgo, is_deleteModalOpen, value, setValue, savePost, unsavePost } = usePostData(postId)
    return (
        <GlobalDiv>
            {
                is_deleteModalOpen &&
                <div className="fixed w-full h-full z-50 top-0 left-0 deletemodal">
                    <div className='absolute w-full h-full flex flex-col justify-center items-center'>
                        <div className="rounded-md p-5 shadow-md bg-zinc-100 dark:bg-zinc-900 w-1/2">
                            <div className="flex justify-center flex-col mb-3">
                                <h1 className="dark:text-white text-zinc-800 text-2xl font-semibold">Are you sure you want to delete this post?</h1>
                                <h1 className="dark:text-white text-zinc-800 text-sm mt-2">The post will be deleted forever</h1>

                            </div>
                            <div className="flex justify-end space-x-4">
                                <div className="cursor-pointer bg-green-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-green-500" onClick={() => { setis_deleteModalOpen(false) }} >Back</div>
                                <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={deletePost} >Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <LayoutDiv>
                <div className="rounded-md p-5 shadow-md w-full bg-zinc-100 dark:bg-zinc-800">
                    <div className="flex flex-wrap flex-col items-start space-y-4 w-full pb-3 border-b dark:border-zinc-700">
                        <div className="flex justify-between space-x-3 w-full">
                            <div className="flex space-x-2 items-center">
                                <div className="h-8 w-8 rounded-full dark:text-zinc-300">
                                    {
                                        post.is_anonymous ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                            </svg>
                                            :
                                            <img src={post.user_image} alt="" className='rounded-full' />
                                    }


                                </div>
                                <div>
                                    <div className="text-lg font-bold text-zinc-700 dark:text-zinc-300">{post.is_anonymous ? 'Anonymous' : post.user_name}</div>
                                    <div className="text-xs font-bold text-zinc-500">{post.is_anonymous ? '' : post.email}</div>
                                </div>
                            </div>
                            <div className="flex space-x-4 md:space-x-8">
                                <div className="flex items-center">
                                    <div className="text-xs text-zinc-500">{timeAgo}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap">
                            {
                                post.tags &&
                                post.tags.map((tag) => (
                                    <div className={`rounded-2xl mb-2 mx-1 text-white px-3 py-1 text-xs font-semibold`} style={{ backgroundColor: tag.color }} key={tag.id_tag}>{tag.name}</div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="mt-4 mb-6 border-b dark:border-zinc-700 py-3">
                        <div className="mb-3 text-3xl font-bold text-center pb-6 border-b dark:border-zinc-700 dark:text-zinc-100" style={{ wordWrap: "break-word" }}>{post.title}</div>
                        <div className="text-md text-zinc-600 dark:text-zinc-400 px-2" style={{ wordWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: post.description }}></div>
                    </div>
                    <div className="flex space-x-4 text-zinc-500">
                        {
                            user &&
                            (post.is_saved ?
                                <div className="flex items-center cursor-pointer" onClick={unsavePost}>
                                    <svg width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                                    </svg>
                                    <h1 className="ml-2">Unsave</h1>
                                </div>
                                :
                                <div className="flex items-center cursor-pointer" onClick={savePost}>
                                    <svg width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                    </svg>
                                    <h1 className="ml-2">Save</h1>
                                </div>)
                        }
                        {
                            post.is_owner &&
                            <>
                                <Link to={`/updatepost/${post.id_post}`} className="flex items-center mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                    <h1 className="ml-2">Edit</h1>
                                </Link>

                                <div className="flex items-center cursor-pointer" onClick={() => setis_deleteModalOpen(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                    <h1 className="ml-2">Delete</h1>
                                </div>
                            </>
                        }

                    </div>

                </div>
            </LayoutDiv>

            <LayoutDiv>
                <div className="rounded-md p-5 shadow-md w-full bg-zinc-100 dark:bg-zinc-800 mt-3">
                    <div className="mb-6 pb-6 border-b dark:border-zinc-700 dark:text-zinc-100 text-xl font-bold text-zinc-900 px-2">Comments</div>
                    {
                        comments.map((com) => (
                            <Comment key={com.id_comment} comment={com} getPostComments={getPostComments} />
                        ))
                    }
                </div>
            </LayoutDiv>

            <LayoutDiv>
                <div className="rounded-md p-5 shadow-md  w-full bg-zinc-100 dark:bg-zinc-800 my-3">
                    <div className="mb-6 pb-6 border-b dark:border-zinc-700">
                        <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100 px-2">Your Answer</div>
                    </div>
                    {
                        user ?

                            <div className="flex items-center justify-center">
                                <form className="flex flex-col bg-zinc-100 dark:bg-zinc-800 w-full md:w-10/12">
                                    <div className="flex flex-col items-center w-full">
                                        <TextEditor value={value} setValue={setValue} />
                                    </div>
                                    <div className="w-full flex justify-between">
                                        <div className={`${is_anonymous ? 'bg-red-600 text-zinc-300' : 'text-zinc-800 dark:text-zinc-300'} cursor-pointer rounded-full p-1`} onClick={() => setIs_anonymous(!is_anonymous)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                            </svg>
                                        </div>

                                        <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={() => { if (value != "") newPostComment() }} >Post</div>
                                    </div>
                                </form>
                            </div>
                            :
                            <div className="flex flex-col my-3 justify-center items-center w-full text-red-600">
                                <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                <h1 className="text-2xl font-semibold">Log in to comment</h1>
                            </div>
                    }
                </div>
            </LayoutDiv>
        </GlobalDiv>
    )
}
export default Post

