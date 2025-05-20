# AtCoder API

An unofficial JavaScript/TypeScript client for fetching contest and user data from [AtCoder](https://atcoder.jp/).

## Features

- Fetch upcoming and recent contests
- Get detailed user profiles and statistics
- Retrieve user contest participation history
- Built-in rate limiting to avoid server overload
- Caching for better performance
- Full TypeScript support

## Installation

```bash
npm install @qatadaazzeh/atcoder-api
```

## Usage

### Fetching Contests

```typescript
import { fetchUpcomingContests, fetchRecentContests } from '@qatadaazzeh/atcoder-api';

// Get upcoming contests
const upcoming = await fetchUpcomingContests();
console.log(`Found ${upcoming.length} upcoming contests`);

// Get recent contests
const recent = await fetchRecentContests();
console.log(`Found ${recent.length} recent contests`);
```

### Getting User Information

```typescript
import { fetchUserInfo } from '@qatadaazzeh/atcoder-api';

// Get user profile
const user = await fetchUserInfo('tourist');
console.log(`${user.userName} has a rating of ${user.userRating}`);

// Access contest history
console.log(`Participated in ${user.userContests.length} contests`);
```

### Getting User's Contest History

```typescript
import { fetchUserContestList } from '@qatadaazzeh/atcoder-api';

// Get contest participation history for a user
const contestHistory = await fetchUserContestList('tourist');

// Find contests where the user's performance was above 3000
const highPerformance = contestHistory.filter(c => c.userPerformance > 3000);
console.log(`${highPerformance.length} contests with performance > 3000`);
```

## API Reference

### Contest Functions

- `fetchContestList(type?: 'upcoming' | 'recent')`: Fetch a list of contests
- `fetchUpcomingContests()`: Fetch upcoming contests
- `fetchRecentContests()`: Fetch recent contests

### User Functions

- `fetchUserInfo(userId: string)`: Get detailed user information
- `fetchUserContestList(userId: string)`: Get user's contest participation history

## Types

The library exports the following TypeScript types:

- `Contest`: Contest information
- `User`: User profile information
- `UserContest`: User's contest participation details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
