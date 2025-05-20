import * as api from '../src/index';

describe('Main API exports', () => {
    it('should export all required functions', () => {
        // Check that all API functions are exported
        expect(api.fetchContestList).toBeInstanceOf(Function);
        expect(api.fetchUpcomingContests).toBeInstanceOf(Function);
        expect(api.fetchRecentContests).toBeInstanceOf(Function);
        expect(api.fetchUserInfo).toBeInstanceOf(Function);
        expect(api.fetchUserContestList).toBeInstanceOf(Function);
        // TypeScript will validate that the types are properly exported at compile time
        // The presence of exported functions is enough for runtime testing
    });
});
