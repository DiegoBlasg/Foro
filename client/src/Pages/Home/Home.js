import PostCard from "../../Components/PostCard";
import GlobalDiv from "../../Styled-components/GlobalDiv";
import LayoutDiv from "../../Styled-components/LayoutDiv";
import useData from "./Hooks/useData";

const Home = () => {
    const { morePosts, posts, numberOfPosts, setSearch } = useData()
    return (
        <GlobalDiv>
            <LayoutDiv>
                <div className="relative w-full shadow-md">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-zinc-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 text-sm rounded-lg w-full pl-10 p-3" placeholder="Search" onKeyUp={(e) => setSearch(e.target.value)} required />
                </div>
            </LayoutDiv>
            <LayoutDiv>
                {
                    posts.map(post => (
                        <PostCard key={post.id_post} post={post} />
                    ))
                }
            </LayoutDiv>
            {
                numberOfPosts > posts.length &&
                <div className="my-5 flex justify-center">
                    <div onClick={morePosts}
                        className="flex items-center rounded-lg cursor-pointer bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-700 py-2 px-3 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 dark:hover:text-white">
                        More
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </div>
                </div>
            }
        </GlobalDiv >
    );
}
export default Home