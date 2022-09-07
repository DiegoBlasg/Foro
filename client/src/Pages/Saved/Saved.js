import GlobalDiv from "../../Styled-components/GlobalDiv";
import useData from "./Hooks/useData";
import LayoutDiv from "../../Styled-components/LayoutDiv";
import PostCard from "../../Components/PostCard";
import Loading from "../../Components/Loading";

const Saved = () => {
    const { lastElementRef, loading, posts } = useData()
    return (
        <GlobalDiv>
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
export default Saved