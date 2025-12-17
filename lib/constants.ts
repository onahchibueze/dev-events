// lib/constants.ts
export type EventItem = {
  image: string;
  title: string;

  slug: string;
  location: string;
  date: string;
  time: string;
};
export const events: EventItem[] = [
  {
    title: "Google I/O 2024",
    image: "/images/event1.png",
    slug: "google-io-2024",
    location: "Mountain View, CA",
    date: "May 15-17, 2024",
    time: "9:00 AM - 5:00 PM",
  },
  {
    title: "Microsoft Build 2024",
    image: "/images/event2.png",
    slug: "microsoft-build-2024",
    location: "Seattle, WA",
    date: "May 20-22, 2024",
    time: "8:30 AM - 6:00 PM",
  },
  {
    title: "React Conf 2024",
    image: "/images/event2.png",
    slug: "react-conf-2024",
    location: "San Francisco, CA",
    date: "June 5-7, 2024",
    time: "10:00 AM - 4:30 PM",
  },
  {
    title: "HackMIT 2024",
    image: "/images/event2.png",
    slug: "hackmit-2024",
    location: "Cambridge, MA",
    date: "June 14-16, 2024",
    time: "12:00 PM - 12:00 AM",
  },

  {
    title: "DevOps Days 2024",
    image: "/images/event3.png",
    slug: "devops-days-2024",
    location: "New York, NY",
    date: "April 25-26, 2024",
    time: "9:00 AM - 5:00 PM",
  },
  {
    title: "Node.js Interactive 2024",
    image: "/images/event4.png",
    slug: "nodejs-interactive-2024",
    location: "Austin, TX",
    date: "July 10-12, 2024",
    time: "10:00 AM - 5:00 PM",
  },
  {
    title: "Women in Tech Summit 2024",
    image: "/images/event5.png",
    slug: "women-in-tech-summit-2024",
    location: "Online",
    date: "August 15-17, 2024",
    time: "11:00 AM - 4:00 PM",
  },
  {
    title: "TechCrunch Disrupt 2024",
    image: "/images/event6.png",
    slug: "techcrunch-disrupt-2024",
    location: "San Francisco, CA",
    date: "September 3-5, 2024",
    time: "9:00 AM - 6:00 PM",
  },
];
