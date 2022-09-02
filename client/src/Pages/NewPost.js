import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createdPostIdAdapter } from '../Adapters/post.adapter';
import { tagsAdapter } from '../Adapters/tags.adapter';
import TagToSelect from '../Components/TagToSelect';
import TextEditor from '../Components/TextEditor/TextEditor';
import { newPostService, } from '../Services/post.service';
import { getTagsService, newPostTagService } from '../Services/tags.service';
import GlobalDiv from '../Styled-components/GlobalDiv';
import LayoutDiv from '../Styled-components/LayoutDiv';

const NewPost = () => {
    const [is_anonymous, setIs_anonymous] = useState(false)
    const [tags, setTags] = useState([])
    const [tagsIncluded, setTagsIncluded] = useState([])
    const [value, setValue] = useState('');

    const navigate = useNavigate();

    const post = async () => {
        const postData = {
            title: document.getElementById("title").value,
            description: value,
            is_anonymous: is_anonymous,
        }
        const res = await newPostService(postData)
        const postId = createdPostIdAdapter(res)
        const tagsData = {
            tags: tagsIncluded
        }
        await newPostTagService(postId, tagsData)
        navigate("/");

    }

    const getTags = async () => {
        const res = await getTagsService()
        setTags(tagsAdapter(res))
    }
    useEffect(() => {
        getTags()
    }, [])
    return (
        <GlobalDiv>
            <LayoutDiv>
                <div className="rounded-md p-5 shadow-md w-full bg-zinc-100 dark:bg-zinc-800">
                    <div className="flex items-center justify-center mt-5 ">
                        <div className='bg-zinc-100 flex items-center justify-center w-full sm:w-10/12 py-2 shadow-md rounded-md dark:bg-zinc-800'>
                            <ul className="flex flex-wrap">
                                {
                                    tags.map((tag) => (
                                        <TagToSelect tagsArray={tagsIncluded} setTagsArray={setTagsIncluded} key={tag.id_tag} tag={tag} />
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-5">
                        <form className="w-full sm:w-10/12">
                            <div className="w-full shadow-md">
                                <input type="text" id="title" className="rounded border dark:text-zinc-300 dark:bg-zinc-800 bg-zinc-100 border-zinc-500 resize-y w-full py-2 px-3" placeholder="Title" required />
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center justify-center mt-5">
                        <form className="flex flex-col bg-zinc-100 dark:bg-zinc-800 w-full sm:w-10/12">

                            <TextEditor value={value} setValue={setValue} />
                            <div className="w-full flex justify-between mt-4">
                                <div className={`${is_anonymous ? 'bg-red-600 text-zinc-300' : 'text-zinc-800 dark:text-zinc-300'} cursor-pointer rounded-full p-1`} onClick={() => setIs_anonymous(!is_anonymous)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </div>

                                <div className="cursor-pointer bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" onClick={() => post()} >Post</div>
                            </div>
                        </form>
                    </div>
                </div>
            </LayoutDiv>
        </GlobalDiv >
    )
}
export default NewPost