const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

// all user related queries
async function getUser(name) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });
    return user;
  } catch (error) {
    console.error(`Could not find a user named ${name}.`, error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function createUser(email, name, password) {
  try {
    const isAdmin = email === process.env.ADMIN_EMAIL ? true : false;
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        admin: isAdmin,
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// all post related queries
async function createPost(user, title, content, published) {
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        author: { connect: { id: user.id } },
      },
    });

    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

async function editPostAvailability(post_id, published) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: post_id },
      data: { published: !published },
    });

    return updatedPost;
  } catch (error) {
    console.error("Error publishing post", error);
    throw error;
  }
}

async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        author: {
          admin: true,
        },
      },
      include: {
        comments: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// all comment related queries
async function createComment(post_id, author_id, content) {
  try {
    console.log(`Creating comment for postId: ${post_id}, authorId: ${author_id}, content: ${content}`);

    const comment = await prisma.comment.create({
      data: {
        content,
        author: { connect: { id: author_id } },
        post: { connect: { id: parseInt(post_id, 10) } },
      },
    });
    return comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

async function getAllComments(post_id) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: post_id },
      include: { author: true },
    });
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

async function deleteComment(comment_id) {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: comment_id },
    });
    return deletedComment;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  getAllPosts,
  createPost,
  editPostAvailability,
  createComment,
  getAllComments,
  deleteComment,
};
