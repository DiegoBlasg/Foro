import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { getPostsService, getTagsService } from '../../Services/post.service'
import { postsAdapter, tagsAdapter } from "../../Adapters/post.adapter";
import GlobalDiv from "../../Styled-components/GlobalDiv";
import LayoutDiv from "../../Styled-components/LayoutDiv";
import TagToSelect from "../../Components/TagToSelect";

const Home = () => {
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])

    const getPosts = async () => {
        const res = await getPostsService()
        setPosts(postsAdapter(res))
    }

    const getTags = async () => {
        const res = await getTagsService()
        setTags(tagsAdapter(res))
    }

    useEffect(() => {
        getPosts()
        getTags()
    }, [])
    return (
        <GlobalDiv>
            <LayoutDiv>
                <div className="relative w-full shadow-md">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 text-sm rounded-lg w-full pl-10 p-3" placeholder="Search" required />
                </div>
            </LayoutDiv>

            <LayoutDiv>
                <div className='bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center w-full py-2 shadow-md rounded-md mt-5'>
                    <ul className="flex flex-wrap">
                        {
                            tags.map((tag) => (
                                <TagToSelect key={tag.id_tag} tag={tag} />
                            ))
                        }
                    </ul>
                </div>
            </LayoutDiv>

            <LayoutDiv>
                {
                    posts.slice().reverse().map(post => (
                        <PostCard key={post.id_post} post={post} />
                    ))
                }
            </LayoutDiv>

        </GlobalDiv>
    );
}
export default Home