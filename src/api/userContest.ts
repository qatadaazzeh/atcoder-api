import { UserContest } from '../../types/userContest';
import { fetchJson } from '../../utils/httpClient';


interface AtCoderContestHistoryEntry {
    Place: number;
    OldRating: number;
    NewRating: number;
    Performance: number;
    ContestName: string;
    ContestScreenName: string;
    EndTime: string;
    IsRated: boolean;
}

export async function fetchUserContestList(userId: string): Promise<UserContest[]> {
    try {
        const url = `https://atcoder.jp/users/${userId}/history/json`;
        const response = await fetchJson<AtCoderContestHistoryEntry[]>(url);


        const contests: UserContest[] = response.map((item) => ({
            userRank: item.Place,
            userOldRating: item.OldRating,
            userNewRating: item.NewRating,
            userRatingChange: item.NewRating - item.OldRating,
            contestName: item.ContestName,
            userPerformance: item.Performance,
            contestEndTime: item.EndTime,
            isRated: item.IsRated,
            contestId: item.ContestScreenName
        }));

        return contests;
    } catch (error) {
        console.error('Error fetching user contest list:', error);
        throw new Error(`Error fetching user contest list: ${error instanceof Error ? error.message : String(error)}`);
    }
}