export interface GithubRepository {
  name: string;
  owner: string;
  full_name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  open_issues: number;
  license: string | null;
  default_branch: string;
  owner_avatar: string;
  html_url: string;
}

export interface GithubTreeNode {
  path: string;
  mode?: string;
  type: "blob" | "tree";
  sha?: string;
  size?: number;
  url?: string;
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "RepoPilot-AI",
  };

  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== "your-github-personal-access-token") {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

/**
 * Fetches repository metadata from the GitHub REST API.
 */
export async function getRepository(owner: string, repo: string): Promise<GithubRepository> {
  if (!owner || !repo) {
    throw new Error("Repository owner and name are required.");
  }

  const apiUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;

  const response = await fetch(apiUrl, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Repository '${owner}/${repo}' not found on GitHub or is private.`);
    }
    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded. Please try again later or configure GITHUB_TOKEN.");
    }
    throw new Error(`GitHub API request failed with status HTTP ${response.status}.`);
  }

  const data = await response.json();

  return {
    name: data.name || repo,
    owner: data.owner?.login || owner,
    full_name: data.full_name || `${owner}/${repo}`,
    description: data.description || null,
    stars: data.stargazers_count ?? 0,
    forks: data.forks_count ?? 0,
    language: data.language || null,
    topics: Array.isArray(data.topics) ? data.topics : [],
    open_issues: data.open_issues_count ?? 0,
    license: data.license?.spdx_id || data.license?.name || null,
    default_branch: data.default_branch || "main",
    owner_avatar: data.owner?.avatar_url || "https://github.com/github.png",
    html_url: data.html_url || `https://github.com/${owner}/${repo}`,
  };
}

/**
 * Fetches the recursive Git file tree for a repository.
 */
export async function getRepoTree(
  owner: string,
  repo: string,
  branch: string = "main"
): Promise<GithubTreeNode[]> {
  try {
    const apiUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
      repo
    )}/git/trees/${encodeURIComponent(branch)}?recursive=1`;

    const response = await fetch(apiUrl, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data.tree) ? data.tree : [];
  } catch {
    return [];
  }
}

/**
 * Fetches raw file content (e.g. package.json, requirements.txt, etc.) from GitHub.
 */
export async function getRepoFileContent(
  owner: string,
  repo: string,
  branch: string,
  filePath: string
): Promise<string | null> {
  try {
    const rawUrl = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(
      repo
    )}/${encodeURIComponent(branch)}/${filePath}`;

    const response = await fetch(rawUrl, {
      headers: getHeaders(),
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch {
    return null;
  }
}
