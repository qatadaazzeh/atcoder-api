import { fetchUserInfo } from '../../src/api/user';
import { mockUserPageHtml, mockUserContests } from '../mocks';
import * as httpClient from '../../utils/httpClient';
import * as userContest from '../../src/api/userContest';

// Mock the httpClient and userContest modules
jest.mock('../../utils/httpClient');
jest.mock('../../src/api/userContest');

describe('User API', () => {
    const mockedFetchHtml = httpClient.fetchHtml as jest.MockedFunction<typeof httpClient.fetchHtml>;
    const mockedFetchUserContestList = userContest.fetchUserContestList as jest.MockedFunction<typeof userContest.fetchUserContestList>;

    beforeEach(() => {
        // Reset all mocks
        jest.resetAllMocks();
    });

    describe('fetchUserInfo', () => {
        it('should fetch and parse user information correctly', async () => {
            // Mock the HTML response and userContest list
            mockedFetchHtml.mockResolvedValue(mockUserPageHtml);
            mockedFetchUserContestList.mockResolvedValue(mockUserContests);

            const userId = 'tourist';
            const user = await fetchUserInfo(userId);

            expect(mockedFetchHtml).toHaveBeenCalledWith(`https://atcoder.jp/users/${userId}`);
            expect(mockedFetchUserContestList).toHaveBeenCalledWith(userId);

            expect(user.userName).toBe('tourist');
            expect(user.userRank).toBe(1);
            expect(user.userRating).toBe(3800);
            expect(user.userMaxRating).toBe(4000);
            expect(user.userContestCount).toBe(150);
            expect(user.userContests).toEqual(mockUserContests);
        });

        it('should throw an error when user is not found', async () => {
            // Mock HTML with no username
            const noUserHtml = `
        <html>
          <body>
            <div id="main-container">
              <div class="row">
                <div class="col-md-3 col-sm-12">
                  <h3><b>User not found</b></h3>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

            mockedFetchHtml.mockResolvedValue(noUserHtml);

            const userId = 'nonexistent-user';

            await expect(fetchUserInfo(userId)).rejects.toThrow(`Failed to fetch user '${userId}': User '${userId}' not found or profile page has changed structure`);
        });

        it('should handle network errors gracefully', async () => {
            // Mock a failed fetch
            mockedFetchHtml.mockRejectedValue(new Error('Network error'));

            const userId = 'tourist';

            await expect(fetchUserInfo(userId)).rejects.toThrow(`Failed to fetch user '${userId}': Network error`);
        });

        it('should handle userContest fetch errors gracefully', async () => {
            // Mock the HTML response but reject the contest list
            mockedFetchHtml.mockResolvedValue(mockUserPageHtml);
            mockedFetchUserContestList.mockRejectedValue(new Error('Contest history error'));

            const userId = 'tourist';

            await expect(fetchUserInfo(userId)).rejects.toThrow(`Failed to fetch user '${userId}': Contest history error`);
        });
    });
});
