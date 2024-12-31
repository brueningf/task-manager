const Mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/db';

Mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB')).catch(err => console.error(err));

// Task Model
const taskSchema = new Mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

exports.Task = Mongoose.model('Task', taskSchema);
