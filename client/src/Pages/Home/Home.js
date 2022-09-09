import PostCard from "../../Components/PostCard";
import GlobalDiv from "../../Styled-components/GlobalDiv";
import LayoutDiv from "../../Styled-components/LayoutDiv";
import TagToSelect from "../../Components/TagToSelect"
import useData from "./Hooks/useData";
import Loading from "../../Components/Loading";

const Home = ({ user }) => {
    const { lastElementRef, setSearch, setTagFilter, newTag, setNewTagFormOpen, setDeleteTagFormOpen, setTagFilterToDelete, deleteTags,
        tagFilterToDelete, deleteTagFormOpen, newTagFormOpen, tagFilter, loading, posts, tags } = useData()
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
                                    <TagToSelect tag={tag} tagsArray={tagFilter} setTagsArray={setTagFilter} />
                                </div>
                            ))
                        }
                        {
                            user && user.is_admin == true &&
                            <>
                                <li className="flex justify-center items-center text-zinc-800 dark:text-zinc-200 mx-3 py-1 cursor-pointer" onClick={() => { setNewTagFormOpen(!newTagFormOpen); setDeleteTagFormOpen(false) }}>
                                    <svg width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                    </svg>
                                </li>
                                <li className="flex justify-center items-center text-zinc-800 dark:text-zinc-200 mx-3 py-1 cursor-pointer" onClick={() => { setDeleteTagFormOpen(!deleteTagFormOpen); setNewTagFormOpen(false) }}>
                                    <svg width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                    </svg>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </LayoutDiv>
            {
                newTagFormOpen &&
                <LayoutDiv>
                    <div className='bg-zinc-100 dark:bg-zinc-800 w-full  shadow-md rounded-md mt-5'>
                        <div className=" flex sm:flex-row flex-col space-x-5 sm:space-y-0 space-y-3 py-3 items-center justify-center sm:justify-center">
                            <div className="flex items-center justify-center px-3 sm:px-0">
                                <h1 className="text-xl font-semiblod text-zinc-800 dark:text-white mr-4">Name:</h1>
                                <div className="w-full shadow-md">
                                    <input type="text" id="tagName" className="rounded border dark:text-zinc-300 dark:bg-zinc-800 bg-zinc-100 border-zinc-500 w-full py-2 px-3" placeholder="Title" required />
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <h1 className="text-xl font-semiblod text-zinc-800 dark:text-white mr-4">Color:</h1>
                                <div className="w-full">
                                    <input type="color" id="tagColor" className="bg-zinc-100 dark:bg-zinc-800" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mb-3 sm:mt-3">
                            <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={newTag} >Create</div>
                        </div>
                    </div>
                </LayoutDiv>
            }
            {
                deleteTagFormOpen &&

                <LayoutDiv>
                    <div className='bg-zinc-100 dark:bg-zinc-800  w-full py-2 shadow-md rounded-md mt-5'>
                        <div className="flex flex-col items-center justify-center">
                            <ul className="flex flex-wrap">
                                {
                                    tags.map((tag) => (
                                        <div key={tag.id_tag}>
                                            <TagToSelect tag={tag} tagsArray={tagFilterToDelete} setTagsArray={setTagFilterToDelete} />
                                        </div>
                                    ))
                                }
                            </ul>
                            <div className="flex items-center justify-center my-3">
                                <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={deleteTags} >Delete</div>
                            </div>
                        </div>
                    </div>
                </LayoutDiv>
            }
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