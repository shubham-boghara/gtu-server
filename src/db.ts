import mongoose, {Mongoose} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let mongoosePromise: Promise<Mongoose>;
const {env: {MONGO_URL}} = process;

if (MONGO_URL != null) {
    mongoosePromise = mongoose.connect(MONGO_URL,
        {useNewUrlParser: true, useUnifiedTopology: true},
        (err => {
            `MongoDB connection error:${err}`
        }));
}


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log("{✅}Connected the database");
