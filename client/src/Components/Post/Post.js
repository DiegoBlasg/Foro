import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Answer from "./Answer"
import useQueriesWithCredentials from '../useQueriesWithCredentials'

const Post = () => {
    const postId = useParams().id_post
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const [tags, setTags] = useState([])
    const [is_anonymous, setIs_anonymous] = useState(false)
    const [timeAgo, setTimeAgo] = useState("")
    const { queryWithCredentials } = useQueriesWithCredentials()
    useEffect(() => {
        if (post) {
            const now = new Date();
            const created_at = new Date(post.created_at)

            const seconds = Math.floor(((now - created_at) / 1000))
            const minutes = Math.floor(((now - created_at) / 1000) / 60)
            const hours = Math.floor(((now - created_at) / 1000) / 3600)
            const days = Math.floor(((now - created_at) / 1000) / 86400)
            const weeks = Math.floor(((now - created_at) / 1000) / 604800)

            if (weeks > 0) {
                setTimeAgo(weeks + " weeks ago")
            } else if (days > 0) {
                setTimeAgo(days + " days ago")
            } else if (hours > 0) {
                setTimeAgo(hours + " hours ago")
            } else if (minutes > 0) {
                setTimeAgo(minutes + " minutes ago")
            } else if (seconds > 0) {
                setTimeAgo(seconds + " seconds ago")
            } else {
                setTimeAgo("now")
            }
        }

    }, [post])

    const getTags = async () => {
        const res = await axios.get('http://localhost:4000/post/' + post.id_post + '/tags')
        setTags(res.data.tags);
    }
    const newComment = () => {
        const commentData = {
            content: document.getElementById("commentContent").value,
            is_anonymous: is_anonymous
        }
        queryWithCredentials.post('http://localhost:4000/post/' + postId + '/comments', commentData, () => {
            getComments()
            document.getElementById("commentContent").value = ""
        })

    }
    const getPostInfo = async () => {
        const res = await axios.get('http://localhost:4000/post/' + postId)
        setPost(res.data.post)
    }

    const getComments = async () => {
        const res = await axios.get('http://localhost:4000/post/' + postId + '/comments')
        setComments(res.data.comments)
    }

    useEffect(() => {
        getComments()
        getPostInfo()
        getTags()
    }, [])
    return (
        <div>
            <div className='bg-zinc-200 fixed w-full h-full -z-10'></div>

            <div className='flex items-center justify-center pt-20 sm:mt-18'>
                <div className="rounded-md border p-5 shadow-md w-full md:w-10/12 bg-white">
                    <div className="flex flex-wrap flex-col items-start space-y-4 w-full pb-3 border-b">
                        <div className="flex justify-between space-x-3 w-full">
                            <div className="flex space-x-2 items-center">
                                <div className="h-8 w-8 rounded-full">
                                    {
                                        post.is_anonymous ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                            </svg>
                                            :
                                            <img src={post.image} alt="" className='rounded-full' />
                                    }


                                </div>

                                <div>
                                    <div className="text-lg font-bold text-zinc-700">{post.is_anonymous ? 'Anonymous' : post.user_name}</div>
                                    <div className="text-xs font-bold text-zinc-500">{post.is_anonymous ? '' : post.email}</div>
                                </div>
                            </div>
                            <div className="flex space-x-4 md:space-x-8">
                                <div className="flex items-center">
                                    <div className="text-xs text-neutral-500">{timeAgo}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap">
                            {
                                tags.map((tag) => (
                                    <button className={`rounded-2xl mb-2 mx-1 border bg-${tag.color}-600 text-white px-3 py-1 text-xs font-semibold`} key={tag.id_tag}>{tag.name}</button>
                                ))
                            }
                        </div>
                    </div>

                    <div className="mt-4 mb-6 border-b py-3">
                        <div className="mb-3 text-3xl font-bold text-center pb-6 border-b" style={{ wordWrap: "break-word" }}>{post.title}</div>
                        <div className="text-md text-zinc-600 sm:px-5 px-2" style={{ wordWrap: "break-word" }}>{post.description}</div>
                    </div>

                </div>
            </div>

            <div className='flex items-center justify-center pt-2 border-b'>
                <div className="rounded-md border p-5 shadow-md  w-full md:w-10/12 bg-white">
                    <div className="mb-6 pb-6 border-b">
                        <div className="text-xl font-bold text-zinc-900 sm:px-5 px-2">Comments</div>
                    </div>
                    {
                        comments.map((com) => (
                            <Answer key={com.id_comment} comment={com} />
                        ))
                    }
                </div>
            </div >

            <div className='flex items-center justify-center pt-2 pb-4'>
                <div className="rounded-md border p-5 shadow-md  w-full md:w-10/12 bg-white">
                    <div className="mb-6 pb-6 border-b">
                        <div className="text-xl font-bold text-zinc-900 sm:px-5 px-2">Your Answer</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <form className="flex flex-col bg-white w-full md:w-10/12">
                            <div className="flex flex-col items-center w-full">
                                <div className="flex justify-between w-full">
                                    <h2 className="cursor-pointer px-4 pt-3 pb-2 text-center w-full bg-zinc-300 hover:bg-zinc-300">Write</h2>
                                    <h2 className="cursor-pointer px-4 pt-3 pb-2 text-center w-full bg-zinc-200 hover:bg-zinc-300">Preview</h2>
                                </div>
                                <div className="flex justify-between cursor-pointer w-full sm:px-6 my-3">
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
                                    className="rounded border border-gray-400 resize-y w-full h-32 py-2 px-3"
                                    name="body"
                                    placeholder='Add Your Comment...' required id="commentContent"></textarea>
                            </div>
                            <div className="w-full flex justify-between">
                                <div className={`${is_anonymous ? 'bg-red-600 text-zinc-300' : 'text-zinc-800'} cursor-pointer rounded-full p-1`} onClick={() => setIs_anonymous(!is_anonymous)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </div>

                                <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={newComment} >Post</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Post

