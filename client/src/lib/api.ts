import axios from "axios";
import { NYTimesApiResponse, Article } from "./types";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;
const BASE_URL = "https://api.nytimes.com/svc/topstories/v2";

export const fetchArticles = async (section: string = "home"): Promise<Article[]> => {
  try {
    const response = await axios.get<NYTimesApiResponse>(
      `${BASE_URL}/${section}.json`,
      {
        params: {
          "api-key": API_KEY,
        },
      }
    );
    
    return response.data.results;
  } catch (error) {
    console.error("Error fetching NYT articles:", error);
    throw error;
  }
};

export const getSections = () => [
  { id: "home", name: "Home" },
  { id: "world", name: "World" },
  { id: "us", name: "U.S." },
  { id: "politics", name: "Politics" },
  { id: "nyregion", name: "N.Y." },
  { id: "business", name: "Business" },
  { id: "opinion", name: "Opinion" },
  { id: "science", name: "Science" },
  { id: "health", name: "Health" },
  { id: "sports", name: "Sports" },
  { id: "arts", name: "Arts" },
  { id: "books", name: "Books" },
  { id: "style", name: "Style" },
  { id: "food", name: "Food" },
  { id: "travel", name: "Travel" },
];

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (differenceInSeconds < 60) {
    return `${differenceInSeconds}s ago`;
  }
  
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m ago`;
  }
  
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours}h ago`;
  }
  
  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays === 1) {
    return "Yesterday";
  }
  
  return `${differenceInDays}d ago`;
};
