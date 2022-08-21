import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Home = () => {
    const [posts, setPosts] = useState([])
    const getPosts = async () => {
        const res = await axios.get('http://localhost:4000/post/all')
        setPosts(res.data.posts)
    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div>
            <div className='bg-zinc-200 fixed w-full h-full -z-10'></div>

            <div className='flex items-center justify-center pt-20 sm:mt-18'>
                <form className='flex justify-center w-full lg:w-7/12 md:w-10/12'>
                    <div className="relative w-full shadow-md">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="simple-search" className="bg-zinc-100 text-zinc-800 text-sm rounded-lg w-full pl-10 p-3" placeholder="Search" required />
                    </div>
                </form >
            </div>

            <div className='flex items-center justify-center my-5'>
                <div className='bg-zinc-100 flex items-center justify-center w-full lg:w-7/12 md:w-10/12 py-2 shadow-md rounded-md'>
                    <ul className="flex flex-wrap">
                        <li className="py-1">
                            <input type="checkbox" id="react-option" value="1" className="hidden peer" />
                            <label htmlFor="react-option" className="inline-flex justify-between items-center px-2 mx-3 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-gray-100 hover:text-gray-800 peer-checked:bg-blue-500 hover:bg-blue-400">
                                <h1>Database</h1>
                            </label>
                        </li>
                        <li className="py-1">
                            <input type="checkbox" id="flowbite-option" value="2" className="hidden peer" />
                            <label htmlFor="flowbite-option" className="inline-flex justify-between items-center px-2 mx-3 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer peer-checked:border-red-600 peer-checked:text-gray-100 hover:text-gray-800 peer-checked:bg-red-500 hover:bg-red-400">
                                <h1>Information</h1>
                            </label>
                        </li>
                        <li className="py-1">
                            <input type="checkbox" id="angular-option" value="3" className="hidden peer" />
                            <label htmlFor="angular-option" className="inline-flex justify-between items-center px-2 mx-3 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer peer-checked:border-yellow-600 peer-checked:text-gray-100 hover:text-gray-800 peer-checked:bg-yellow-500 hover:bg-yellow-400">
                                <h1>HTML</h1>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                {
                    posts.slice().reverse().map(post => (
                        <PostCard key={post.id_post} post={post} />
                    ))
                }
            </div>

        </div >
    );
}
export default Home