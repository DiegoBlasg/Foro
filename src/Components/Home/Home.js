import Filters from "./Filters";
import PostCard from "./PostCard";
import Search from "./Search";

const Home = () => {

    return (
        <div>
            <div className='bg-zinc-200 fixed w-full h-full -z-10'></div>

            <Search />

            <Filters />

            <div>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>

        </div >
    );
}
export default Home