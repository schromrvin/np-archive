
import type { Post, Thread, Capsule } from "./types";

export const MOCK_POSTS: Post[] = [
    {
        id: "1",
        user: {
            id: "u1",
            name: "NP Photography Club",
            avatar: "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=200&auto=format&fit=crop",
            role: "Student",
        },
        type: "image",
        mediaUrl: "https://www.np.edu.sg/images/default-source/about-np-2/facilities/atrium.jpg?sfvrsn=57267937_2?q=80&w=800&auto=format&fit=crop",
        content: "Golden hour at the Atrium! 🌅 Who remembers rushing purely for the free popcorn? #NgeeAnnPoly #CampusLife #Sunset",
        likes: 245,
        comments: [],
        timestamp: "2 hours ago",
        location: "The Atrium",
    },
    {
        id: "2",
        user: {
            id: "u2",
            name: "Jamie Lim",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
            role: "Alumni",
        },
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
        content: "Found this old gem from 2018! The old Makan Place layout was superior, fight me. 😤🍲 #Throwback #MakanPlace #Alumni",
        likes: 89,
        comments: [
            {
                id: "c1",
                user: { id: "u3", name: "Alex Tan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", role: "Alumni" },
                content: "Facts! The western stall was legendary.",
                timestamp: "1 hour ago"
            }
        ],
        timestamp: "5 hours ago",
        location: "Makan Place",
    },
    {
        id: "3",
        user: {
            id: "u4",
            name: "Red Camp 24",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RedCamp",
            role: "Student",
        },
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
        content: "READY FOR RED CAMP?! 🔥 The fierce spirit of the lions is awake! See you freshmen soon! ❤️🦁 #RedCamp #NgeeAnnPoly",
        likes: 512,
        comments: [],
        timestamp: "1 day ago",
        location: "Convention Centre",
    },
    {
        id: "4",
        user: {
            id: "u5",
            name: "Library Whisperer",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lib",
            role: "Student",
        },
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
        content: "Late night grinding at Lien Ying Chow Library. The silence is loud tonight. 📚☕ #FinalsSzn #StudyHard",
        likes: 120,
        comments: [],
        timestamp: "2 days ago",
        location: "Lien Ying Chow Library",
    }
];

export const MOCK_THREADS: Thread[] = [
    {
        id: "t1",
        title: "Best study spots with power plugs?",
        content: "I'm looking for a quiet place to study that has accessible power plugs. The library is always full! Any hidden gems?",
        author: { id: "u6", name: "SleepyStudent", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sleepy", role: "Student" },
        category: "Academic",
        upvotes: 45,
        commentCount: 12,
        timestamp: "3 hours ago"
    },
    {
        id: "t2",
        title: "Lost AirPods Case at Block 51",
        content: "Hi everyone, I lost my AirPods case (with a Pikachu cover) at Block 51 L4 lecture theatre. Please DM if found!",
        author: { id: "u7", name: "ClumsyOne", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Clumsy", role: "Student" },
        category: "Lost & Found",
        upvotes: 120,
        commentCount: 3,
        timestamp: "6 hours ago"
    },
    {
        id: "t3",
        title: "Confession: I actually miss HBL",
        content: "Unpopular opinion but waking up 5 mins before class was a vibe. Commuting takes so much energy 😭",
        author: { id: "u8", name: "Anon123", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anon", role: "Alumni" },
        category: "Confessions",
        upvotes: 890,
        commentCount: 56,
        timestamp: "1 day ago"
    }
];

export const MOCK_CAPSULES: Capsule[] = [
    {
        id: "c1",
        title: "My Freshman Hopes",
        description: "A letter to my future self about what I hope to achieve in NP.",
        unlockDate: "2026-04-15",
        createdAt: "2023-04-15",
        isLocked: true,
        coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "c2",
        title: "First Day of Y3",
        description: "Photos and thoughts from the start of my final year.",
        unlockDate: "2023-12-01",
        createdAt: "2023-04-16",
        isLocked: false,
        coverImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
        content: "Today was actually pretty fun! Met up with the gang at Munch. Can't believe it's the last year already."
    },
    {
        id: "c3",
        title: "Graduation Goals",
        description: "Notes on where I want to be when I graduate.",
        unlockDate: "2027-04-20",
        createdAt: "2024-01-10",
        isLocked: true,
        coverImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop"
    }
];
