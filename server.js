// imports the necessary dependencies
import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import cors from 'cors';

// sets up a port for the app to listen to

// we may first need an app - how do I use express to set up an app?
const app = express(); // always use the const keyword to declare a variable!
const PORT = 8000;
app.listen(PORT);

// this bit here is called middleware, and it lets the app understand JSON and CORS requests
app.use(cors()); // this allows the front end to talk to the backend by editing the headers so the browser doesn't freak out
app.use(express.json()); // this takes JSON formatted requests and turns them into JS objects so the request/response cycle can work properly

// # CONFIGURE THE DATABASE
// this just created the "handle" for the db , or the pointer - not hydrated/initialized yet 
// set up the database
const adapter = new JSONFile('db.json'); // this sets up the file that stores the data and abstracts the JSON // operations so we can use it like a database
const db = Low(adapter); // this is the db, it can read and write, and uses the adapter (which abstracts some JSON ops)


// # HYDRATE/INITIALIZE THE DATABASE

// initialize the db  (this is a common pattern - declare something, then initialize it ... declare then initialize :: wax on, wax off)
// you need to do the below intialization also because otherwise every time you restart the server, the db will be empty
await db.read(); // this reads the db file and loads it into memory
if (!db.data) {
    db.data = { entries: [] }; // this initializes the db with an empty array of entries if it doesn't exist
    // if you hadn't done the await before, this would mean that the db would be empty every time you restarted the server
    // which would be bad for a real app - it would defeat the purpose of having a database
}
await db.write(); // this is also hydration

// # START THE SERVER
app.listen(PORT, () => {
    console.log(`🚀🚀🚀 Server is running on http://localhost:${PORT}`);
});

// # SET UP THE ROUTES 🚀🚀🚀

app.get('/entries', (req, res) => { res.json(db.data.entries)});

app.post('/entries', async (req, res) => {
    const newEntry = {};
    newEntry.id = Date.now();
    newEntry.text = req.body.text;
    db.data.entries.push(newEntry);
    await db.write(); // so it's not enough to push it to the array, you need to write it
    // this is definitely counterintuitive - its like the commit then push in git

    res.status(201).json(newEntry); // this sends back the new entry with a 201 status code, which means created
    // the 201 status code is a standard HTTP status code that indicates that a request has been fulfilled and has resulted in the creation of a new resource

}); // this is a super interesting line, shows a lot about req/res cycle


app.put('/entries/:id', (req,res) => {
    const id = parseInt(req.params.id, 10);
    // <todo - use this id to replace the entry in the db with the new data from req.body>
});
app.delete('entries/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    // <todo - use the ID above to delete the entry in the db, will need to learn lowdb methods!>
});