import PostCard from "../../Components/PostCard";
import GlobalDiv from "../../Styled-components/GlobalDiv";
import LayoutDiv from "../../Styled-components/LayoutDiv";
import TagToSelect from "../../Components/TagToSelect"
import useData from "./Hooks/useData";
import Loading from "../../Components/Loading";

const Home = () => {
    const { lastElementRef, setSearch, setTagFilter, tagFilter, loading, posts, tags } = useData()

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
                <div className='bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center w-full py-2 shadow-md rounded-md mt-5'>
                    <ul className="flex flex-wrap">
                        {
                            tags.map((tag) => (
                                <div key={tag.id_tag}>
                                    <TagToSelect tag={tag} tagFilter={tagFilter} setTagFilter={setTagFilter} />
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </LayoutDiv>
            <LayoutDiv>
                {
                    posts.map((post, i) => (
                        posts.length === i + 1 ?
                            <div ref={lastElementRef} className="mb-5" key={post.id_post} ><PostCard post={post} /></div>
                            :
                            <div key={post.id_post}><PostCard post={post} /></div>
                    ))
                }
            </LayoutDiv>
            {
                loading && <Loading />
            }
        </GlobalDiv >

    );
}
export default Home