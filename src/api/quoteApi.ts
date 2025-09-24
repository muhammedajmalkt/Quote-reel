import { mockQuotes } from "@/app/utils/quotes";
import axios from "axios";

export async function fetchRandomQuote() {
  try {
    const { data } = await axios.get("https://recite.onrender.com/api/v1/random");
    console.log(data);
    return Array.isArray(data) ? data : [data]; 
  } catch (error) {
    console.error("Failed to fetch random quote:", error);
    return mockQuotes; 
  }
}

//  multiple 
export async function fetchMoreQuotes(count = 5) {
  try {
    const promises = Array.from({ length: count }, () => axios.get("https://recite.onrender.com/api/v1/random"));
    const results = await Promise.all(promises);
    return results.map((res) => res.data);
  } catch (error) {
    console.error("Failed to fetch multiple quotes:", error);
    return mockQuotes;
  }
}
