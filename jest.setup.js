
require('cross-fetch/polyfill');


require('jest-fetch-mock').enableMocks();


jest.setTimeout(30000);

beforeEach(() => {
    if (global.fetchMock) {
        global.fetchMock.resetMocks();
    }
});
