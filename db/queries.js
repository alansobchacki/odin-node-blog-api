const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

module.exports = {
  getAllUsers,
};
