import { getTodayDate } from "../utils/utils";
import { query, collection, where, orderBy, limit, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";
import getTime from "../utils/timerUtils"

export default function useGetDailyStats(resultLimit : number) {
    function getLeaderboardData() {
        const targetDate = getTodayDate(); 
    
        const q = query(
        collection(db, "completedPuzzlesStats", targetDate, 'scores'),
        where("date", "==", targetDate),
        orderBy("elapsedTime", 'asc'),
        limit(resultLimit)
        );
    
        return getDocs(q)
        .then((querySnapshot) => {
            const top10FastestTimes: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
            top10FastestTimes.push(doc.data());
            });
            
            console.log("top10FastestTimes: ", top10FastestTimes);
            return top10FastestTimes.map((data, index) => ({
                rank: index + 1, 
                username: data.username, 
                time: getTime(data.elapsedTime), 
            }));
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
            return [];
        });
    }
    return { getLeaderboardData };
}