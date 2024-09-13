import { MongoClient } from "mongodb";

    export const connect = async () => {
        const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        const client = new MongoClient(url);

        let conn;
        let db;
    try {
        console.log("Connecting to the database...");
        conn = await client.connect();
        console.log("connection to the database established")
        db = conn.db(process.env.DB_NAME);
        
        
    } catch(e) {
        console.error(e);
    }

    return db;
}