const Setting = require('./models/setting');
const News = require('./models/news');
const Project = require('./models/project');
const Scheme = require('./models/scheme');
const Staff = require('./models/staff');
const Notice = require('./models/notice');
const Gallery = require('./models/gallery');
const User = require('./models/user');
const TouristPlace = require('./models/touristPlace');
const VillageInfo = require('./models/villageInfo');

const seedAllData = async () => {
    try {
        // 1. Create Admin User
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            await User.create({
                username: 'admin',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Admin user created (admin/admin123)');
        }

        // 2. Configure Panchayat Information
        const settingCount = await Setting.countDocuments();
        if (settingCount === 0) {
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
                logoUrl: '/uploads/1773642461808.webp',
                heroImages: [
                    '/uploads/2.jpg',
                    '/uploads/5.jpg',
                    '/uploads/1773642391332.jpg',
                    '/uploads/4.jpg'
                ],
                googleMapUrl: 'https://maps.google.com'
            });
            console.log('Panchayat settings seeded with custom logo and images.');
        }

        // 3. News
        if (await News.countDocuments() === 0) {
            await News.insertMany([
                { title: 'ग्रामसभा दिनांक २८ मार्च रोजी आयोजित', content: 'गावातील सर्व नागरिकांना सूचित करण्यात येते की बुधवार दि. २८ मार्च रोजी सकाळी १० वाजता ग्रामपंचायत कार्यालयात ग्रामसभेचे आयोजन करण्यात आले आहे.', date: new Date() },
                { title: 'पाणीपुरवठा योजनेचे उद्घाटन', content: 'मुख्यमंत्री पेयजल योजनेअंतर्गत नवीन पाणीपुरवठा योजनेचे उद्घाटन येत्या रविवारी करण्यात येणार आहे.', date: new Date() }
            ]);
            console.log('News items seeded.');
        }

        // 4. Projects
        if (await Project.countDocuments() === 0) {
            await Project.insertMany([
                { title: 'ग्राम रस्ता काँक्रिटीकरण', description: 'मुख्य रस्ता ते शाळा परिसरापर्यंत काँक्रिटीकरणाचे काम सुरू आहे.', status: 'ongoing', budget: '५,००,०००' },
                { title: 'पाणी टाकी बांधकाम', description: 'गावासाठी नवीन १ लाख लिटर क्षमतेच्या पाणी टाकीचे बांधकाम पूर्ण झाले आहे.', status: 'completed', budget: '८,५०,०००' }
            ]);
            console.log('Projects items seeded.');
        }

        // 5. Staff
        if (await Staff.countDocuments() === 0) {
            await Staff.insertMany([
                { name: 'श्रीकृष्ण विश्वनाथ तराळे', designation: 'सरपंच', phone: '9763288945', type: 'member', photoUrl: '/uploads/1773642461808.webp' },
                { name: 'गीता किशन काळे', designation: 'उपसरपंच', phone: 'उपलब्ध नाही', type: 'member', photoUrl: '/uploads/5.jpg' },
                { name: 'सुरेश आनंदा वानखडे', designation: 'ग्रामसेवक', phone: '8459295960', type: 'staff', photoUrl: '/uploads/2.jpg' },
                { name: 'बळीराम वासुदेव उंबरकर', designation: 'सदस्य', phone: 'उपलब्ध नाही', type: 'member' },
                { name: 'अंजनाबाई हरिभाऊ बारेंगे', designation: 'सदस्य', phone: 'उपलब्ध नाही', type: 'member' },
                { name: 'रामदास श्रीराम बोंद्रे', designation: 'सदस्य', phone: 'उपलब्ध नाही', type: 'member' },
                { name: 'दुर्गा शिवाजी लोणकर', designation: 'सदस्य', phone: 'उपलब्ध नाही', type: 'member' },
                { name: 'रामदास मारुती श्रीनाथ', designation: 'सदस्य', phone: 'उपलब्ध नाही', type: 'member' },
                { name: 'हिरकन्या वसंत अजने', designation: 'सदस्य', phone: 'उपलब्ध नाही', type: 'member' },
                { name: 'प्रदीप कुमार दिवानसिंग परिहार', designation: 'सदस्य', phone: 'उपलब्ध नाही', type: 'member' }
            ]);
            console.log('Staff seeded with updated list and photos.');
        }

        // 6. Tourist Places
        if (await TouristPlace.countDocuments() === 0) {
            await TouristPlace.insertMany([
                {
                    name: 'हनुमान मंदिर',
                    description: 'गावातील प्राचीन आणि जागृत हनुमान मंदिर.',
                    history: 'हे मंदिर गेल्या १०० वर्षांपासून गावाचे श्रद्धास्थान आहे. दर शनिवारी येथे मोठी गर्दी असते.',
                    location: 'गावठाण, मुख्य चौक',
                    images: ['/uploads/1773642391332.jpg'],
                    mainImage: '/uploads/1773642391332.jpg'
                },
                {
                    name: 'ग्रामपंचायत भवन',
                    description: 'गावाच्या प्रशासकीय कार्याचे मुख्य केंद्र.',
                    history: 'नवीन डिजिटल ग्रामपंचायत भवन सर्व सोयींनी युक्त आहे.',
                    location: 'बस स्थानकाजवळ',
                    images: ['/uploads/2.jpg'],
                    mainImage: '/uploads/2.jpg'
                },
                {
                    name: 'शिव मंदिर',
                    description: 'शांत आणि निसर्गरम्य परिसरातील शिव मंदिर.',
                    history: 'महाशिवरात्रीला येथे मोठा उत्सव साजरा केला जातो.',
                    location: 'नदीकाठी',
                    images: ['/uploads/4.jpg'],
                    mainImage: '/uploads/4.jpg'
                },
                {
                    name: 'गाव तलाव',
                    description: 'गावाच्या सौंदर्यात भर घालणारा विस्तीर्ण तलाव.',
                    history: 'तलावाचे सुशोभीकरण करून येथे पर्यटन स्थळ विकसित केले आहे.',
                    location: 'गावाच्या पश्चिमेस',
                    images: ['/uploads/5.jpg'],
                    mainImage: '/uploads/5.jpg'
                },
                {
                    name: 'प्राचीन वडाचे झाड',
                    description: 'गावातील ऐतिहासिक आणि सर्वात जुने वडाचे झाड.',
                    history: 'हे झाड सुमारे १५० वर्ष जुने असल्याचे मानले जाते.',
                    location: 'जुनी चावडी',
                    images: ['/uploads/1773642391332.jpg'],
                    mainImage: '/uploads/1773642391332.jpg'
                }
            ]);
            console.log('Tourist places seeded.');
        }

        // 7. Village Info
        if (await VillageInfo.countDocuments() === 0) {
            await VillageInfo.insertMany([
                {
                    slug: 'shaharavishayi',
                    title: 'शहराविषयी',
                    description: 'गावाचा इतिहास आणि भूगोल.',
                    content: 'भोन हे गाव छत्रपती संभाजीनगर जिल्ह्यातील फुलंब्री तालुक्यातील एक महत्त्वाचे गाव आहे. या गावाला मोठा ऐतिहासिक वारसा लाभला आहे. गावाची लोकसंख्या सुमारे ५,४०० असून मुख्य व्यवसाय शेती आहे.',
                    mainImage: '/uploads/1773642391332.jpg'
                },
                {
                    slug: 'natyagruh-kala-dalan',
                    title: 'नाट्यगृह आणि कला दालन',
                    description: 'सांस्कृतिक आणि कला केंद्र.',
                    content: 'गावातील सांस्कृतिक चळवळ जिवंत ठेवण्यासाठी भव्य नाट्यगृह आणि कला दालन उभारण्यात आले आहे. येथे विविध नाटके आणि कला प्रदर्शने भरवली जातात.',
                    mainImage: '/uploads/2.jpg'
                },
                {
                    slug: 'udyane',
                    title: 'उद्यान',
                    description: 'विश्रांतीसाठी उत्तम जागा.',
                    content: 'बालकांसाठी खेळण्यासाठी आणि वृद्धांना फिरण्यासाठी गावात निसर्गरम्य उद्याने विकसित करण्यात आली आहेत. येथे हिरवळ आणि बसण्यासाठी मोठी जागा आहे.',
                    mainImage: '/uploads/4.jpg'
                },
                {
                    slug: 'preshaniya-thikane',
                    title: 'प्रेक्षणीय ठिकाणे',
                    description: 'पर्यटनसाठी महत्त्वाची स्थळे.',
                    content: 'गावाच्या परिसरात अनेक पाहण्यासारखी ठिकाणे आहेत. यामध्ये प्राचीन मंदिरे, ऐतिहासिक वाडे आणि नैसर्गिक पर्यटन स्थळांचा समावेश होतो.',
                    mainImage: '/uploads/5.jpg'
                }
            ]);
            console.log('Village info seeded.');
        }

        console.log('Database auto-seeding completed.');
    } catch (err) {
        console.error('Error in auto-seeding:', err);
    }
};

module.exports = seedAllData;
