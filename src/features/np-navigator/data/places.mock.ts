import type { Places } from "../types";

const imagePath = import.meta.env.BASE_URL + "/public/assets/places";

export const placesMock: Record<string, Places> = {
    "block 73":{
        id: "block 73",
        name: "Block 73",
        currentUse: "Houses lecture halls and classrooms, and home to CCA clubrooms, studios and MusicBox.",
        yearBuilt: "Then",
        yearNow: "Now",
        funFact: "SBS Bus 74 used to stop right beside old Block 73, but it was discontinued in 2003 due to the opening of the new flyover",
        pastImage:`${imagePath}/block73-past.png`,
        presentImage: `${imagePath}/block73-present.png`,
        story: {past: "Block 73 was one of the original buildings in Ngee Ann Polytechnic, constructed in the early 1980s. It served as a central hub for various academic departments and student activities. The building's architecture reflected the design trends of that era, with its utilitarian style and emphasis on functionality.",
                present: "Today, Block 73 has been renovated to accommodate modern educational needs while preserving its historical significance. It now features state-of-the-art classrooms, lecture halls, and facilities for co-curricular activities. The building continues to be a vibrant part of campus life, hosting various events and serving as a gathering place for students."},
        facilities: ["Lecture Halls", "Classrooms", "CCA Clubrooms", "Studios", "MusicBox"]
    },

    "library":{
        id: "library",
        name: "Ngee Ann Polytechnic Library",
        currentUse: "A modern library with study spaces, computer labs, and a vast collection of books and digital resources.",
        yearBuilt: "Then",
        yearNow: "Now",
        funFact: "The library has a rooftop garden that provides a peaceful study environment for students.",
        pastImage:`${imagePath}/library-past.jpg`,
        presentImage: `${imagePath}/library-present.jpg`,
        story: {past: "The library was originally built in the 1980s as a simple structure with limited facilities. It served as the main repository for academic materials and provided basic study spaces.",
                present: "Today, the library has been transformed into a state-of-the-art facility with modern amenities, including quiet study areas, group workspaces, and advanced technology resources. It continues to be a vital part of the campus community."},
        facilities: ["Study Spaces", "Computer Labs", "Book Collection", "Digital Resources"]
    },

    "makan place":{
        id: "makan place",
        name: "Makan Place",
        currentUse: "Home to the School of Business & Accountancy, featuring lecture halls, seminar rooms, and faculty offices.",
        yearBuilt: "Then",
        yearNow: "Now",
        funFact:  "The famous Kaki Fuyong hotplate, a sizzling omelette dish loved by generations of NP students, first gained popularity from a humble stall in the old Canteen 1.",
        pastImage:`${imagePath}/makanplace-past.png`,
        presentImage: `${imagePath}/makanplace-present.jpg`,
        story: {
            past:
                "Before the modern Makan Place, this area was known as Canteen 1 — one of the most iconic makan spots in NP. It was a gathering point for generations of students, famous for affordable local dishes and long lunch queues. The legendary Kaki Fuyong hotplate omelette, served sizzling with gravy, originated from a stall here and became a campus classic remembered by alumni.",
            present:
                "Today, the space has evolved into Makan Place, a contemporary food court with air-conditioning and a wide variety of local and international stalls, from halal options to Western grills and desserts. It continues the tradition of being a social heart of the campus, where students eat, study, and unwind between classes.",
            },   

            facilities: ["Mala", "Good Luck Cafe", "Mexican Stall", "Halal Options"]  
    }
};