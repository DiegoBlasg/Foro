const Filters = () => {
    return (
        <div className='flex items-center justify-center my-5'>
            <div className='bg-zinc-100 flex items-center justify-center w-full sm:w-10/12 py-2 shadow-md rounded-md'>
                <ul className="flex flex-wrap">
                    <li className="py-1">
                        <input type="checkbox" id="react-option" value="1" className="hidden peer" />
                        <label htmlFor="react-option" className="inline-flex justify-between items-center px-2 mx-3 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-gray-100 hover:text-gray-800 peer-checked:bg-blue-500 hover:bg-blue-400">
                            <h1>Database</h1>
                        </label>
                    </li>
                    <li className="py-1">
                        <input type="checkbox" id="flowbite-option" value="2" className="hidden peer" />
                        <label htmlFor="flowbite-option" className="inline-flex justify-between items-center px-2 mx-3 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer peer-checked:border-red-600 peer-checked:text-gray-100 hover:text-gray-800 peer-checked:bg-red-500 hover:bg-red-400">
                            <h1>Information</h1>
                        </label>
                    </li>
                    <li className="py-1">
                        <input type="checkbox" id="angular-option" value="3" className="hidden peer" />
                        <label htmlFor="angular-option" className="inline-flex justify-between items-center px-2 mx-3 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer peer-checked:border-yellow-600 peer-checked:text-gray-100 hover:text-gray-800 peer-checked:bg-yellow-500 hover:bg-yellow-400">
                            <h1>HTML</h1>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Filters