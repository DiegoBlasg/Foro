import Answer from "./Answer"

const Post = () => {
    return (
        <div>
            <div className='bg-zinc-200 fixed w-full h-full -z-10'></div>

            <div className='flex items-center justify-center pt-20 sm:mt-18 mb-4'>
                <div className="rounded-md border p-5 shadow-md sm:w-10/12 bg-white">
                    <div className="flex flex-wrap flex-col items-start space-y-4 w-full pb-3 border-b">
                        <div className="flex justify-between space-x-3 w-full">
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 rounded-full bg-slate-400"></div>
                                <div className="text-lg font-bold text-slate-700">Name</div>
                            </div>

                            <div className="flex space-x-4 md:space-x-8">
                                <div className="flex items-center">
                                    <div className="text-xs text-neutral-500">2 hours ago</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap">
                            <button className="rounded-2xl mb-2 mx-1 border bg-red-600 text-white px-3 py-1 text-xs font-semibold">Category</button>
                        </div>
                    </div>

                    <div className="mt-4 mb-6 border-b py-3">
                        <div className="mb-3 text-4xl font-bold text-center pb-6 border-b">Lorem ipsum dolor sit amet, consectetur adipisicing elit?</div>
                        <div className="text-md text-zinc-600 sm:px-5 px-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam nemo quisquam possimus
                            consequuntur excepturi? Beatae aliquid quidem alias consequatur. Iusto delectus ut tempora eum ab sapiente temporibus dolor dolores debitis!
                            lorem, ipsum dolor sit amet consectetur adipisicing elit alias consequatur. Iusto delectus ut tempora eum ab sapiente temporibus dolor dolores debitis!
                            lorem, ipsum dolor sit amet consectetur adipisicing elit<br />tur. Iusto delectus ut tempora eum ab sapiente temporibus dolor dolores debitis!
                            lorem, ipsum dolor sit amet consectetur adipisicing elit alias consequatur. Iusto delectus ut tempora eum ab sapiente temporibus dolor dolores debitis!
                            lorem, ipsum dolor sit amet consectetur adipisicing elit<br />adipisicing elit<br />tur. Iusto delectus ut tempora eum ab sapiente temporibus dolor dolores
                            debitis! lorem, ipsum dolor sit amet consectetur adipisicing elit a<br />adipisicing elit<br />tur. Iusto delectus ut tempora eum ab sapiente temporibus
                            dolor dolores debitis! lorem, ipsum dolor sit amet consectetur adipisicing elit a</div>
                    </div>

                </div>
            </div>

            <div className='flex items-center justify-center pt-4 border-b'>
                <div className="rounded-md border p-5 shadow-md sm:w-10/12 bg-white">
                    <div className="mb-6 pb-6 border-b">
                        <div className="text-xl font-bold text-zinc-900 sm:px-5 px-2">Answers</div>
                    </div>
                    <Answer />
                    <Answer />
                    <Answer />
                </div>
            </div >

            <div className='flex items-center justify-center py-4'>
                <div className="rounded-md border p-5 shadow-md w-full sm:w-10/12 bg-white">
                    <div className="mb-6 pb-6 border-b">
                        <div className="text-xl font-bold text-zinc-900 sm:px-5 px-2">Your Answer</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <form className="flex flex-col bg-white w-full lg:w-7/12 md:w-10/12">
                            <div className="flex flex-col items-center w-full">
                                <div className="flex justify-between w-full">
                                    <h2 className="cursor-pointer px-4 pt-3 pb-2 text-center w-full bg-zinc-300 hover:bg-zinc-300">Write</h2>
                                    <h2 className="cursor-pointer px-4 pt-3 pb-2 text-center w-full bg-zinc-200 hover:bg-zinc-300">Preview</h2>
                                </div>
                                <div className="flex justify-between cursor-pointer w-full sm:px-6 my-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-justify" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-text-center" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-text-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-text-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-ol" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                                        <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-type-bold" viewBox="0 0 16 16">
                                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-type-italic" viewBox="0 0 16 16">
                                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-code-slash" viewBox="0 0 16 16">
                                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-full md:w-full my-2">
                                <textarea
                                    className="rounded border border-gray-400 resize-y w-full h-32 py-2 px-3"
                                    name="body"
                                    placeholder='Add Your Comment...' required></textarea>
                            </div>
                            <div className="w-full flex justify-end">
                                <input type='submit' className="bg-red-600 text-zinc-100 font-medium py-1 px-4 rounded-lg hover:bg-red-500" value='Post' />
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Post

