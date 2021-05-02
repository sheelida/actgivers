const express = require('express');

const app = express(); 
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

app.use(express.json())

app.get('/', (req, res)=> res.send('ActGivers Server Running'));

db.serialize(function() {
  db.run(`CREATE TABLE Donations
  (
    email TEXT, 
    fName TEXT, 
    lName TEXT, 
    amount INTEGER, 
    ccNumber INTEGER,
    ccExpMonth INTEGER,
    ccExpYear INTEGER,
    cvv INTEGER,
    charityName TEXT
  )`);
});

app.post("/api/donate", async(req, res)=>{
  const { email, fName, lName, amount, ccNumber, ccExpMonth, ccExpYear, cvv, charityName } = req.body
 
  if (email && fName && lName && amount && ccNumber && ccExpMonth && ccExpYear && cvv && charityName) {
    const stmt = db.prepare("INSERT INTO Donations VALUES (?,?,?,?,?,?,?,?,?)");
    stmt.run([email, fName, lName, amount, ccNumber, ccExpMonth, ccExpYear, cvv, charityName]);
  
    stmt.finalize();
  
    db.each("SELECT * FROM Donations", function(err, row) {
      console.log(`Inserted row`, row);
    });
    res.status(200)
    res.json('Donation completed!')
  } else {
    res.status(400)
    res.json('Information missing')
  }
})

const PORT = process.env.PORT || 8084
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));