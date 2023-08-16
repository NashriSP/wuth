const express = require('express')
const expressHandle = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

// Database
const db = require('./config/database')
db.authenticate()
.then(() => console.log('connected'))
.catch(err => console.log('error: '+ err))

// Route
const app = express();
app.use(express.json())
app.get('/', (req,res) => res.json('INDEX'));
app.use('/in', require('./router/in'));
app.use('/pf', require('./router/profile'));

const PORT = process.env.PORT || 6060;
app.listen(PORT, console.log(`Server started on port ${PORT}`))