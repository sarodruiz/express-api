import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.DB_URI;
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log('Database connected');
} catch (error) {
  console.error(error);
}

let db = client.db("books");

export default db;
