
interface LeaderboardRow {
  rank: number;
  username: string;
  time: string;
}

interface LeaderboardTableProps {
  rows: LeaderboardRow[];
}

/**
 * Component to display the leaderboard table.
 *
 * @param {LeaderboardTableProps} props - Props for the LeaderboardTable component.
 * @returns {JSX.Element} Leaderboard table.
 */
function LeaderboardTable({ rows }: LeaderboardTableProps): JSX.Element {
  return (

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Rank
                </th>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                    Time
                </th>
            </tr>
        </thead>
        <tbody>
        {rows.map((row, index) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
            <td className="px-6 py-4">{row.rank}</td>
            <td>{row.username}</td>
            <td>{row.time}</td>
          </tr>
        ))}
        </tbody>
    </table>
</div>

    // <table id="leaderboard-table">
    //   <thead>
    //     <tr>
    //       <th>Rank</th>
    //       <th>Username</th>
    //       <th>Time</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {rows.map((row, index) => (
    //       <tr key={index}>
    //         <td>{row.rank}</td>
    //         <td>{row.username}</td>
    //         <td>{row.time}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
}

export default LeaderboardTable;
