const GlobalDiv = ({ children }) => {
    return (
        <div>
            <div className='bg-zinc-200 fixed w-full h-full -z-10'></div>
            <div className="pt-20 sm:mt-18 flex flex-col items-center">
                {children}
            </div>
        </div>
    )
}
export default GlobalDiv