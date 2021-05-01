const express = require('express');

const app = express(); 

app.get('/', (req, res)=> res.send('ActGivers Server Running'));

const PORT = process.env.PORT || 8084
app.listen(PORT, (x) => console.log(`Server started on port ${PORT}`))