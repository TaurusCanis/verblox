import LeaderboardTable from '../../components/LeaderboardTable';
import ShareButtons from '../../components/ShareButtons';
import './Leaderboard.css';
import { useAuth } from "../../contexts/AuthContext";  
import { useEffect, useState } from "react";
import useGetDailyStats from '../../hooks/useGetDailyStats';

interface LeaderboardRow {
    rank: number;
    username: string;
    time: string;
  }

// function getLeaderboardData() {
//     const targetDate = getTodayDate(); 

//     const q = query(
//     collection(db, "completedPuzzlesStats", targetDate, 'scores'),
//     where("date", "==", targetDate),
//     orderBy("elapsedTime", 'asc'),
//     limit(10)
//     );

//     return getDocs(q)
//     .then((querySnapshot) => {
//         const top10FastestTimes: DocumentData[] = [];
//         querySnapshot.forEach((doc) => {
//         top10FastestTimes.push(doc.data());
//         });
        
//         console.log("top10FastestTimes: ", top10FastestTimes);
//         return top10FastestTimes.map((data, index) => ({
//             rank: index + 1, 
//             username: data.username, 
//             time: getTime(data.elapsedTime), 
//         })) as LeaderboardRow[];
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//         return [] as LeaderboardRow[];
//     });
// }

/**
 * Main component to display the leaderboard.
 *
 * @returns {JSX.Element} The leaderboard page.
 */
function Leaderboard(): JSX.Element {
  const rank = null; 
  const [rows, setRows] = useState<LeaderboardRow[]>([]);  
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { getLeaderboardData } = useGetDailyStats(10);

  useEffect(() => {
    getLeaderboardData()
    .then(data => setRows(data as LeaderboardRow[]))
    .then(() => setIsLoading(false));
  }, []);

  return (
    <>
    { !isLoading &&
    <div>
      <h1>Leaderboard - Today's Top 10</h1>
      <div id="user-position">
        {rank ? `Your Rank: ${rank}` : null}
      </div>
      {
        !user || user.isAnonymous &&
        <div id="auth-buttons">
            <button id="btn-login">Log In</button>
            <button id="btn-signup">Sign Up</button>
        </div>
      }
      <LeaderboardTable rows={rows} />
      <ShareButtons />
    </div>
    }
    </>
  );
}

export default Leaderboard;
