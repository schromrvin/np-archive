export interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number; // 0-based
}

export interface HuntStage {
    id: string;
    title: string;
    clue: string;
    locationName: string;
    quiz: QuizQuestion;
    points: number;
}

export const HUNT_DATA: HuntStage[] = [
    {
        id: "stage-1",
        title: "The Beginning of Knowledge",
        clue: "Where books unite and knowledge flows, look for the lion where the river goes.",
        locationName: "Lien Ying Chow Library",
        points: 100,
        quiz: {
            question: "In what year was the Lien Ying Chow Library officially opened?",
            options: ["1988", "1995", "1998", "2001"],
            correctIndex: 2
        }
    },
    {
        id: "stage-2",
        title: "Technology's Heart",
        clue: "I have many windows but no house. I compute but have no brain. Find the block where IT reigns.",
        locationName: "Block 27 - School of InfoComm Tech",
        points: 150,
        quiz: {
            question: "Which of these is a diploma offered by the School of ICT?",
            options: ["Diploma in Accounting", "Diploma in Immersive Media", "Diploma in Nursing", "Diploma in Applied Chemistry"],
            correctIndex: 1
        }
    },
    {
        id: "stage-3",
        title: "The Historical Center",
        clue: "A plaza of red, a gathering space. The heartbeat of campus, the central place.",
        locationName: "Makan Place / Atrium",
        points: 120,
        quiz: {
            question: "What is the nickname often used for the central gathering area near Makan Place?",
            options: ["The Red Square", "The Atrium", "The Hub", "The Core"],
            correctIndex: 1
        }
    },
    {
        id: "stage-4",
        title: "Engineering Feats",
        clue: "Gears and circuits, metal and code. Where the builders of tomorrow unload.",
        locationName: "Block 58 - School of Engineering",
        points: 130,
        quiz: {
            question: "Ngee Ann Polytechnic was founded in which year?",
            options: ["1953", "1963", "1973", "1983"],
            correctIndex: 1
        }
    },
    {
        id: "stage-5",
        title: "Final Destination",
        clue: "A capsule of time, a memory keeper. Return to where you started, but deeper.",
        locationName: "NP Archive Center",
        points: 200,
        quiz: {
            question: "What is the primary goal of the NP Archive?",
            options: ["To store old exams", "Preserving Memories, Celebrating History", "To sell textbooks", "To organize events"],
            correctIndex: 1
        }
    }
];
