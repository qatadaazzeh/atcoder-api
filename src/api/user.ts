import * as cheerio from 'cheerio';
import { User } from '../../types/user';
import { fetchHtml } from '../../utils/httpClient';
import { UserContest } from '../../types/userContest';
import { fetchUserContestList } from './userContest';

export async function fetchUserInfo(userId: string): Promise<User> {
    try {
        const url = `https://atcoder.jp/users/${userId}`;
        const html = await fetchHtml(url);
        const $ = cheerio.load(html);
        const container = $('#main-container .row').first();
        const userName = container.find('.col-md-3.col-sm-12 h3 .username span').first().text().trim();
        if (!userName) {
            throw new Error(`User '${userId}' not found or profile page has changed structure`);
        }

        const currentRank = container.find('.col-md-3.col-sm-12 h3 b').text().trim();
        const userAvatar = container.find('.col-md-3.col-sm-12 .avatar').attr('src')?.trim() || '';


        const userRankElement = container.find('.col-md-9.col-sm-12 .dl-table tbody tr:nth-child(1) td').text().trim();
        const userRank = Number(userRankElement.replace(/[^\d]/g, '')) || 0;

        const userRatingElement = container.find('.col-md-9.col-sm-12 .dl-table tbody tr:nth-child(2) td span:nth-child(2)').text().trim();
        const userRating = Number(userRatingElement) || 0;

        const userMaxRatingElement = container.find('.col-md-9.col-sm-12 .dl-table tbody tr:nth-child(3) td span:nth-child(2)').text().trim();
        const userMaxRating = Number(userMaxRatingElement) || 0;
        const userLastCompeted = container.find('.col-md-9.col-sm-12 .dl-table tbody tr:nth-child(5) td').text().trim();


        let userContestCount = 0;
        container.find('.col-md-9.col-sm-12 .dl-table tbody tr').each((_, row) => {
            const label = $(row).find('td').first().text().trim();
            if (label === 'Rated Matches') {
                userContestCount = Number($(row).find('td').last().text().trim()) || 0;
            }
        });


        const userContests: UserContest[] = await fetchUserContestList(userId);

        return {
            userName,
            currentRank,
            userAvatar,
            userRank,
            userRating,
            userMaxRating,
            userLastCompeted,
            userContestCount,
            userContests
        };
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error(`Failed to fetch user '${userId}': ${error instanceof Error ? error.message : String(error)}`);
    }
}