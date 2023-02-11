const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");

const {
  listWithNoBlogs,
  listWithOneBlog,
  listWithTwoBlogs,
  listWithManyBlogs,
} = require("./list_helpers_data");

test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has no blogs, equals to zero", () => {
    const result = totalLikes(listWithNoBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has two blogs, return sum of likes", () => {
    const result = totalLikes(listWithTwoBlogs);
    expect(result).toBe(12);
  });

  test("when list has many blogs, return sum of likes", () => {
    const result = totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});

describe("most blog likes", () => {
  test("when list has no blogs, equals to empty object", () => {
    const result = favoriteBlog(listWithNoBlogs);
    expect(result).toEqual({});
  });

  test("when list has only one blog, equals to that object", () => {
    const result = favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    });
  });

  test("when list has two blogs, equals to the blog with most likes", () => {
    const result = favoriteBlog(listWithTwoBlogs);
    expect(result).toEqual({
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    });
  });

  test("when list has many blogs, equals to the blog with most likes", () => {
    const result = favoriteBlog(listWithManyBlogs);
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("most blogs", () => {
  test("when list has no blogs, equals to empty object", () => {
    const result = mostBlogs(listWithNoBlogs);
    expect(result).toEqual({});
  });

  test("when list has one blog, equal to that author with one blog", () => {
    const result = mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
  });

  test("when list has two blogs, equal to first author with the most blogs", () => {
    const result = mostBlogs(listWithTwoBlogs);
    expect(result).toEqual({ author: "Michael Chan", blogs: 1 });
  });

  test("when list has many blogs, equal to first author with the most blogs", () => {
    const result = mostBlogs(listWithManyBlogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});

describe("most author likes", () => {
  test("when list has no blogs, equals to empty object", () => {
    const result = mostLikes(listWithNoBlogs);
    expect(result).toEqual({});
  });

  test("when list has one blog, equals to author with most likes", () => {
    const result = mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 5 });
  });

  test("when list has two blogs, equals to first author with most likes", () => {
    const result = mostLikes(listWithTwoBlogs);
    expect(result).toEqual({ author: "Michael Chan", likes: 7 });
  });
});
