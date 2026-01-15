export interface StudySpot{
    name: string;
    occupancy: number;
    quiet:boolean;
    chargingPorts: boolean;
    wifi:string;
    location: string;
    images: string[];
}

export interface FoodSpots{
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
    location: string;
    images: string[];
}

export interface Places{
    id: string;
    name: string;
    currentUse: string;
    yearBuilt: string;
    yearNow:string;
    funFact:string;
    pastImage: string;
    presentImage: string;
    story: {past:string, present:string};
    facilities: string[]; 
}

export interface LiveData {
    studySpots: StudySpot[];
    foodSpots: FoodSpots[];
    facilities: Facility[];
}

export type TabId = "now" | "map" | "facilities" | "discover";