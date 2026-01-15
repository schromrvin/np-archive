import type { LiveData } from "../types";

export const liveDataMock: LiveData = {
  studySpots: [
    { name: "NPCC Basement", occupancy: 45, quiet: false, chargingPorts: true, wifi: "Good", location: "NPCC B1 (Linkway to Business Block)", images: [] },
    { name: "Block 56 Study Pods Level 5", occupancy: 40, quiet: true, chargingPorts: true, wifi: "Excellent", location: "Block 56", images: [] },
    { name: "OurSpace@72", occupancy: 40, quiet: true, chargingPorts: true, wifi: "Excellent", location: "Block 72", images: [] },
    { name: "Atrium", occupancy: 50, quiet: false, chargingPorts: true, wifi: "Good", location: "Block 1", images: [] },
  ],
  foodSpots: [
    { name: "Foodclub", crowdLevel: "High", waitTime: "15-20 min", peakHours: "12pm-1pm", popular: "🍗 Chicken Rice, 🍔 Western", images:[]},
    { name: "Munch", crowdLevel: "Medium", waitTime: "5-10 min", peakHours: "12pm-1pm", popular: "🥘 Korean, 🍛 Claypot", images:[] },
    { name: "Makan Place", crowdLevel: "Low", waitTime: "5 min", peakHours: "1pm-2pm", popular: "🍲 Mala, 🐠 Ban Mian Fish Soup", images:[] },
  ],
  facilities: [
    { name: "GymWerkz", status: "Open", closes: "9:00 PM", location: "Sports Complex, Block 16, Level 2", images:[]},
    { name: "Maker's Academy", status: "Open", closes: "6:00 PM", location: "Block 56, Level 1", images:[] },
    { name: "The Ngee Ann Shop", status: "Closed", closes: "5:00 PM", location: "Block 58, Level 1", images:[] },
    { name: "Gen AI Hub", status: "Open", closes: "6:00 PM", location: "School of ICT", images:[] },
  ],
};
