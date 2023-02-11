const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const mostBlogs = (blogs) => {
  const result = {};

  if (blogs.length === 0) return result;

  blogs.map(({ author }) =>
    result[author] ? (result[author] += 1) : (result[author] = 1)
  );

  const max = Object.entries(result).reduce((max, [author, blogs]) =>
    blogs > max[1] ? [author, blogs] : max
  );

  return { author: max[0], blogs: max[1] };
};

const mostLikes = (blogs) => {
  const result = {};

  if (blogs.length === 0) return result;

  blogs.map(({ author, likes }) => {
    result[author] ? (result[author] += likes) : (result[author] = likes);
  });

  const max = Object.entries(result).reduce((max, [author, likes]) =>
    likes > max[1] ? [author, likes] : max
  );

  return { author: max[0], likes: max[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
