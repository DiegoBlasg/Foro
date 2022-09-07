import { useCallback, useEffect, useRef, useState } from "react"
import { userCommentsAdapter } from "../../../Adapters/comments.adapter"
import { getUserCommentsService } from "../../../Services/comments.service"

const useProfileCommentsData = (search, tagFilter) => {
    const [userComments, setUserComments] = useState([])

    const [commentsBlocks, setCommentsBlocks] = useState(0)

    const [commentHasMore, setCommentHasMore] = useState(false)
    const [commentsLoading, setCommentsLoading] = useState(false)

    const observer = useRef()
    const lastCommentRef = useCallback(node => {
        if (commentsLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && commentHasMore) {
                moreUserComments()
            }
        })
        if (node) observer.current.observe(node)
    }, [commentHasMore, commentsLoading])

    const getUserComments = async () => {
        setCommentsLoading(true)
        const res = await getUserCommentsService(0, search, tagFilter)
        setCommentHasMore(userCommentsAdapter(res).length > 0)
        setUserComments(userCommentsAdapter(res))
        setCommentsLoading(false)

    }
    const moreUserComments = async () => {
        setCommentsLoading(true)
        const res = await getUserCommentsService(commentsBlocks + 1, search, tagFilter)
        setCommentHasMore(userCommentsAdapter(res).length > 0)
        setCommentsBlocks(prev => prev + 1)
        setUserComments([...userComments, ...userCommentsAdapter(res)])
        setCommentsLoading(false)
    }
    useEffect(() => {
        setCommentsBlocks(0)
        getUserComments()
    }, [search, tagFilter])
    return {
        userComments, lastCommentRef, commentsLoading
    }
}
export default useProfileCommentsData