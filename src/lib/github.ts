/**
 * Fetches GitHub follower count by scraping the profile page
 * This avoids the need for GitHub API authentication
 */
export async function getGitHubFollowerCount(username: string): Promise<number> {
  try {
    const response = await fetch(`https://github.com/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract follower count using regex
    // Looking for patterns like "82 followers" or "1.2k followers"
    const followerMatch = html.match(/(\d+(?:\.\d+)?[kK]?)\s+followers/i);
    
    if (followerMatch) {
      let followerCount = followerMatch[1];
      
      // Handle k/K suffix (e.g., "1.2k" -> 1200)
      if (followerCount.toLowerCase().includes('k')) {
        const number = parseFloat(followerCount.replace(/[kK]/g, ''));
        return Math.floor(number * 1000);
      }
      
      return parseInt(followerCount, 10);
    }

    // Fallback: try to find in a different pattern
    const alternativeMatch = html.match(/followers[^>]*>(\d+(?:\.\d+)?[kK]?)/i);
    if (alternativeMatch) {
      let followerCount = alternativeMatch[1];
      
      if (followerCount.toLowerCase().includes('k')) {
        const number = parseFloat(followerCount.replace(/[kK]/g, ''));
        return Math.floor(number * 1000);
      }
      
      return parseInt(followerCount, 10);
    }

    throw new Error('Could not extract follower count from HTML');
    
  } catch (error) {
    console.error('Error fetching GitHub follower count:', error);
    throw error;
  }
}

/**
 * Cached version of getGitHubFollowerCount with fallback
 * Returns cached value or fallback if fetch fails
 */
export async function getCachedGitHubFollowerCount(
  username: string, 
  fallback: number = 82
): Promise<number> {
  try {
    // Check if we have a cached value in localStorage
    const cacheKey = `github-followers-${username}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      const { count, timestamp } = JSON.parse(cached);
      const cacheAge = Date.now() - timestamp;
      const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
      
      if (cacheAge < cacheExpiry) {
        return count;
      }
    }
    
    // Fetch fresh data
    const count = await getGitHubFollowerCount(username);
    
    // Cache the result
    localStorage.setItem(cacheKey, JSON.stringify({
      count,
      timestamp: Date.now()
    }));
    
    return count;
    
  } catch (error) {
    console.error('Error getting cached GitHub follower count:', error);
    return fallback;
  }
}
