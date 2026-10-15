export interface ParsedGithubUrl {
  owner: string;
  repo: string;
}

/**
 * Parses a GitHub repository URL or owner/repo shorthand string.
 *
 * Supported formats:
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo/
 * - https://github.com/owner/repo.git
 * - http://github.com/owner/repo
 * - github.com/owner/repo
 * - owner/repo
 *
 * Returns `{ owner, repo }` if valid, or `null` if invalid or malformed.
 */
export function parseGithubUrl(inputUrl: string): ParsedGithubUrl | null {
  if (!inputUrl || typeof inputUrl !== "string") {
    return null;
  }

  // Trim whitespace and remove trailing slashes or .git suffix
  let cleaned = inputUrl.trim();
  if (cleaned.length === 0) return null;

  cleaned = cleaned.replace(/\/+$/, "").replace(/\.git$/i, "");

  // Match github.com/owner/repo or owner/repo pattern
  // Owner and Repo can contain alphanumeric characters, hyphens, underscores, and dots (for repo names)
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:github\.com\/|^)([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/;
  const match = cleaned.match(regex);

  if (!match || !match[1] || !match[2]) {
    return null;
  }

  const owner = match[1];
  const repo = match[2];

  // Prevent reserved GitHub system paths or invalid user/repo names
  const reservedNames = ["settings", "notifications", "explore", "trending", "login", "signup", "orgs", "users"];
  if (reservedNames.includes(owner.toLowerCase())) {
    return null;
  }

  return { owner, repo };
}
