/*
    The address of this server connected to the network is:
    URL ->  http://localhost:8080
    IP  ->  127.0.0.1:8080
*/

const express = require('express')
const app = express()
const PORT = 8080

let data = {
    nick_name: ['fargila']
}

//Middleware
app.use(express.json())

app.get('/', (req, res)=> {
    console.log('The homepage of the website')
    res.send(`
        <body>
            <h1>Homepage</h1>
            <h2>DATA:</h2>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Go to Dashboard</a>
            <script>
                console.log('This script is useless')
            </script>
        </body> 
    `)
})

app.get('/dashboard', (req, res)=> {
    res.send(`
        <body>
            <h1>Dashboard</h1>
            <a href="/">Go to Homepage</a>
        </body>
    `)
})

app.get('/api/data', (req, res)=> {
    console.log('This one was for data.')
    res.status(599).send(data)
})

app.post('/api/data', (req, res)=> {
    const newEntry = req.body
    console.log(newEntry)
    if(Array.isArray(newEntry.nick_name)) {
        data.nick_name.push(...newEntry.nick_name)
    }
    else {
        data.nick_name.push(newEntry.nick_name)
    }
    res.sendStatus(201)
})

app.delete('/api/data', (req, res)=> {
    data.nick_name.pop()
    console.log("Last element of the array was deleted.")
    res.sendStatus(203)
})

app.listen(PORT, ()=> {
    console.log(`Server has started on: ${PORT}`)
})