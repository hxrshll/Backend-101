const { Post } = require('./normalized-schema');

async function explainQuery(authorId) {
  const explanation = await Post.find({ authorId }).explain('executionStats');
  console.log(JSON.stringify(explanation, null, 2));
  
  // Look for 'IXSCAN' in stage to confirm index usage instead of 'COLLSCAN' (collection scan)
}
