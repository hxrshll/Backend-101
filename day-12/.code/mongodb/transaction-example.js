const mongoose = require('mongoose');
const { User, Post } = require('./normalized-schema');

async function createUserAndPost() {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.create([{ username: 'jane', email: 'jane@example.com' }], { session });
    const post = await Post.create([{
      title: 'My first post',
      content: 'Content here',
      authorId: user[0]._id
    }], { session });

    await session.commitTransaction();
    session.endSession();

    console.log('User and Post created successfully');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Transaction failed:', error);
  }
}
