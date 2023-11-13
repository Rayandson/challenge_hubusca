import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../types";

const saveRecentSearch = async (user: UserData) => {
  try {
    let recentSearchesString = await AsyncStorage.getItem("recentSearches");
    let recentSearches: UserData[] = [];

    if (recentSearchesString) {
      recentSearches = JSON.parse(recentSearchesString);
    }

    const existingIndex = recentSearches.findIndex((element) => element.login === user.login);

    if (existingIndex !== -1) {
      recentSearches.splice(existingIndex, 1);
    }

    if (recentSearches.length >= 10) {
      recentSearches.pop();
    }

    recentSearches.unshift(user);

    await AsyncStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  } catch (error) {
    console.error("Error saving recent search:", error);
  }
};
  
  const getRecentSearches = async (): Promise<UserData[]> => {
    try {
      const recentSearches = await AsyncStorage.getItem("recentSearches");
  
      if (recentSearches) {
        return JSON.parse(recentSearches);
      }
  
      return [];
    } catch (error) {
      console.error("Error retrieving recent searches:", error);
      return [];
    }
  };

  export {saveRecentSearch, getRecentSearches};