const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//Middleware 

app.use(cors());
app.use(express.json());



// mongodb 



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1vvlral.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

 const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-dtbu8sc-shard-00-00.1vvlral.mongodb.net:27017,ac-dtbu8sc-shard-00-01.1vvlral.mongodb.net:27017,ac-dtbu8sc-shard-00-02.1vvlral.mongodb.net:27017/?ssl=true&replicaSet=atlas-14cxer-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
console.log(uri);



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const addSpotCollection = client.db('addSpotDB').collection('addSpot')


    app.get('/addSpot', async(req, res)=>{
        const cursor = addSpotCollection.find();
        const result = await cursor.toArray();
        res.send(result);

    })

    app.post('/addSpot', async (req, res) =>{
        const newAdd = req.body;
        console.log(newAdd);
        const result = await addSpotCollection.insertOne(newAdd);
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req, res) =>{
    res.send('Assignment Server is running')

})

app.listen(port, () =>{
    console.log(`Assignment server is running on port: ${port}`);
})
