require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')

const port = process.env.PORT || 3001

mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () =>{console.log('Connected to DB')}
)

app.listen(port, () => console.log(`Server running on ${port}`))