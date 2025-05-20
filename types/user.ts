import { UserContest } from "./userContest";

export interface User {
    userName: string;
    currentRank: string,
    userAvatar: string,
    userRank: number;
    userRating: number;
    userMaxRating: number;
    userLastCompeted: string;
    userContestCount: number;
    userContests: UserContest[];
}