import db from "../database/connection.js";
import { ObjectId } from "mongodb";

class BooksController {
    constructor() { }

    async getAll(req, res) {
        let collection = await db.collection("books");
        let results = await collection.find({}).toArray();
        res.send(results).status(200);
    }

    async create(req, res) {
        try {
            let newBook = {
                title: req.body.title,
                author: req.body.author,
                year: req.body.year
            };
            let collection = await db.collection("books");
            let result = await collection.insertOne(newBook);
            res.send(result).status(204);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding book");
        }
    }

    async find(req, res) {
        let collection = await db.collection("books");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) {
            res.send("Not found").status(404);
        }
        else {
            res.send(result).status(200);
        }
    }

    async update(req, res) {
        try {
            const query = { _id: new ObjectId(req.params.id) };
            const updates = {
                $set: {
                    title: req.body.title,
                    author: req.body.author,
                    year: req.body.year
                },
            };

            let collection = await db.collection("records");
            let result = await collection.updateOne(query, updates);
            res.send(result).status(200);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error updating book");
        }
    }

    async delete(req, res) {
        try {
            const query = { _id: new ObjectId(req.params.id) };

            const collection = db.collection("books");
            let result = await collection.deleteOne(query);

            res.send(result).status(200);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error deleting book");
        }
    }
}

export default new BooksController();
