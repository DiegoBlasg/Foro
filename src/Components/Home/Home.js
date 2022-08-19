import Filters from "./Filters";
import Post from "./Post";
import Search from "./Search";

const Home = () => {

    return (
        <div>
            <div className='bg-zinc-200 fixed w-full h-full -z-10'></div>

            <Search />

            <Filters />

            <div>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>

        </div >
    );
}
export default Home