
export interface User {
    id: string;
    name: string;
    avatar: string; // URL
    role?: "Student" | "Alumni" | "Staff";
}

export interface Comment {
    id: string;
    user: User;
    content: string;
    timestamp: string;
}

export interface Post {
    id: string;
    user: User;
    type: "image" | "video";
    mediaUrl: string;
    content: string; // Caption
    likes: number;
    comments: Comment[];
    timestamp: string;
    isLiked?: boolean; // For local state simulation
    location?: string;
}

export interface Thread {
    id: string;
    title: string;
    content: string;
    author: User;
    category: "General" | "Confessions" | "Lost & Found" | "Academic";
    upvotes: number;
    commentCount: number;
    timestamp: string;
    isUpvoted?: boolean;
}

export interface Capsule {
    id: string;
    title: string;
    description: string;
    unlockDate: string; // ISO string
    createdAt: string;
    isLocked: boolean;
    coverImage?: string;
    content?: string; // Text content
}
