import PostCard from "./Home/PostCard";

const Profile = () => {

    return (
        <div>
            <div className='bg-zinc-300 fixed w-full h-full -z-10'></div>
            <div className='flex flex-col items-center pt-20 sm:mt-18'>

                <div className="rounded-md shadow-md mt-16 w-full sm:w-10/12 bg-white">
                    <div className="flex flex-col justify-center">
                        <div className="flex justify-center">
                            <img src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png"
                                className="bg-zinc-100 shadow-xl rounded-full -m-16 max-w-[150px]" />
                        </div>
                        <div className="text-center mt-20">
                            <h3 className="text-2xl text-zinc-700 font-bold">Name</h3>
                        </div>
                        <div className="flex justify-center mt-2">
                            <div className="p-3 text-center">
                                <span className="text-xl font-bold block text-zinc-700">5</span>
                                <span className="text-sm text-zinc-400">Posts</span>
                            </div>
                            <div className="p-3 text-center">
                                <span className="text-xl font-bold block text-zinc-700">32</span>
                                <span className="text-sm text-zinc-400">Comments</span>
                            </div>
                        </div>
                        <div className="my-5 mb-8">
                            <div className="flex items-center justify-center">
                                <button className="flex items-center rounded-2xl border bg-red-600 text-white px-3 py-1 font-semibold">
                                    Publish
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex mt-4 -mb-1 shadow-md w-full sm:w-10/12">
                    <div className="rounded-md flex justify-center items-center flex-col sm:flex-row cursor-pointer w-full bg-zinc-300 hover:bg-zinc-300 text-zinc-700 font-semibold py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-post mx-2" viewBox="0 0 16 16">
                            <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-8z" />
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                        </svg>
                        <h1>Posts</h1>
                    </div>
                    <div className="flex justify-center items-center flex-col sm:flex-row cursor-pointer w-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-semibold py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-right-text mx-2" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <h1>Comments</h1>
                    </div>
                    <div className="rounded-md flex justify-center items-center flex-col sm:flex-row cursor-pointer w-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-semibold py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-brightness-high mx-2" viewBox="0 0 16 16">
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                        </svg>
                        <h1>Light Mode</h1>
                        {/*<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon-fill mx-2" viewBox="0 0 16 16">
                                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                            </svg>
                            Dark Mode*/}
                    </div>
                </div>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div >
        </div >
    );
}
export default Profile