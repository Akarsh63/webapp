const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./routes/users.js');
const roomsRouter = require('./routes/rooms.js');
const bookingsRouter = require('./routes/booking.js');
const adminbookingsRouter = require('./routes/admibookings.js');
require("dotenv").config();
app.get('/', (req, res) => res.send('/users ---> for users data, /rooms ---> for rooms data, /bookings ---> bookings page'));
const corsOptions = {
  origin: "http://localhost:3000"
}
app.use(express.json());
app.use(cors(corsOptions));
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/bookings', bookingsRouter);
app.use('/admibookings', adminbookingsRouter);
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(async () => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const port =process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
