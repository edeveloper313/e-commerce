import mongoose from "mongoose"
// "./filename"
// "../utils/config.mjs"
const connection = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined in .env file");
        }
        console.log("Connecting to MongoDB...");
        const db = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Mongoose is connected to:", mongoose.connection.host);
        return db;
    } catch (err) {
        if (err.code === 'ECONNREFUSED' || err.message.includes('querySrv')) {
            console.error('\n--- MongoDB Connection Error ---');
            console.error('Error: Connection refused (ECONNREFUSED).');
            console.error('Possible reasons:');
            console.error('1. Your IP address is not whitelisted in MongoDB Atlas.');
            console.error('2. You are behind a firewall or VPN that blocks port 27017 or DNS SRV lookups.');
            console.error('3. The DATABASE_URL in your .env file might be incorrect.');
            console.error('--------------------------------\n');
        } else {
            console.error('Mongoose connection error: ', err);
        }
        process.exit(1);
    }
}

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose event error: ', err);
});

export default connection