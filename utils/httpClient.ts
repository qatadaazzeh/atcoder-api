
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000;


const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;


async function rateLimitedFetch(url: string, options?: RequestInit): Promise<Response> {
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
        await new Promise(resolve =>
            setTimeout(resolve, MIN_REQUEST_INTERVAL - (now - lastRequestTime))
        );
    }
    lastRequestTime = Date.now();
    return fetch(url, options);
}

export async function fetchJson<T>(url: string, options?: RequestInit, useCache: boolean = true): Promise<T> {
    const cacheKey = `json:${url}`;
    const now = Date.now();
    const cached = useCache ? cache.get(cacheKey) : undefined;

    if (cached && now - cached.timestamp < CACHE_TTL) {
        return cached.data as T;
    }

    const response = await rateLimitedFetch(url, {
        ...options,
        headers: {
            'Accept': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    if (response.status === 204 || response.status === 205 || response.status === 304) {
        return {} as T;
    }

    const data = await response.json();


    if (useCache) {
        cache.set(cacheKey, { data, timestamp: now });
    }

    return data;
}

export async function fetchHtml(url: string, options?: RequestInit, useCache: boolean = true): Promise<string> {
    const cacheKey = `html:${url}`;
    const now = Date.now();
    const cached = useCache ? cache.get(cacheKey) : undefined;

    if (cached && now - cached.timestamp < CACHE_TTL) {
        return cached.data as string;
    }

    const response = await rateLimitedFetch(url, {
        ...options,
        headers: {
            'Accept': 'text/html',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const html = await response.text();

    if (useCache) {
        cache.set(cacheKey, { data: html, timestamp: now });
    }

    return html;
}


export function clearCache(urlPattern?: RegExp): void {
    if (!urlPattern) {
        cache.clear();
        return;
    }

    const keysToDelete: string[] = [];
    for (const key of cache.keys()) {
        const [type, url] = key.split(':');
        if (url && urlPattern.test(url)) {
            keysToDelete.push(key);
        }
    }

    keysToDelete.forEach(key => cache.delete(key));
}