const mongoose = require('mongoose')

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log("Connected to DB")

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB