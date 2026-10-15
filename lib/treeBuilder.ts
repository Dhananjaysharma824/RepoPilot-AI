import { GithubTreeNode } from "@/lib/github";
import { TreeNode, StructureAnalysis, RootFolderItem, ImportantFileItem } from "@/types";

function formatBytes(bytes?: number): string | undefined {
  if (!bytes || bytes === 0) return undefined;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const KNOWN_FOLDER_DESCRIPTIONS: Record<string, string> = {
  app: "Next.js App Router pages, layouts, server actions & API routes",
  pages: "Next.js Pages Router / file-based application page routes",
  src: "Core application source code directory",
  components: "UI component hierarchy and layout primitives",
  lib: "Shared utilities, API clients, helper functions & database configs",
  public: "Static assets, images, icons, and public web resources",
  server: "Backend server logic, REST controllers & API handlers",
  api: "Backend API routing and service endpoints",
  frontend: "Frontend web application module & UI source tree",
  backend: "Backend server API, services & database models",
  client: "Client-side frontend single-page application codebase",
  web: "Web frontend platform & UI interface modules",
  models: "Database ORM entity models & schema definitions",
  controllers: "Request handler controllers & business logic layer",
  services: "Business domain services & external integration layer",
  routes: "HTTP endpoint routing table and controller mappings",
  hooks: "Custom React UI hooks and state management abstractions",
  types: "TypeScript interface definitions & global type declarations",
  styles: "Global CSS stylesheets, Tailwind styles, and theme design tokens",
  tests: "Automated test suites (Unit, Integration & E2E tests)",
  test: "Automated test suites and test runner fixtures",
  docs: "Project documentation, architecture guides & API reference",
  prisma: "Prisma ORM schema definitions and database migration scripts",
  supabase: "Supabase database migrations, edge functions & client config",
  scripts: "Build automation scripts, seeders & utility commands",
  widgets: "Flutter UI widgets and visual screen components",
};

const KNOWN_FILE_DESCRIPTIONS: Record<string, string> = {
  "README.md": "Main project overview, setup instructions & documentation",
  "package.json": "Node.js dependencies, package manager scripts & project metadata",
  "tsconfig.json": "TypeScript compiler settings, path aliases & strict rules",
  "next.config.js": "Next.js framework configuration, headers & webpack plugins",
  "next.config.mjs": "Next.js framework ESM configuration",
  "next.config.ts": "Next.js framework TypeScript configuration",
  "vite.config.ts": "Vite build tool & dev server configuration",
  "tailwind.config.js": "Tailwind CSS theme tokens & utility plugin extensions",
  "tailwind.config.ts": "Tailwind CSS TypeScript theme configuration",
  "requirements.txt": "Python package dependencies specification",
  "Cargo.toml": "Rust package manifest, crate dependencies & workspace rules",
  "pom.xml": "Java Maven build configuration & dependency manifest",
  "build.gradle": "Java/Kotlin Gradle build configuration script",
  "composer.json": "PHP Composer package dependencies and autoloader rules",
  "pubspec.yaml": "Flutter/Dart project dependencies & asset declarations",
  "go.mod": "Go module path declaration & dependency versions",
  "Dockerfile": "Docker container build blueprint & deployment environment setup",
  "docker-compose.yml": "Multi-container Docker infrastructure orchestration blueprint",
  ".env.example": "Template for required environment variables",
  ".gitignore": "Git version control ignore rules for hidden or generated files",
};

/**
 * Extracts root level folders, key configuration files (root & subfolders), and tree stats.
 */
export function extractRepositoryStructure(rawNodes: GithubTreeNode[]): StructureAnalysis {
  let totalFiles = 0;
  let totalFolders = 0;

  const rootFolderMap = new Map<string, number>();
  const importantFiles: ImportantFileItem[] = [];
  const addedFilesSet = new Set<string>();

  const filteredNodes = (rawNodes || []).filter(
    (node) =>
      !node.path.startsWith(".git/") &&
      !node.path.includes("node_modules/") &&
      !node.path.includes(".next/")
  );

  for (const node of filteredNodes) {
    if (node.type === "tree") {
      totalFolders++;
    } else {
      totalFiles++;
    }

    const parts = node.path.split("/");
    const topLevelName = parts[0];

    if (parts.length > 1) {
      rootFolderMap.set(topLevelName, (rootFolderMap.get(topLevelName) || 0) + 1);
    }

    if (node.type === "blob") {
      const fileName = parts[parts.length - 1];
      if (KNOWN_FILE_DESCRIPTIONS[fileName] && !addedFilesSet.has(node.path)) {
        addedFilesSet.add(node.path);
        importantFiles.push({
          name: node.path,
          path: node.path,
          description: KNOWN_FILE_DESCRIPTIONS[fileName],
          size: formatBytes(node.size),
        });
      }
    }
  }

  const rootFolders: RootFolderItem[] = Array.from(rootFolderMap.entries())
    .map(([name, fileCount]) => ({
      name,
      path: name,
      description: KNOWN_FOLDER_DESCRIPTIONS[name.toLowerCase()] || `Root project directory containing source modules (${fileCount} items)`,
      fileCount,
    }))
    .sort((a, b) => (b.fileCount || 0) - (a.fileCount || 0))
    .slice(0, 10);

  return {
    rootFolders,
    importantFiles: importantFiles.slice(0, 12),
    totalFiles,
    totalFolders,
  };
}

/**
 * Builds an interactive nested folder tree (TreeNode[]) for component rendering.
 */
export function buildFolderTree(
  rawNodes: GithubTreeNode[],
  maxDepth: number = 4,
  maxItemsPerFolder: number = 12
): TreeNode[] {
  if (!rawNodes || rawNodes.length === 0) {
    return [
      {
        name: "root",
        type: "folder",
        path: "/",
        children: [
          { name: "README.md", type: "file", path: "/README.md", size: "1.2 KB" },
          { name: "package.json", type: "file", path: "/package.json", size: "850 B" },
        ],
      },
    ];
  }

  interface InternalFolder {
    name: string;
    type: "folder";
    path: string;
    childrenMap: Map<string, InternalFolder | InternalFile>;
  }

  interface InternalFile {
    name: string;
    type: "file";
    path: string;
    size?: string;
  }

  const rootFolder: InternalFolder = {
    name: "root",
    type: "folder",
    path: "/",
    childrenMap: new Map(),
  };

  const filteredNodes = rawNodes.filter(
    (node) =>
      !node.path.startsWith(".git/") &&
      !node.path.includes("node_modules/") &&
      !node.path.includes(".next/") &&
      !node.path.includes("dist/") &&
      !node.path.includes("build/")
  );

  for (const node of filteredNodes) {
    const parts = node.path.split("/");
    let current = rootFolder;

    const depthLimit = Math.min(parts.length, maxDepth);
    let currentAccumPath = "";

    for (let i = 0; i < depthLimit; i++) {
      const partName = parts[i];
      const isLast = i === parts.length - 1;
      const isFolder = !isLast || node.type === "tree";
      currentAccumPath = currentAccumPath ? `${currentAccumPath}/${partName}` : partName;

      if (isFolder) {
        if (!current.childrenMap.has(partName)) {
          current.childrenMap.set(partName, {
            name: partName,
            type: "folder",
            path: currentAccumPath,
            childrenMap: new Map(),
          });
        }
        const child = current.childrenMap.get(partName);
        if (child && child.type === "folder") {
          current = child;
        }
      } else {
        current.childrenMap.set(partName, {
          name: partName,
          type: "file",
          path: node.path,
          size: formatBytes(node.size),
        });
      }
    }
  }

  function convertToTreeNode(internal: InternalFolder): TreeNode[] {
    const childrenArray: TreeNode[] = [];

    const entries = Array.from(internal.childrenMap.values()).sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === "folder" ? -1 : 1;
    });

    const truncatedEntries = entries.slice(0, maxItemsPerFolder);

    for (const entry of truncatedEntries) {
      if (entry.type === "folder") {
        childrenArray.push({
          name: entry.name,
          type: "folder",
          path: entry.path,
          children: convertToTreeNode(entry),
        });
      } else {
        childrenArray.push({
          name: entry.name,
          type: "file",
          path: entry.path,
          size: entry.size,
        });
      }
    }

    if (entries.length > maxItemsPerFolder) {
      childrenArray.push({
        name: `... and ${entries.length - maxItemsPerFolder} more items`,
        type: "file",
        path: internal.path,
      });
    }

    return childrenArray;
  }

  return convertToTreeNode(rootFolder);
}
