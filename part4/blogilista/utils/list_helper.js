const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    let total = 0
    blogList.forEach(blog => {
        total += Number(blog.likes)
    })
    return total
}

const favoriteBlog = (blogList) => {
    const likesList = blogList.map(blog => blog.likes)
    const maxLikes = Math.max(...likesList)
    return maxLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}