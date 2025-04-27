require("dotenv").config()
const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')

const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const app = express()
const PORT = process.env.PORT || 5000
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/tasks", require("./routes/taskRoute"))
app.use("/api/photos", require("./routes/PhotoRoute"))
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/posts", require("./routes/postRoute"))
app.use("/api/todos", require("./routes/todosRoute"))

app.get('/', (req, res) => {
    res.send("This is home page")
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
})

// app.listen(PORT, () => {
//     console.log(`server running on port: ${PORT}`)
// })