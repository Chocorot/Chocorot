export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export async function getRepositories(username: string): Promise<Repository[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos: Repository[] = await response.json();
    
    // Filter out forks if desired, or keep all
    return repos.filter(repo => !repo.fork);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}
