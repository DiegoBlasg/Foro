import PostCard from "../../Components/PostCard";
import './animation.css'
import { Link } from "react-router-dom";
import UserCommentCard from "./UserCommentCard";
import GlobalDiv from "../../Styled-components/GlobalDiv";
import LayoutDiv from "../../Styled-components/LayoutDiv";
import useData from "./Hooks/useData";
import Loading from "../../Components/Loading";
import TagToSelect from '../../Components/TagToSelect'

const Profile = ({ user, setTheme, theme }) => {
    const { userPosts, tags, tagFilter, loading, userComments, choice, viewAnonymous, numberOfUserPosts, numberOfUserComments,
        lastPostRef, setSearch, setTagFilter, lastCommentRef, setChoice, setViewAnonymous } = useData()
    return (
        <GlobalDiv>
            <LayoutDiv>
                <div className="rounded-md shadow-md mt-16 w-full bg-zinc-100 dark:bg-zinc-800">
                    <div className="flex flex-col justify-center">
                        <div className="flex justify-center">
                            <img src={user.photos[0].value}
                                className="bg-zinc-100 dark:bg-zinc-800 shadow-xl rounded-full -m-16 h-32 max-w-[150px]" alt="profile picture" />
                        </div>
                        <div className="text-center mt-20">
                            <h3 className="text-2xl text-zinc-700 dark:text-zinc-300 font-bold">{user.displayName}</h3>
                            <h3 className="text-md text-zinc-500 font-bold">{user.emails[0].value}</h3>
                        </div>
                        <div className="flex justify-center mt-2">
                            <div className="p-3 text-center">
                                <span className="text-xl font-bold block text-zinc-700 dark:text-zinc-300">{numberOfUserPosts}</span>
                                <span className="text-sm text-zinc-400 dark:text-zinc-500">Posts</span>
                            </div>
                            <div className="p-3 text-center">
                                <span className="text-xl font-bold block text-zinc-700 dark:text-zinc-300">{numberOfUserComments}</span>
                                <span className="text-sm text-zinc-400 dark:text-zinc-500">Comments</span>
                            </div>
                        </div>
                        <div className="my-5 mb-8">
                            <div className="flex items-center justify-center">
                                <Link to="/newpost" className="flex items-center rounded-2xl bg-red-600 text-white px-3 py-1 font-semibold">
                                    Publish
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutDiv>
            <LayoutDiv>
                <div className="flex mt-4 -mb-1 shadow-md w-full">
                    <div className={`rounded-l-md flex justify-center items-center flex-col sm:flex-row border border-zinc-300 dark:border-zinc-700 cursor-pointer w-full bg-zinc-${choice === "post" ? "300" : "200"} hover:bg-zinc-300 text-zinc-700 dark:bg-zinc-${choice === "post" ? "700" : "800"} dark:hover:bg-zinc-700 dark:text-zinc-300 font-semibold py-2`} onClick={() => setChoice("post")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-post mx-2" viewBox="0 0 16 16">
                            <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-8z" />
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                        </svg>
                        <h1>Posts</h1>
                    </div>
                    <div className={`flex justify-center items-center flex-col sm:flex-row border border-zinc-300 dark:border-zinc-700 cursor-pointer w-full bg-zinc-${choice === "comment" ? "300" : "200"} hover:bg-zinc-300 text-zinc-700 dark:bg-zinc-${choice === "comment" ? "700" : "800"} dark:hover:bg-zinc-700 dark:text-zinc-300 font-semibold py-2`} onClick={() => setChoice("comment")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-right-text mx-2" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <h1>Comments</h1>
                    </div>
                    <div className={`flex justify-center items-center flex-col sm:flex-row border border-zinc-300 dark:border-zinc-700 cursor-pointer w-full bg-zinc-${choice === "mention" ? "300" : "200"} hover:bg-zinc-300 text-zinc-700 dark:bg-zinc-${choice === "mention" ? "700" : "800"} dark:hover:bg-zinc-700 dark:text-zinc-300 font-semibold py-2`} onClick={() => setChoice("mention")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-at mx-2" viewBox="0 0 16 16">
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                        </svg>
                        <h1>Mentions</h1>
                        {/*<div className='absolute text-red-600 -ml-32 notification'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                            </svg>
                    </div>*/}
                    </div>
                    {
                        theme === "dark" ?
                            <div onClick={() => setTheme("light")} className="hidden rounded-r-md sm:flex justify-center items-center flex-col sm:flex-row border border-zinc-300 dark:border-zinc-700 cursor-pointer w-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 font-semibold py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon-fill mx-2" viewBox="0 0 16 16">
                                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                                </svg>
                                <h1>Dark Mode</h1>
                            </div>
                            :
                            <div onClick={() => setTheme("dark")} className="hidden rounded-r-md sm:flex justify-center items-center flex-col sm:flex-row border border-zinc-300 dark:border-zinc-700 cursor-pointer w-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 font-semibold py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-brightness-high mx-2" viewBox="0 0 16 16">
                                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                </svg>
                                <h1>Light Mode</h1>
                            </div>
                    }
                </div>
            </LayoutDiv>
            <LayoutDiv>
                <div className="relative w-full shadow-md mt-6">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-zinc-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 text-sm rounded-lg w-full pl-10 p-3" placeholder="Search" onKeyUp={(e) => setSearch(e.target.value)} required />
                </div>
            </LayoutDiv>
            <LayoutDiv>
                <div className='bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center w-full py-2 shadow-md rounded-md mt-5'>
                    <ul className="flex flex-wrap">
                        {
                            tags.map((tag) => (
                                <div key={tag.id_tag}>
                                    <TagToSelect tag={tag} tagsArray={tagFilter} setTagsArray={setTagFilter} />
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </LayoutDiv>
            <LayoutDiv>
                <div className="flex justify-center mt-4">
                    <div className={`${viewAnonymous ? 'bg-red-600 text-zinc-300' : 'text-zinc-800 dark:text-zinc-300'} cursor-pointer rounded-full p-1`} onClick={() => setViewAnonymous(!viewAnonymous)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                    </div>
                </div>

                {
                    choice === "post" ?
                        <>
                            {userPosts.map((post, i) => {
                                if (viewAnonymous || !post.is_anonymous) {
                                    if (userPosts.length === i + 1) {
                                        return <div ref={lastPostRef} className="mb-5" key={post.id_post} ><PostCard post={post} /></div>
                                    } else {
                                        return <div key={post.id_post}><PostCard post={post} /></div>
                                    }
                                } else {
                                    if (userPosts.length === i + 1) {
                                        return <div key={post.id_post} className="invisible" ref={lastPostRef} >a</div>
                                    }
                                }
                            })}
                        </>


                        :
                        choice === "comment" &&
                        <>
                            {userComments.map((commentInfo, i) => {
                                if (viewAnonymous || !commentInfo.is_anonymous) {
                                    if (userComments.length === i + 1) {
                                        return <div ref={lastCommentRef} className="mb-5" key={commentInfo.id_comment} ><UserCommentCard commentInfo={commentInfo} /></div>
                                    } else {
                                        return <div key={commentInfo.id_comment}><UserCommentCard commentInfo={commentInfo} /></div>
                                    }
                                } else {
                                    if (userComments.length === i + 1) {
                                        return <div key={commentInfo.id_comment} className="invisible" ref={lastCommentRef} >a</div>
                                    }
                                }
                            })}
                        </>
                }
            </LayoutDiv>
            {
                loading && <Loading />
            }

        </GlobalDiv>
    );
}
export default Profile