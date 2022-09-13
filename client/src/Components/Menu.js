import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ user, setTheme, theme }) => {
    const [showMobileDropdownMenu, setShowMobileDropdownMenu] = useState(false)
    const [phone, setPhone] = useState(false)

    const isAPhone = () => {
        if (window.innerWidth < 640) {
            setPhone(true);
            setShowMobileDropdownMenu(false)
        } else {
            setPhone(false);
            setShowMobileDropdownMenu(true)
        }
    }

    window.addEventListener('resize', isAPhone)

    const google = () => {
        window.open(`${process.env.REACT_APP_API_URL || ''}/api/auth/google`, "_self")
    }

    const logout = () => {
        window.open(`${process.env.REACT_APP_API_URL || ''}/api/auth/logout`, "_self")
    }

    useEffect(() => {
        isAPhone();
    }, []);
    return (
        <div>
            <div className="w-full fixed z-50">
                <div className="flex justify-between bg-zinc-100 text-zinc-800 shadow-sm sm:px-6 dark:bg-zinc-800 dark:text-zinc-200">

                    <Link to="/" href="/" onClick={() => window.scrollTo(0, 0)}>
                        <img className="h-14 mx-3" src="/logoSalesianos.png" alt="logo" />
                    </Link>
                    <div className='sm:hidden cursor-pointer flex items-center' onClick={() => setShowMobileDropdownMenu(!showMobileDropdownMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </div>
                    {
                        showMobileDropdownMenu &&
                        <ul className='sm:flex sm:justify-center bg-zinc-100 fixed sm:static w-full mt-12 sm:mt-0 shadow-md sm:shadow-none dark:bg-zinc-800'>
                            <li className="hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                <Link to="/" onClick={() => { (phone && setShowMobileDropdownMenu(!showMobileDropdownMenu)); window.scrollTo(0, 0) }} className="h-14 px-6 flex justify-center items-center">
                                    <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                                    </svg>
                                    <h1 className='font-bold mx-2'>HOME</h1>
                                </Link>
                            </li>
                            <li className="hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                <Link to="/profile" onClick={() => { (phone && setShowMobileDropdownMenu(!showMobileDropdownMenu)); window.scrollTo(0, 0) }} className="h-14 px-6 flex justify-center items-center">
                                    <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                    <h1 className='font-bold mx-2'>PROFILE</h1>
                                </Link>
                            </li>
                            <li className="hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                <Link to="/saved" onClick={() => { (phone && setShowMobileDropdownMenu(!showMobileDropdownMenu)); window.scrollTo(0, 0) }} className="h-14 px-6 flex justify-center items-center">
                                    <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                                    </svg>
                                    <h1 className='font-bold mx-2'>SAVED</h1>
                                </Link>
                            </li>
                            {
                                theme === "dark" ?
                                    <li className="cursor-pointer sm:hidden hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                        <div onClick={() => { (phone && setShowMobileDropdownMenu(!showMobileDropdownMenu)); setTheme("light") }} className="h-14 px-6 flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon-fill mx-2" viewBox="0 0 16 16">
                                                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                                            </svg>
                                            <h1 className='font-bold mx-2'>Dark Mode</h1>
                                        </div>
                                    </li>

                                    :
                                    <li className="cursor-pointer sm:hidden hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                        <div onClick={() => { (phone && setShowMobileDropdownMenu(!showMobileDropdownMenu)); setTheme("dark") }} className="h-14 px-6 flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-brightness-high mx-2" viewBox="0 0 16 16">
                                                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                            </svg>
                                            <h1 className='font-bold mx-2'>Light Mode</h1>
                                        </div>
                                    </li>
                            }
                        </ul>

                    }
                    {
                        user ?
                            <button className="h-14 px-6 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-700" onClick={logout}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                    <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg>
                            </button>

                            :
                            <div className="flex items-center justify-center">
                                <div className="flex w-max items-center cursor-pointer rounded-2xl hover:bg-red-500 bg-red-600 text-white px-3 py-1 font-semibold" onClick={google}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google mr-2" viewBox="0 0 16 16">
                                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                    </svg>
                                    <h1 className='font-bold'>Log in</h1>
                                </div>
                            </div>
                    }


                </div>
            </div>
        </div>
    )
}
export default Menu