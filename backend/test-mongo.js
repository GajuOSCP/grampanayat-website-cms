const { MongoMemoryServer } = require('mongodb-memory-server');

async function test() {
  console.log('Attempting to start MongoMemoryServer...');
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log('MongoMemoryServer started at:', uri);
  await mongod.stop();
  console.log('MongoMemoryServer stopped.');
}

test().catch(err => {
  console.error('Failed to start MongoMemoryServer:', err);
  process.exit(1);
});
