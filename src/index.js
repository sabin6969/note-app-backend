import dotenv from "dotenv";
import connectDb from "./db/db.js";
import app from "./app.js";


// configuring dotenv file
dotenv.config({path:"./.env"})

connectDb().then((result) => {
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server has started with Database connection at PORT ${process.env.PORT || 8000}`);
    });
}).catch((err) => {
    console.log(`An error occured ${err.message ?? ""}`);
    process.exit(1);
});