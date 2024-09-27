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

async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  getAllPosts,
  createPost,
};
