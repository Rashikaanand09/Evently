import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import morgan from 'morgan'; 
import authRoutes from './routes/userRoutes.js'; 
import contactRoutes from './routes/contactRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Import user routes
import adminRoutes from './routes/adminRoutes.js'; 
import corporateEventsRouter from './routes/corporateEventRoutes.js';
import connectDB from './connectDB.js';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
connectDB();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(cors({
  origin: ['http://localhost:4000','http://localhost:3000'], // Allow frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'], // Allow headers
  credentials: true, // Allow credentials (cookies or authorization headers)
}));


// Helmet setup to relax the Content-Security-Policy
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'http://localhost:4000'], // Allow images from localhost:4000
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles if needed
    },
  },
}));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/api/v1/auth/users', userRoutes); // Use user routes under /api/v1/auth/users
app.use('/api/v1/auth/admins', adminRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/corporate-events', corporateEventsRouter);


app.get('/api/v1/events', async (req, res) => {
  const events = await Event.find();
  // Ensure the imageUrl uses forward slashes
  events.forEach(event => {
    event.imageUrl = event.imageUrl.replace(/\\/g, '/');
    
  });
  res.json(events);
});







// Custom headers to fix cross-origin and security policies
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');  // Allow frontend domain
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');  // Allow cross-origin resource sharing
//   res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');      // Relax COOP for image and static resources
//   res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin'); // Relax referrer policy
//   next();
// });


app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none'); // Relax COOP for image access
  next();
});




// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Global Error Handler
app.use((err, req, res, next) => {
   console.error('Global Error Handler:', err);
   res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
