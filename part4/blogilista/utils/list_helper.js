const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  let total = 0;
  if (blogList.length === 0) {
    return 0;
  }
  blogList.forEach((blog) => {
    total += Number(blog.likes);
  });
  return total;
};

const favoriteBlog = (blogList) => {
  const likesList = blogList.map((blog) => blog.likes);
  const maxLikes = Math.max(...likesList);
  const topLikedBlog = blogList.find((blog) => blog.likes === maxLikes);
  return topLikedBlog;
};

const mostBlogs = (blogList) => {
  const authorList = [];
  blogList.forEach((blog) => {
    if (!authorList.includes(blog.author)) {
      authorList.push(blog.author);
    }
  });
  if (authorList.length === 0) {
    return "No blogs";
  }
  if (authorList.length === 1) {
    return authorList[0].author;
  }
  const blogAmountList = authorList.map((author) => {
    return blogList.filter((blog) => blog.author === author).length;
  });
  const maxBlogs = Math.max(...blogAmountList);
  const indexOfMax = blogAmountList.indexOf(maxBlogs);
  const authorOfMostBlogs = authorList[indexOfMax];
  const maxBlogsObject = {
    author: authorOfMostBlogs,
    blogs: maxBlogs,
  };
  return maxBlogsObject;
};

const mostLikes = (blogList) => {
  const authorList = [];
  const likeBuffer = [];
  const likesByAuthor = [];
  const initialValue = 0;
  blogList.forEach((blog) => {
    if (!authorList.includes(blog.author)) {
      authorList.push(blog.author);
    }
  });
  if (authorList.length === 0) {
    return "No blogs";
  }
  if (authorList.length === 1) {
    blogList.forEach((blog) => {
      likeBuffer.push(blog.likes);
    });
    return {
      author: authorList[0],
      likes: likeBuffer.reduce((sum, value) => sum + value, 0),
    };
  }

  const likesList = authorList.map((author) => {
    return blogList
      .filter((blog) => blog.author === author)
      .map((blog) => blog.likes)
      .reduce((sum, value) => sum + value, 0);
  });

  const maxLikes = Math.max(...likesList);
  const IndexOfMax = likesList.indexOf(maxLikes);
  const authorOfMaxLikes = authorList[IndexOfMax];
  const maxLikesObject = {
    author: authorOfMaxLikes,
    likes: maxLikes,
  };
  return maxLikesObject;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
