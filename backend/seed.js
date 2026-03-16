const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Setting = require('./models/setting');
const News = require('./models/news');
const Project = require('./models/project');
const Scheme = require('./models/scheme');
const Staff = require('./models/staff');
const Notice = require('./models/notice');
const Gallery = require('./models/gallery');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedData = async () => {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Setting.deleteMany({});
        await News.deleteMany({});
        await Project.deleteMany({});
        await Scheme.deleteMany({});
        await Staff.deleteMany({});
        await Notice.deleteMany({});
        await Gallery.deleteMany({});
        await User.deleteMany({});

        // 1. Create Admin User
        await User.create({
            username: 'admin',
            password: 'admin123',
            role: 'admin'
        });
        console.log('Admin user created (admin/admin123)');

        // 2. Configure Panchayat Information
        await Setting.create({
            panchayatName: 'ग्रामपंचायत भोन',
            taluka: 'ता. फुलंब्री',
            district: 'जि. छत्रपती संभाजीनगर',
            state: 'महाराष्ट्र',
            address: 'ग्रामपंचायत कार्यालय भोन, ता. फुलंब्री, जि. छत्रपती संभाजीनगर',
            phone: '+९१ १०००००००००',
            email: 'contact@bhon.gp.in',
            sarpanchName: 'श्री. संपतराव गायकवाड',
            aboutText: 'भोन ग्रामपंचायत आपल्या गावाच्या सर्वांगीण विकासासाठी कटिबद्ध आहे. आम्ही पारदर्शक आणि गतिमान कारभाराद्वारे नागरिकांना विविध सेवा पुरवत आहोत.',
            heroImages: [
                'https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop'
            ],
            googleMapUrl: 'https://maps.google.com'
        });
        console.log('Panchayat settings updated.');

        // 3. News
        const newsItems = [
            { title: 'ग्रामसभा दिनांक २८ मार्च रोजी आयोजित', content: 'गावातील सर्व नागरिकांना सूचित करण्यात येते की बुधवार दि. २८ मार्च रोजी सकाळी १० वाजता ग्रामपंचायत कार्यालयात ग्रामसभेचे आयोजन करण्यात आले आहे. सर्वांनी उपस्थित राहावे.', date: new Date() },
            { title: 'पाणीपुरवठा योजनेचे उद्घाटन', content: 'मुख्यमंत्री पेयजल योजनेअंतर्गत नवीन पाणीपुरवठा योजनेचे उद्घाटन येत्या रविवारी करण्यात येणार आहे.', date: new Date() },
            { title: 'स्वच्छता अभियान यशस्वी', content: 'गावात राबविण्यात आलेले स्वच्छता अभियान अत्यंत यशस्वी झाले असून संपूर्ण परिसरात स्वच्छता राखली जात आहे.', date: new Date() }
        ];
        await News.insertMany(newsItems);
        console.log('News items seeded.');

        // 4. Projects
        const projectsItems = [
            { title: 'ग्राम रस्ता काँक्रिटीकरण', description: 'मुख्य रस्ता ते शाळा परिसरापर्यंत काँक्रिटीकरणाचे काम सुरू आहे.', status: 'Ongoing', budget: '५,००,०००' },
            { title: 'पाणी टाकी बांधकाम', description: 'गावासाठी नवीन १ लाख लिटर क्षमतेच्या पाणी टाकीचे बांधकाम पूर्ण झाले आहे.', status: 'Completed', budget: '८,५०,०००' },
            { title: 'शाळा दुरुस्ती प्रकल्प', description: 'जिल्हा परिषद शाळेच्या इमारतीची दुरुस्ती आणि रंगकाम प्रस्तावित आहे.', status: 'Upcoming', budget: '२,००,०००' }
        ];
        await Project.insertMany(projectsItems);
        console.log('Projects items seeded.');

        // 5. Schemes
        const schemesItems = [
            { title: 'प्रधानमंत्री आवास योजना', description: 'घरकुल योजनेअंतर्गत लाभार्थ्यांना घर बांधणीसाठी अर्थसाहाय्य दिले जाते.', category: 'Social', eligibility: 'बीपीएल लाभार्थी' },
            { title: 'जल जीवन मिशन', description: 'प्रत्येक घराला नळाद्वारे शुद्ध पाणीपुरवठा करण्याचे उद्दिष्ट.', category: 'Infrastructure', eligibility: 'सर्व नागरिक' },
            { title: 'स्वच्छ भारत अभियान', description: 'गाव हागणदारी मुक्त करण्यासाठी शौचालय बांधणीसाठी प्रोत्साहन आणि अनुदान.', category: 'Health', eligibility: 'सर्व कुटुंब' }
        ];
        await Scheme.insertMany(schemesItems);
        console.log('Schemes items seeded.');

        // 6. Staff
        const staffItems = [
            { name: 'श्री. संपतराव गायकवाड', designation: 'सरपंच', phone: '१२३४५६७८९०' },
            { name: 'श्रीमती सुलोचना ताई', designation: 'उपसरपंच', phone: '९८७६५४३२१०' },
            { name: 'श्री. विकास पाटील', designation: 'ग्रामसेवक', phone: '४४५५६६७७८८' },
            { name: 'श्री. दत्तात्रय माने', designation: 'सदस्य', phone: '११२२३३४४५५' }
        ];
        await Staff.insertMany(staffItems);
        console.log('Staff items seeded.');

        // 7. Notices
        const noticesItems = [
            { title: 'महत्वाची सूचना', description: 'आधार कार्ड बँक खात्याशी लिंक करणे अनिवार्य आहे.', isScrolling: true },
            { title: 'पाणी कपात', description: 'उद्या देखभाल दुरुस्तीसाठी पाणी पुरवठा बंद राहील.', isScrolling: true },
            { title: 'लसीकरण मोहीम', description: 'आरोग्य केंद्रात पल्स पोलिओ मोहीम राबवण्यात येणार आहे.', isScrolling: true }
        ];
        await Notice.insertMany(noticesItems);
        console.log('Notices seeded.');

        // 8. Gallery
        const galleryItems = [
            { title: 'ग्रामसभा', category: 'Events', image: '/uploads/gallery/gm1.jpg' },
            { title: 'उत्सव', category: 'Festivals', image: '/uploads/gallery/fe1.jpg' },
            { title: 'विकास कामे', category: 'Development', image: '/uploads/gallery/dv1.jpg' },
            { title: 'स्वच्छता अभियान', category: 'Activity', image: '/uploads/gallery/sw1.jpg' }
        ];
        await Gallery.insertMany(galleryItems);
        console.log('Gallery seeded.');

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
