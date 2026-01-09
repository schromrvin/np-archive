export type ChallengeType = 'quiz' | 'crossclimb';

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface QuizConfig {
    questions: QuizQuestion[];
}

export interface CrossclimbLevel {
    question: string;
    answer: string; // The word they must form
}

export interface CrossclimbConfig {
    steps: CrossclimbLevel[];
    ladderTheme: string; // e.g., "Technology"
    note?: string; // Optional instructions
}

export interface HuntStage {
    id: string;
    title: string;
    clue: string;
    // Removed "locationName" to hide hints from UI, but kept in data for internal reference.
    locationName: string;
    points: number;
    type: ChallengeType;
    quiz?: QuizConfig;
    crossclimb?: CrossclimbConfig;
}

// Helper to shuffle array
export function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

export const HUNT_DATA: HuntStage[] = [
    {
        id: "stage-1",
        title: "The Beginning of Knowledge",
        clue: "Where books unite and knowledge flows, look for the lion where the river goes.",
        locationName: "Lien Ying Chow Library",
        points: 100,
        type: 'quiz',
        quiz: {
            questions: [
                {
                    question: "In what year was Ngee Ann College officially inaugurated?",
                    options: ["1960", "1963", "1968", "1972"],
                    correctAnswer: "1963"
                },
                {
                    question: "Who inaugurated Ngee Ann College?",
                    options: ["Lee Kuan Yew", "Goh Keng Swee", "Toh Chin Chye", "Dr. Yi-Sheng Yu"],
                    correctAnswer: "Dr. Yi-Sheng Yu"
                },
                {
                    question: "Where was the first campus located?",
                    options: ["Clementi", "Tank Road", "Bukit Timah", "Jurong"],
                    correctAnswer: "Tank Road"
                }
            ]
        }
    },
    {
        id: "stage-2",
        title: "The Connective Tissue",
        clue: "I have many windows but no house. I compute but have no brain. Find the block where IT reigns.",
        locationName: "Block 27 - School of InfoComm Tech",
        points: 250,
        type: 'crossclimb',
        crossclimb: {
            ladderTheme: "Tech to Table",
            note: "Memorize these 4 answers. They have a double meaning for the next location!",
            steps: [
                { question: "Software users navigate this list of options. (e.g., Start ___).", answer: "MENU" },
                { question: "Since 1996, this 'coffee' language has been taught in ICT.", answer: "JAVA" },
                { question: "In databases, data is organized in rows and columns within a ___.", answer: "TABLE" },
                { question: "The Computer Centre houses this powerful network machine.", answer: "SERVER" }
            ]
        }
    },
    {
        id: "stage-3",
        title: "The Historical Center",
        clue: "Go to the campus social hub, a place of gathering and nourishment, filled with Menus, Tables, and Servers.",
        locationName: "Makan Place / Atrium",
        points: 150,
        type: 'quiz',
        quiz: {
            questions: [
                {
                    question: "What replaced 'The Octagon' in NP's Phase 5 redevelopment?",
                    options: ["The Atrium", "The Convention Centre", "Block 58", "Sports Complex"],
                    correctAnswer: "The Convention Centre"
                },
                {
                    question: "The Tembusu tree planted in 1988 marked which anniversary?",
                    options: ["10th", "20th", "25th", "50th"],
                    correctAnswer: "25th"
                },
                {
                    question: "In the 70s, what replaced Chinese as the sole medium of instruction?",
                    options: ["English", "Malay", "Tamil", "Teochew"],
                    correctAnswer: "English"
                }
            ]
        }
    }
];
