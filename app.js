const express = require("express")
const path = require("path")
const app = express()


// to make folder client static
//__dirname - current directory
app.use(express.static(path.resolve(__dirname, "client")))

// * means any routs ( any get requests)
app.get("*", (req, res)=> {
    res.sendFile(path.resolve(__dirname, "client", "index.html"))
})
app.listen(3000, ()=> {
    console.log("Server has been started on port 3000");
})