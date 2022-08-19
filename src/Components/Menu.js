import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    const [sowPhoneMenu, setSowPhoneMenu] = useState(false)
    const [phone, setPhone] = useState(false)

    const isAPhone = () => {
        if (window.innerWidth < 640) {
            setPhone(true);
            setSowPhoneMenu(false)
        } else {
            setPhone(false);
            setSowPhoneMenu(true)
        }
    }

    window.addEventListener('resize', isAPhone)

    useEffect(() => {
        isAPhone();
    }, []);
    return (
        <div>
            <div className="w-full fixed z-50">
                <div className="flex justify-between items-center bg-zinc-100 text-zinc-800 shadow-sm sm:px-6">

                    <Link to="/" href="/">
                        <img className="h-14 mx-3" src="/logoSalesianos.png" alt="logo" />
                    </Link>
                    <div className='sm:hidden cursor-pointer' onClick={() => setSowPhoneMenu(!sowPhoneMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </div>
                    {
                        sowPhoneMenu &&
                        <ul className='sm:flex sm:justify-center bg-zinc-100 fixed sm:static w-full mt-44 sm:mt-0 shadow-sm sm:shadow-none'>
                            <li className="hover:bg-zinc-200">
                                <Link to="/" onClick={() => phone && setSowPhoneMenu(!sowPhoneMenu)} className="h-14 px-6 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                                    </svg>
                                    <h1 className='font-bold mx-2'>HOME</h1>
                                </Link>
                            </li>
                            <li className="hover:bg-zinc-200">
                                <Link to="/profile" onClick={() => phone && setSowPhoneMenu(!sowPhoneMenu)} className="h-14 px-6 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                    <h1 className='font-bold mx-2'>PROFILE</h1>
                                </Link>
                            </li>
                        </ul>

                    }
                    <button className="h-14 px-6 flex items-center hover:bg-zinc-200" onClick={() => console.log("logout")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg>
                    </button>


                </div>
            </div>
        </div>
    )
}
export default Menu