
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
    <table id="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.rank}</td>
            <td>{row.username}</td>
            <td>{row.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaderboardTable;
