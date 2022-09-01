import { useState } from "react"

const TagToSelect = ({ tag, tagsArray, setTagsArray }) => {

    return (
        <li className="py-1">
            {
                tagsArray.includes(tag.id_tag) ?
                    <div
                        className={`inline-flex justify-between items-center px-2 mx-3 rounded-lg border-2 cursor-pointer`}
                        style={{ backgroundColor: tag.color, borderColor: tag.color, color: "#fff" }}
                        onClick={() => { tagsArray && setTagsArray(tagsArray.filter((tag2) => tag2 != tag.id_tag)) }}>
                        <h1>{tag.name}</h1>
                    </div>
                    :
                    <div
                        className={`inline-flex justify-between items-center px-2 mx-3 text-zinc-600 dark:text-zinc-400 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 cursor-pointer hover:text-zinc-800`}
                        onClick={() => { tagsArray && setTagsArray([...tagsArray, tag.id_tag]) }}>
                        <h1>{tag.name}</h1>
                    </div>

            }
        </li>
    )
}
export default TagToSelect