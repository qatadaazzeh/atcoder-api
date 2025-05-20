import { fetchContestList, fetchUpcomingContests, fetchRecentContests } from '../../src/api/contests';
import { mockContestPageHtml } from '../mocks';
import * as httpClient from '../../utils/httpClient';

// Mock the httpClient module
jest.mock('../../utils/httpClient');

describe('Contest API', () => {
    const mockedFetchHtml = httpClient.fetchHtml as jest.MockedFunction<typeof httpClient.fetchHtml>;

    beforeEach(() => {
        // Reset all mocks
        jest.resetAllMocks();
    });

    describe('fetchContestList', () => {
        it('should fetch upcoming contests by default', async () => {
            // Mock the HTML response
            mockedFetchHtml.mockResolvedValue(mockContestPageHtml);

            const contests = await fetchContestList();

            expect(mockedFetchHtml).toHaveBeenCalledWith('https://atcoder.jp/contests');
            expect(contests).toHaveLength(2);
            expect(contests[0].contestName).toBe('AtCoder Beginner Contest 999');
            expect(contests[0].contestId).toBe('abc999');
            expect(contests[1].contestName).toBe('AtCoder Regular Contest 999');
        });

        it('should handle errors gracefully', async () => {
            // Mock a failed fetch
            mockedFetchHtml.mockRejectedValue(new Error('Network error'));

            // Verify that the error is properly thrown
            await expect(fetchContestList()).rejects.toThrow('Failed to fetch contests: Network error');
        });

        it('should handle empty contest table', async () => {
            // Mock HTML with no contests
            const emptyHtml = `
        <html>
          <body>
            <div id="main-container">
              <div class="row">
                <div class="col-sm-12">
                  <h2>Active Contests</h2>
                  <table id="contest-table-upcoming">
                    <thead>
                      <tr><th>Start Time</th><th>Contest Name</th></tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

            mockedFetchHtml.mockResolvedValue(emptyHtml);

            const contests = await fetchContestList();

            expect(contests).toHaveLength(0);
        });
    });

    describe('fetchUpcomingContests', () => {
        it('should call fetchContestList with "upcoming" type', async () => {
            // Mock the HTML response
            mockedFetchHtml.mockResolvedValue(mockContestPageHtml);

            await fetchUpcomingContests();

            expect(mockedFetchHtml).toHaveBeenCalledWith('https://atcoder.jp/contests');
        });
    });

    describe('fetchRecentContests', () => {
        it('should call fetchContestList with "recent" type', async () => {
            // Create a modified HTML with recent contests
            const recentHtml = mockContestPageHtml.replace('contest-table-upcoming', 'contest-table-recent');

            // Mock the HTML response
            mockedFetchHtml.mockResolvedValue(recentHtml);

            await fetchRecentContests();

            expect(mockedFetchHtml).toHaveBeenCalledWith('https://atcoder.jp/contests');
        });
    });
});
