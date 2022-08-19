const Post = () => {
    return (
        <div className='flex items-center justify-center my-5'>
            <div className="rounded-md border p-5 shadow-md sm:w-10/12 bg-white">
                <div className="flex flex-wrap flex-col  sm:flex-row items-center justify-between space-y-4 w-full sm:space-y-0 border-b pb-3">
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-slate-400"></div>
                        <div className="text-lg font-bold text-slate-700">Name</div>
                    </div>
                    <div className="flex items-center flex-wrap">
                        <button className="rounded-2xl mb-2 mx-1 border bg-red-600 text-white px-3 py-1 text-xs font-semibold">Category</button>
                    </div>
                </div>

                <div className="mt-4 mb-6">
                    <div className="mb-3 text-xl font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit?</div>
                    <div className="text-sm text-neutral-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam nemo quisquam possimus
                        consequuntur excepturi? Beatae aliquid quidem alias consequatur. Iusto delectus ut tempora eum ab sapiente temporibus dolor dolores debitis!
                        lorem, ipsum dolor sit amet consectetur adipisicing elit alias consequatur. Iusto delectus ut tempora eum ab sapiente temporibus dolor dolores debitis!
                        lorem, ipsum dolor sit amet consectetur adipisicing elit...</div>
                </div>

                <div>
                    <div className="flex items-center justify-between text-slate-500">
                        <div className="flex space-x-4 md:space-x-8">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                <span>125</span>
                            </div>
                        </div>
                        <div className="flex space-x-4 md:space-x-8">
                            <div className="flex items-center">
                                <div className="text-xs text-neutral-500">2 hours ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Post