// These data sources hold arrays of information on table-data, waitinglist, etc.

const fs = require('fs');
const path = require('path');

// ROUTING

module.exports = (app) => {
  
    // Notes variable
  
  fs.readFile("db/db.json","utf8", (err, data) => {
    if (err) throw err;

    var notes= JSON.parse(data);

    // api/notes GET route

  app.get('/api/notes', function(req, res) {
    
    res.json(notes);  
  });


  // api/notes POST route
  

  app.post('/api/notes', function(req, res) {
    
    // New note gets added to db.json then returns the new note
    
    let newNotes =req.body;
    notes.push(newNotes);
    updateDb();
    return
    console.log(newNotes.title);
  });

  // Retrieve a note with a specific id
  app.get('/api/notes/:id', (req, res) => 
  
  res.json(notes[req.params.id]));

  // notes.html displayed when /notes route accessed 

  app.get('/notes', (req,res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // index.html displayed when other routes accessed
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

    // json file updated when a note is added
    function updateDb() {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
            return true;
        });

    }

  });

}


  
    