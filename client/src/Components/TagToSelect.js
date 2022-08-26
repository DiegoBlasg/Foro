import { useState } from "react"

const TagToSelect = ({ tag, tagsIncluded, setTagsIncluded }) => {
    const [selected, setSelected] = useState(false)

    return (
        <li className="py-1">
            {
                selected ?
                    <div
                        className={`inline-flex justify-between items-center px-2 mx-3 rounded-lg border-2 cursor-pointer`}
                        style={{ backgroundColor: tag.color, borderColor: tag.color, color: "#fff" }}
                        onClick={() => { setSelected(false); tagsIncluded && setTagsIncluded(tagsIncluded.filter((tag2) => tag2 != tag.id_tag)) }}>
                        <h1>{tag.name}</h1>
                    </div>
                    :
                    <div
                        className={`inline-flex justify-between items-center px-2 mx-3 text-zinc-600 dark:text-zinc-400 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 cursor-pointer hover:text-zinc-800`}
                        onClick={() => { setSelected(true); tagsIncluded && setTagsIncluded([...tagsIncluded, tag.id_tag]) }}>
                        <h1>{tag.name}</h1>
                    </div>

            }
        </li>
    )
}
export default TagToSelect