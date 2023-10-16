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

            <section className="bg-white dark:bg-gray-900 h-full">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Verblox</h1>
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">A Daily Word Puzzle Game</h2>
                    <p className="mb-8 text-lg text-center font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Fill the block with letters to form words in each row and column</p>
                    <div className="flex flex-col space-y-4 sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Button label="Play Now!" handleClick={() => navigate('/play')} />
                        <div className='py-6'>
                            <Link to="login">Log in</Link> or <Link to="register">Sign up</Link> to save your scores!
                        </div> 
                        <ShareButtons />
                    </div>
                </div>
            </section>
        }
        </>
    )
}