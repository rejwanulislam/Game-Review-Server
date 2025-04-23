const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors())
app.use(express.json())
//USER NAME:Game-Review
//PASSWORD:5nPX0tHFMdc4P0QQ
//mongodb



const uri = "mongodb+srv://Game-Review:5nPX0tHFMdc4P0QQ@cluster0.dmdocyb.mongodb.net/?appName=Cluster0";

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
        const gameCollection = client.db("gamereview").collection("addreview");
        const gameWatchList = client.db("gamereview").collection("WatchList");


        app.post('/addreview', async (req, res) => {
            const review = req.body
           // console.log("review", review)
            const result = await gameCollection.insertOne(review);
            res.send(result)
        })


        app.get('/addreview', async (req, res) => {
            const review = gameCollection.find()
            const result = await review.toArray()
            res.send(result)
        })

        app.get('/addreview/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await gameCollection.findOne(query)
            res.send(result)

        })

        app.patch('/addreview/:id', async (req, res) => {
            const id = req.params.id
            const reviews = req.body
            const query = { _id: new ObjectId(id) }
            const update = {
                $set: {
                    name: reviews?.name,
                    review: reviews?.review,
                    rating: reviews?.rating,
                    publish: reviews?.publish,
                    genres: reviews?.genres,
                    photo: reviews?.photo

                }
            }
            const result = await gameCollection.updateOne(query, update)
            res.send(result)
        })

        app.delete('/addreview/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await gameCollection.deleteOne(query)
            res.send(result)
        })






        //watchList

        app.post('/watchList', async (req, res) => {
            const review = req.body
            console.log("review", review)
            const result = await gameWatchList.insertOne(review);
            res.send(result)
        })

        app.get('/watchList', async (req, res) => {
            const watchList = gameWatchList.find()
            const result = await watchList.toArray()
            res.send(result)
        })


      


        // Connect the client to the server	(optional starting in v4.7)
       ////await client.connect();
        // Send a ping to confirm a successful connection
       // await client.db("admin").command({ ping: 1 });
        ////console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})