import { Contest } from '../../types/contest';
import * as cheerio from 'cheerio';
import { fetchHtml } from '../../utils/httpClient';


export type ContestType = 'upcoming' | 'recent';


export async function fetchContestList(type: ContestType = 'upcoming'): Promise<Contest[]> {
    try {
        const url = 'https://atcoder.jp/contests';
        const html = await fetchHtml(url);
        const $ = cheerio.load(html);
        const contests: Contest[] = [];

        const tableSelector = type === 'upcoming' ? '#contest-table-upcoming' : '#contest-table-recent';
        const contestRows = $(`${tableSelector} tbody tr`);

        if (contestRows.length === 0) {
            console.warn(`No ${type} contests found. The HTML structure may have changed or there are no contests.`);
        }

        contestRows.each((_, el) => {
            try {
                const contestTime = $(el).find('td:nth-child(1)').text().trim();
                const contestName = $(el).find('td:nth-child(2) a').text().trim();
                const isRated = $(el).find('td:last-child').text().trim() !== '-';
                const contestDuration = $(el).find('td:nth-child(3)').text().trim();
                const contestType = $(el).find('td:nth-child(2) span').text().trim() === 'Ⓐ' ? 'Algorithm' : 'Heuristic';
                const contestIdElement = $(el).find('td:nth-child(2) a').attr('href');
                if (!contestIdElement) return;
                const contestId = contestIdElement.split('/').pop() || '';
                const contestUrl = 'https://atcoder.jp' + contestIdElement;

                contests.push({
                    contestName,
                    isRated,
                    contestTime,
                    contestDuration,
                    contestType,
                    contestUrl,
                    contestId
                });
            } catch (rowError) {
                console.error('Error parsing contest row:', rowError);

            }
        });

        return contests;
    } catch (error) {
        console.error('Error fetching contest list:', error);
        throw new Error(`Failed to fetch contests: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function fetchUpcomingContests(): Promise<Contest[]> {
    return fetchContestList('upcoming');
}


export async function fetchRecentContests(): Promise<Contest[]> {
    return fetchContestList('recent');
}