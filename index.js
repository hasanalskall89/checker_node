require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const port = process.env.PORT;

//middleware 
app.use(cors({
    origin: "*",
}));
app.use(express.json()); // req.body


//Insert 
app.post('/api', async (req, res) => {
    try {
        const address = req.body["address"];
        const type = req.body['type'];
        const confirm = false;
        const insert = await pool.query(
            'INSERT INTO whitelist (address, type, confirm) VALUES ($1, $2, $3) RETURNING *',
            [address, type, confirm]
        );
        res.json("Address Was Added!");
    } catch (err) {
        console.log(err.message)
        res.json(" ")
    }
})

//Get
app.get("/api/all", async (req, res) => {
    try {
        const getAll = await pool.query('SELECT * FROM whitelist');
        res.json(getAll.rows)
    } catch (err) {
        console.log(err.message)
        res.json(" ")
    }
})
app.get("/api/client/:address", async (req, res) =>{
    try {
        const address = req.params.address;
        let s = `SELECT * FROM whitelist WHERE address = '${address}';`
        const getInfo = await pool.query(s)
        if(getInfo.rowCount > 0){
            res.json(getInfo.rows)
        }else{
            res.json("You are not on any List!.")
        }
            
    } catch (err) {
        console.log(err.message)
        res.json(" ")
    }
})

//Update Confirm State
app.put("/api/client/put/:address", async (req, res) => {
    try {
        const address = req.params.address
        let s = `UPDATE whitelist SET confirm = true WHERE address = '${address}';`
        const deleteaddress = await pool.query(s);
        res.json("Your Address IS Confirmed!")
    } catch (err) {
        console.log(err.message)
        res.json(" ")
    }
})

//Delete
app.delete("/api/admin/:id", async (req, res) => {
    const { id } = req.params;
    const deleteAddress = pool.query("DELETE FROM whitelist WHERE id = $1", [id]);
    res.json("Address Was Deleted!")
    
})
app.delete("/api/client/:address", async (req, res) => {
    const address = req.params.address;
    const deleteAddress = pool.query("DELETE FROM whitelist WHERE address = $1", [address]);
    res.json("Address Was Deleted!")
})

app.listen(port, () => {
    console.log(`Server running on Port: ${port}`)
})
