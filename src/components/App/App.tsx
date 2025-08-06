import CafeInfo from '../CafeInfo/CafeInfo';
import css from './App.module.css';
import type { Vote, VoteType } from '../../types/votes';
import { useState } from 'react';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';

const VoteOptionsObj = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default function App() {
  const [votes, setVotes] = useState<Vote>(VoteOptionsObj);

  const handleVote = (type: VoteType) => {
    setVotes({ ...votes, [type]: votes[type] + 1 });
  };

  const resetVotes = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  const totalVotes = votes.bad + votes.good + votes.neutral;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={
            totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0
          }
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
