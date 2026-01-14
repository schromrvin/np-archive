import { bool, string } from "joi";
import type { S } from "node_modules/framer-motion/dist/types.d-DagZKalS";

export interface StudySpot{
    name: string;
    occupancy: number;
    quiet:boolean;
    chargingPorts: boolean;
    wifi:string;
    location: string;
    images: string[];
}

export interface Canteen{
    name: string;
    crowdLevel: "Low" | "Medium" | "High";
    waitTime: string;
    peakHours: string;
    popular: string;
    images: string[];
}

export interface Facility{
    name: string;
    status: "Open" | "Closed";
    closes: string;
    crowdLevel: "Low" | "Medium" | "High";
    location: string;
    images: string[];
}

export interface Building{
    id: string;
    name: string;
    currentUse: string;
    yearBuilt: number;
    yearNow:string;
    funFact:string;
    historicalImage: string;
    currentImage: string;
    story: {past:string, present:string};
    facts: string[];
    facilities: string[]; 
}

export interface LiveData {
    studySpots: StudySpot[];
    canteens: Canteen[];
    facilities: Facility[];
}

export type TabId = "now" | "map" | "facilities" | "discover";