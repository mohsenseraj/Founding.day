document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([23.8859, 45.0792], 5.5); // تركيز على السعودية

    // إضافة خريطة أساسية
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // قائمة المناطق مع إحداثياتها ودبابيسها
    var regions = [
        {
            name: "الرياض",
            coordinates: [24.7136, 46.6753],
            year: "1902 - استعادة الرياض"
        },
        {
            name: "مكة المكرمة",
            coordinates: [21.3891, 39.8579],
            year: "1924 - توحيد الحجاز"
        },
        {
            name: "المدينة المنورة",
            coordinates: [24.5247, 39.5692],
            year: "1925 - ضم المدينة المنورة"
        },
        {
            name: "الأحساء",
            coordinates: [25.3833, 49.6000],
            year: "1913 - ضم الأحساء"
        },
        {
            name: "عسير",
            coordinates: [18.2164, 42.5053],
            year: "1930 - توحيد عسير"
        },
        {
            name: "نجران",
            coordinates: [17.5000, 44.0000],
            year: "1934 - ضم نجران"
        },
        {
            name: "جازان",
            coordinates: [16.8895, 42.5671],
            year: "1930 - ضم جازان"
        },
        {
            name: "الدمام",
            coordinates: [26.4207, 50.0888],
            year: "1932 - تأسيس المملكة"
        }
    ];

    // إضافة دبابيس لكل منطقة على الخريطة
    regions.forEach(region => {
        L.marker(region.coordinates, { title: region.name }) // إضافة اسم عند تمرير الماوس
            .addTo(map)
            .bindPopup(`<b>${region.name}</b><br>📅 ${region.year}`);
    });

    // الرياض كنقطة انطلاق
    var riyadhCoordinates = [24.7136, 46.6753];

    // إضافة أسهم اتجاهية من الرياض إلى باقي المناطق
    regions.forEach(region => {
        if (region.name !== "الرياض") {
            var arrow = L.polyline([riyadhCoordinates, region.coordinates], {
                color: "#FF5733", // لون السهم
                weight: 3, // سمك الخط
                opacity: 0.8, // شفافية السهم
                dashArray: "5, 10" // نمط الخط المتقطع لجعله يبدو كأنه سهم
            }).addTo(map);

            // إضافة علامة سهم عند منتصف الطريق
            var midPoint = [
                (riyadhCoordinates[0] + region.coordinates[0]) / 2,
                (riyadhCoordinates[1] + region.coordinates[1]) / 2
            ];

            L.marker(midPoint, {
                icon: L.divIcon({
                    className: "arrow-icon",
                    html: "➡️",
                    iconSize: [20, 20]
                })
            }).addTo(map);
        }
    });
});


// 🏆 القصة التاريخية بأسلوب احترافي مع تحسين الأنيميشن
const storyEvents = [
    { text: "📜 المقدمة: الملك عبدالعزيز يوحد الجزيرة العربية ويؤسس دولة على مبادئ الإسلام.", img: "intro.jpg" },
    { text: "🏰 1744: الإمام محمد بن سعود والشيخ محمد بن عبدالوهاب يؤسسان الدولة السعودية الأولى في الدرعية.", img: "diriyah.jpg" },
    { text: "⚔️ 1818: الدولة العثمانية تدمر الدرعية، وتنهار الدولة السعودية الأولى.", img: "ottomans.jpg" },
    { text: "🔥 1824: الإمام تركي بن عبدالله يعيد بناء الدولة السعودية الثانية ويتخذ الرياض عاصمة لها.", img: "turki.jpg" },
    { text: "🤺 1891: آل رشيد يسيطرون على نجد، وآل سعود يغادرون الرياض إلى الكويت.", img: "rashid.jpg" },
    { text: "⚡ 1902: الملك عبدالعزيز يستعيد الرياض في معركة المصمك، ويبدأ توحيد البلاد.", img: "masmak.jpg" },
    { text: "🏆 1913: ضم الأحساء والقطيف من العثمانيين، وتوسيع النفوذ السعودي.", img: "ahsa.jpg" },
    { text: "🕋 1924: السيطرة على مكة والمدينة بعد سقوط حكم الشريف حسين.", img: "makkah.jpg" },
    { text: "🌍 1932: إعلان المملكة العربية السعودية وتوحيد جميع المناطق تحت راية واحدة.", img: "kingdom.jpg" },
    { text: "⛽ 1938: اكتشاف النفط، مما يحول السعودية إلى قوة اقتصادية كبرى.", img: "oil.jpg" },
    { text: "🏰 الاحتفال بتأسيس المملكة العربية السعودية سنويًا تخليدًا لإعلان توحيدها عام 1932", img: "national-day.jpg" }
];

let currentEvent = 0;

// دالة تحديث القصة والصورة عند الضغط على الأزرار
function updateStory() {
    const storyText = document.getElementById("story-text");
    const storyImage = document.getElementById("story-image");

    // إضافة تأثيرات الحركة
    storyText.classList.add("fade-out");
    storyImage.classList.add("fade-out");

    setTimeout(() => {
        // تحديث النص والصورة
        storyText.innerHTML = `<span class="highlight">${storyEvents[currentEvent].text}</span>`;
        storyImage.src = `static/images/${storyEvents[currentEvent].img}`;

        // إزالة تأثيرات الحركة وإضافة الظهور
        storyText.classList.remove("fade-out");
        storyText.classList.add("fade-in");
        storyImage.classList.remove("fade-out");
        storyImage.classList.add("fade-in");
    }, 500);
}

// دالة "التالي"
function nextStory() {
    if (currentEvent < storyEvents.length - 1) {
        currentEvent++;
        updateStory();
    } else {
        document.getElementById("story-text").innerHTML = "🎉 انتهت القصة! السعودية العظمى تبدأ هنا.";
    }
}

// دالة "السابق"
function prevStory() {
    if (currentEvent > 0) {
        currentEvent--;
        updateStory();
    }
}
