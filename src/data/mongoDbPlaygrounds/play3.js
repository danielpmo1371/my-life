const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://<username>:<password>@cluster0.qxmn4ut.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_URL =
  "mongodb+srv://vercel-admin-user:5u2eQYEF4eWy3F53@cluster0.qxmn4ut.mongodb.net/life?retryWrites=true&w=majority";

const database = "life";
const collection = "projects";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(DATABASE_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("life").command({ ping: 1 });

    const projectsCount = await client
      .db(database)
      .collection(collection)
      .countDocuments();

    // Print a message to the output window.
    console.log(`${projectsCount} projects`);

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
