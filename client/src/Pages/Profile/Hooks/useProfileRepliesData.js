import { useCallback, useEffect, useRef, useState } from "react"
import { getRepliesService } from "../../../Services/replies.service"
import { repliesAdapter } from "../../../Adapters/replies.adapter"

const useProfileRepliesData = (search, tagFilter) => {
    const [replies, setReplies] = useState([])

    const [repliesBlocks, setRepliesBlocks] = useState(0)

    const [replyHasMore, setReplyHasMore] = useState(false)
    const [repliesLoading, setRepliesLoading] = useState(false)

    const observer = useRef()
    const lastReplieRef = useCallback(node => {
        if (repliesLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && replyHasMore) {
                moreReplies()
            }
        })
        if (node) observer.current.observe(node)
    }, [replyHasMore, repliesLoading])

    const getReplies = async () => {
        setRepliesLoading(true)
        const res = await getRepliesService(0, search, tagFilter)
        setReplyHasMore(repliesAdapter(res).length > 0)
        setReplies(repliesAdapter(res))
        setRepliesLoading(false)
    }
    const moreReplies = async () => {
        setRepliesLoading(true)
        const res = await getRepliesService(repliesBlocks + 1, search, tagFilter)
        setReplyHasMore(repliesAdapter(res).length > 0)
        setRepliesBlocks(prev => prev + 1)
        setReplies([...replies, ...repliesAdapter(res)])
        setRepliesLoading(false)
    }
    useEffect(() => {
        setRepliesBlocks(0)
        getReplies()
    }, [search, tagFilter])
    return {
        replies, lastReplieRef, repliesLoading
    }
}
export default useProfileRepliesData