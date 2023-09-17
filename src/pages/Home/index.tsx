import './Home.css';
// import { useEffect, useState } from 'react';
// import useGetDailyStats from '../../hooks/useGetDailyStats';
// import LeaderboardTable from '../../components/LeaderboardTable';
import Button from '../../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import ShareButtons from '../../components/ShareButtons';

// interface LeaderboardRow {
//     rank: number;
//     username: string;
//     time: string;
//   }

export default function Home() {
    // const [rows, setRows] = useState<LeaderboardRow[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const { getLeaderboardData } = useGetDailyStats(5);
    const navigate = useNavigate();
    const isLoading = false;
  
    // useEffect(() => {
    //   getLeaderboardData()
    //   .then(data => setRows(data as LeaderboardRow[]))
    //   .then(() => setIsLoading(false));
    // }, []);

    return (
        <>
        { !isLoading && 
            <div className="container">
                <h1>Verblox</h1>
                <h2>Fill the block with letters to form words in each row and column</h2>
                <Button label="Play Now!" handleClick={() => navigate('/play')}/>

                <h3><Link to="login">Log in</Link> or <Link to="register">Sign up</Link> to save your scores!</h3>

                <ShareButtons />
{/*     
                <h2>Current High Scores</h2>
                <LeaderboardTable rows={rows} />
                <Button label="View Full Leaderboard" handleClick={() => navigate("/leaderboard")} />
    
                <div className="auth-buttons">
                    <div>
                        <button id="btn-signup">Sign Up</button>
                        <h3>Or</h3>
                        <button id="btn-login">Log In</button>
                    </div>
                    <h3>To save you scores!</h3>
                </div>
                <div id="share-buttons">
                    <a href="#" id="btn-share-fb"><i className="fab fa-facebook"></i> Share on Facebook</a>
                    <a href="#" id="btn-share-tw"><i className="fab fa-twitter"></i> Share on Twitter</a>
                    <a href="#" id="btn-share-li"><i className="fab fa-linkedin"></i> Share on LinkedIn</a>
                </div> */}
            </div>
        }
        </>
    )
}