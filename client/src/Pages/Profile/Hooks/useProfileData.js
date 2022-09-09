import { useEffect, useState } from "react"
import { numberOfUserPostsAdapter } from "../../../Adapters/post.adapter"
import { numberOfUserCommentsAdapter } from "../../../Adapters/comments.adapter"
import { getNumberOfUserCommentsService } from "../../../Services/comments.service"
import { getNumberOfUserPostsService } from "../../../Services/post.service"
import { getTagsService } from "../../../Services/tags.service"
import { tagsAdapter } from "../../../Adapters/tags.adapter"

const useProfileData = () => {
    const [tags, setTags] = useState([])
    const [numberOfUserPosts, setNumberOfUserPosts] = useState(0)
    const [numberOfUserComments, setNumberOfUserComments] = useState(0)

    const [choice, setChoice] = useState("")
    const [viewAnonymous, setViewAnonymous] = useState(true)

    const [search, setSearch] = useState(null)
    const [tagFilter, setTagFilter] = useState([])

    const getNumberOfUserPosts = async () => {
        const res = await getNumberOfUserPostsService()
        setNumberOfUserPosts(numberOfUserPostsAdapter(res))
    }
    const getNumberOfUserComments = async () => {
        const res = await getNumberOfUserCommentsService()
        setNumberOfUserComments(numberOfUserCommentsAdapter(res))
    }
    const getTags = async () => {
        const res = await getTagsService()
        setTags(tagsAdapter(res))
    }
    useEffect(() => {
        getNumberOfUserPosts()
        getNumberOfUserComments()
        getTags()
    }, [])
    return {
        search, tagFilter, choice, viewAnonymous, numberOfUserPosts, numberOfUserComments, tags,
        setSearch, setTagFilter, setChoice, setViewAnonymous
    }
}
export default useProfileData