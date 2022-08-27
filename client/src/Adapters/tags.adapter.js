export const tagsAdapter = (tags) => {
    const tagsAdapted = tags.data.tags.map((tag) => {
        return {
            id_tag: tag.id_tag,
            name: tag.name,
            color: tag.color
        }
    })
    return tagsAdapted
}