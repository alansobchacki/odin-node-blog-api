const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

// all user-related queries
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

async function createUser(email, name, password, admin) {
  try {
    const isAdmin = email === process.env.ADMIN_EMAIL ? true : admin;
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

module.exports = {
  getUser,
  getAllUsers,
  createUser,
};
