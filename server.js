// imports the necessary dependencies
import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import cors from 'cors';
import 'dotenv/config'; // this imports the dotenv package, which loads environment variables from a .env file into process.env
import OpenAI from 'openai';

// sets up a port for the app to listen to

// we may first need an app - how do I use express to set up an app?
const app = express(); // always use the const keyword to declare a variable!
const PORT = 8000;

// this bit here is called middleware, and it lets the app understand JSON and CORS requests
app.use(cors()); // this allows the front end to talk to the backend by editing the headers so the browser doesn't freak out
app.use(express.json()); // this takes JSON formatted requests and turns them into JS objects so the request/response cycle can work properly

// # CONFIGURE THE DATABASE
// this just created the "handle" for the db , or the pointer - not hydrated/initialized yet 
// set up the database
const adapter = new JSONFile('db.json'); // this sets up the file that stores the data and abstracts the JSON // operations so we can use it like a database
const db = new Low(adapter, {'entries':[]}); // this is the db, it can read and write, and uses the adapter (which abstracts some JSON ops)


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

app.get('/analysis', async (req, res) => {
    const dbEntries = db.data.entries;
    const dbEntriesPrompt = dbEntries.join(', \n');

    const openai = new OpenAI({
        baseURL: 'https://api.fireworks.ai/inference/v1',
        apiKey: process.env.FIREWORKS_API_KEY, // this is the API key for the OpenAI API, which is stored in the .env file
    });

    const completion = await openai.chat.completions.create({
        messages: [{ 
            role: "user", 
            content: " # Role and Instruction \n\n You are an insightful and responsible AI assistant that analyzes user journal entries. Analyze the provided entries and provide insights, suggestions, and reflections. \n\n # Output format \n\n You should format your response as follows: ## Analysis of Entries\n\n <Short 10-16 word sentence about prevailing theme of entries> \n\n ## Suggestions for Improvement\n\n <Short 10-16 word sentence about how to improve the entries> \n\n ## Immediate Next Steps\n\n <Short 10-16 word sentence about what the user should do next> \n\n ## Reflections on Progress\n\n <Short 10-16 word sentence about how the user has progressed> \n\n ## Additional Thoughts\n\n <Short 10-16 word sentence about any additional thoughts you have> # Motivation \n\n <Short 10-16 word sentence about how the user can stay motivated> \n\n\n\n # Entries \n\n " + dbEntriesPrompt
        }],
        model: "accounts/fireworks/models/llama-v3p3-70b-instruct",
    });

    res.json(completion.choices[0].message.content); // this sends back the analysis of the entries
    // this is a very simple example, but you can see how you can use the OpenAI API to analyze the entries in the database);

});

app.put('/entries/:id', async (req,res) => {
    const id = parseInt(req.params.id, 10);
    // <todo - use this id to replace the entry in the db with the new data from req.body>
    const entryIndex = db.data.entries.findIndex(entry => entry.id === id);
    if (entryIndex !== -1) {
        // the below creates a new entry object with all the properties of the existing entry
        // then, it replaces the existing entry's properties with the new ones from req.body
        // this is a common pattern in JavaScript to update an object with new properties
        // this is called the spread operator, and it merits further study
        // btw...the curly braces {} are used to create an object in JavaScript
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/
        db.data.entries[entryIndex] = { ...db.data.entries[entryIndex], ...req.body };
        db.data.entries[entryIndex].id = id; // ensure the ID remains the same

        // adding the await so the frontend doesn't freak out / fails to receive a response
        await db.write(); // write the changes to the db
        res.json(db.data.entries[entryIndex]); // send back the updated entry
    } else {
        res.status(404).json({ message: 'Entry not found' }); // if the entry is not found, send a 404 error
    }
});

app.delete('entries/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    // <todo - use the ID above to delete the entry in the db, will need to learn lowdb methods!>
});

// # START THE SERVER
app.listen(PORT, () => {
    console.log(`🚀🚀🚀 Server is running on http://localhost:${PORT}`);
});