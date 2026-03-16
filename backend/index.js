const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(morgan('dev'));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
    setHeaders: (res) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    }
}));

// Import Routes
const authRoutes = require('./routes/auth.routes');
const noticeRoutes = require('./routes/notice.routes');
const projectRoutes = require('./routes/project.routes');
const newsRoutes = require('./routes/news.routes');
const galleryRoutes = require('./routes/gallery.routes');
const schemeRoutes = require('./routes/scheme.routes');
const staffRoutes = require('./routes/staff.routes');
const serviceRoutes = require('./routes/service.routes');
const settingRoutes = require('./routes/setting.routes');
const touristPlaceRoutes = require('./routes/touristPlace.routes');
const villageInfoRoutes = require('./routes/villageInfo.routes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/tourist-places', touristPlaceRoutes);
app.use('/api/village-info', villageInfoRoutes);

app.get('/', (req, res) => {
    res.send('Gram Panchayat API is running...');
});

// Database Connection
const PORT = process.env.PORT || 5005;

const User = require('./models/user');

async function connectDB() {
    try {
        let uri = process.env.MONGODB_URI;
        
        // Use memory server if in development and local mongo is not responding
        if (process.env.NODE_ENV === 'development') {
            try {
                const { MongoMemoryServer } = require('mongodb-memory-server');
                const mongod = await MongoMemoryServer.create({
                    instance: {
                        dbName: 'gram_panchayat'
                    }
                });
                uri = mongod.getUri();
                console.log('Using In-Memory MongoDB:', uri);
            } catch (err) {
                console.warn('Failed to start MongoMemoryServer, falling back to .env URI');
            }
        }

        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB.');

        const seedAllData = require('./seedHelper');
        await seedAllData();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

connectDB();
