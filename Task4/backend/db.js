const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://farhankhan0511:farhankhan0511@cluster0.gu67ffl.mongodb.net'; 
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB!');

        const db = client.db('expensetracker');

        const expensesCollection = db.collection('expenses');

        console.log('Expense added:', result.insertedId);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

connectToDatabase();
