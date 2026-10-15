import { TechStackItem, CategorizedTechStack, TechCategory } from "@/types";

interface ManifestFiles {
  packageJson?: string | string[] | null;
  requirementsTxt?: string | string[] | null;
  pomXml?: string | string[] | null;
  cargoToml?: string | string[] | null;
  composerJson?: string | string[] | null;
  pubspecYaml?: string | string[] | null;
  goMod?: string | string[] | null;
}

export function detectTechnologies(
  primaryLanguage: string | null,
  treePaths: string[],
  manifests: ManifestFiles
): TechStackItem[] {
  const stack: Map<string, TechStackItem> = new Map();

  const addTech = (name: string, category: TechCategory, version?: string) => {
    const key = name.toLowerCase();
    if (!stack.has(key)) {
      stack.set(key, { name, category, version });
    }
  };

  const pathsStr = treePaths.join("\n").toLowerCase();

  // 1. Primary language
  if (primaryLanguage) {
    addTech(primaryLanguage, "Language");
  }

  // 2. Package Manager & Build Tool Detection via Lockfiles & Configs
  if (pathsStr.includes("pnpm-lock.yaml")) addTech("pnpm", "Package Manager");
  else if (pathsStr.includes("yarn.lock")) addTech("Yarn", "Package Manager");
  else if (pathsStr.includes("package-lock.json")) addTech("npm", "Package Manager");
  else if (pathsStr.includes("bun.lockb") || pathsStr.includes("bun.lock")) addTech("Bun", "Package Manager");

  if (pathsStr.includes("vite.config")) addTech("Vite", "Build Tool");
  if (pathsStr.includes("webpack.config")) addTech("Webpack", "Build Tool");
  if (pathsStr.includes("turbo.json")) addTech("Turbopack", "Build Tool");
  if (pathsStr.includes("postcss.config")) addTech("PostCSS", "Build Tool");

  // 3. Inspect package.json (single or array of subfolder manifests)
  const packageJsons = Array.isArray(manifests.packageJson)
    ? manifests.packageJson
    : manifests.packageJson
    ? [manifests.packageJson]
    : [];

  for (const pkgStr of packageJsons) {
    if (!pkgStr) continue;
    try {
      const parsed = JSON.parse(pkgStr);
      const allDeps: Record<string, string> = {
        ...parsed.dependencies,
        ...parsed.devDependencies,
      };

      // Frameworks & Core Libs
      if (allDeps["next"]) addTech("Next.js", "Framework", allDeps["next"]);
      if (allDeps["react"]) addTech("React", "Framework", allDeps["react"]);
      if (allDeps["vue"]) addTech("Vue.js", "Framework", allDeps["vue"]);
      if (allDeps["nuxt"]) addTech("Nuxt", "Framework", allDeps["nuxt"]);
      if (allDeps["svelte"] || allDeps["@sveltejs/kit"]) addTech("Svelte", "Framework");
      if (allDeps["@angular/core"]) addTech("Angular", "Framework");
      if (allDeps["express"]) addTech("Express.js", "Framework", allDeps["express"]);
      if (allDeps["@nestjs/core"]) addTech("NestJS", "Framework");
      if (allDeps["fastify"]) addTech("Fastify", "Framework");
      if (allDeps["hono"]) addTech("Hono", "Framework");

      // State Management & Client Libs
      if (allDeps["@reduxjs/toolkit"] || allDeps["redux"]) addTech("Redux Toolkit", "Framework");
      if (allDeps["zustand"]) addTech("Zustand", "Framework");
      if (allDeps["@tanstack/react-query"]) addTech("React Query", "Framework");
      if (allDeps["axios"]) addTech("Axios", "Tool");

      // Styling Libraries
      if (allDeps["tailwindcss"]) addTech("Tailwind CSS", "Styling", allDeps["tailwindcss"]);
      if (allDeps["bootstrap"]) addTech("Bootstrap", "Styling");
      if (allDeps["@mui/material"] || allDeps["@material-ui/core"]) addTech("Material UI", "Styling");
      if (allDeps["styled-components"]) addTech("Styled Components", "Styling");
      if (allDeps["@emotion/react"]) addTech("Emotion", "Styling");
      if (allDeps["sass"]) addTech("Sass / SCSS", "Styling");

      // Database & ORMs
      if (allDeps["mongoose"] || allDeps["mongodb"]) addTech("MongoDB", "Database");
      if (allDeps["@prisma/client"] || allDeps["prisma"]) addTech("Prisma ORM", "Database");
      if (allDeps["drizzle-orm"]) addTech("Drizzle ORM", "Database");
      if (allDeps["pg"]) addTech("PostgreSQL", "Database");
      if (allDeps["mysql2"] || allDeps["mysql"]) addTech("MySQL", "Database");
      if (allDeps["@supabase/supabase-js"]) addTech("Supabase", "Database");
      if (allDeps["firebase"] || allDeps["firebase-admin"]) addTech("Firebase", "Database");
      if (allDeps["ioredis"] || allDeps["redis"]) addTech("Redis", "Database");

      // Languages & Tools
      if (allDeps["typescript"]) addTech("TypeScript", "Language", allDeps["typescript"]);
      if (allDeps["vite"]) addTech("Vite", "Build Tool", allDeps["vite"]);
      if (allDeps["webpack"]) addTech("Webpack", "Build Tool");
      if (allDeps["turbo"] || allDeps["turbopack"]) addTech("Turbopack", "Build Tool");

      // Testing
      if (allDeps["jest"]) addTech("Jest", "Testing");
      if (allDeps["vitest"]) addTech("Vitest", "Testing");
      if (allDeps["playwright"] || allDeps["@playwright/test"]) addTech("Playwright", "Testing");
      if (allDeps["cypress"]) addTech("Cypress", "Testing");
    } catch {
      // JSON parse fallback
    }
  }

  // 4. Inspect requirements.txt (Python)
  const reqTexts = Array.isArray(manifests.requirementsTxt)
    ? manifests.requirementsTxt
    : manifests.requirementsTxt
    ? [manifests.requirementsTxt]
    : [];

  for (const reqTextRaw of reqTexts) {
    if (!reqTextRaw) continue;
    const reqText = reqTextRaw.toLowerCase();
    if (reqText.includes("django")) addTech("Django", "Framework");
    if (reqText.includes("flask")) addTech("Flask", "Framework");
    if (reqText.includes("fastapi")) addTech("FastAPI", "Framework");
    if (reqText.includes("sqlalchemy")) addTech("SQLAlchemy", "Database");
    if (reqText.includes("psycopg2") || reqText.includes("psycopg")) addTech("PostgreSQL", "Database");
    if (reqText.includes("pymongo") || reqText.includes("motor")) addTech("MongoDB", "Database");
    if (reqText.includes("celery")) addTech("Celery", "Tool");
    if (reqText.includes("pytest")) addTech("PyTest", "Testing");
    if (reqText.includes("torch")) addTech("PyTorch", "Tool");
    if (reqText.includes("tensorflow")) addTech("TensorFlow", "Tool");
    if (reqText.includes("opencv")) addTech("OpenCV", "Tool");

    addTech("Python", "Language");
    addTech("pip", "Package Manager");
  }

  // 5. Inspect Cargo.toml (Rust)
  const cargoTomls = Array.isArray(manifests.cargoToml)
    ? manifests.cargoToml
    : manifests.cargoToml
    ? [manifests.cargoToml]
    : [];

  for (const cargoRaw of cargoTomls) {
    if (!cargoRaw) continue;
    const cargo = cargoRaw.toLowerCase();
    if (cargo.includes("actix-web")) addTech("Actix Web", "Framework");
    if (cargo.includes("axum")) addTech("Axum", "Framework");
    if (cargo.includes("tokio")) addTech("Tokio Async", "Tool");
    if (cargo.includes("serde")) addTech("Serde", "Tool");
    if (cargo.includes("diesel") || cargo.includes("sqlx")) addTech("SQLx / Diesel ORM", "Database");
    addTech("Rust", "Language");
    addTech("Cargo", "Package Manager");
  }

  // 6. Inspect pom.xml (Java)
  const pomXmls = Array.isArray(manifests.pomXml)
    ? manifests.pomXml
    : manifests.pomXml
    ? [manifests.pomXml]
    : [];

  for (const pomRaw of pomXmls) {
    if (!pomRaw) continue;
    const pom = pomRaw.toLowerCase();
    if (pom.includes("spring-boot")) addTech("Spring Boot", "Framework");
    if (pom.includes("hibernate")) addTech("Hibernate ORM", "Database");
    addTech("Java", "Language");
    addTech("Maven", "Build Tool");
  }

  // 7. Inspect composer.json (PHP)
  const composerJsons = Array.isArray(manifests.composerJson)
    ? manifests.composerJson
    : manifests.composerJson
    ? [manifests.composerJson]
    : [];

  for (const compRaw of composerJsons) {
    if (!compRaw) continue;
    const comp = compRaw.toLowerCase();
    if (comp.includes("laravel/framework")) addTech("Laravel", "Framework");
    if (comp.includes("symfony/framework-bundle")) addTech("Symfony", "Framework");
    addTech("PHP", "Language");
    addTech("Composer", "Package Manager");
  }

  // 8. Inspect pubspec.yaml (Flutter / Dart)
  const pubspecs = Array.isArray(manifests.pubspecYaml)
    ? manifests.pubspecYaml
    : manifests.pubspecYaml
    ? [manifests.pubspecYaml]
    : [];

  for (const pubRaw of pubspecs) {
    if (!pubRaw) continue;
    addTech("Flutter", "Framework");
    addTech("Dart", "Language");
    addTech("Pub", "Package Manager");
  }

  // 9. Inspect go.mod (Go)
  const goMods = Array.isArray(manifests.goMod)
    ? manifests.goMod
    : manifests.goMod
    ? [manifests.goMod]
    : [];

  for (const goRaw of goMods) {
    if (!goRaw) continue;
    const goModText = goRaw.toLowerCase();
    if (goModText.includes("gin-gonic/gin")) addTech("Gin", "Framework");
    if (goModText.includes("gofiber/fiber")) addTech("Fiber", "Framework");
    if (goModText.includes("gorm.io/gorm")) addTech("GORM", "Database");
    addTech("Go", "Language");
    addTech("Go Modules", "Package Manager");
  }

  // 10. Heuristic fallback scans on treePaths
  if (pathsStr.includes("tailwind.config")) addTech("Tailwind CSS", "Styling");
  if (pathsStr.includes("dockerfile") || pathsStr.includes("docker-compose")) addTech("Docker", "Tool");
  if (pathsStr.includes("prisma/schema.prisma")) addTech("Prisma ORM", "Database");
  if (pathsStr.includes(".github/workflows")) addTech("GitHub Actions CI/CD", "Tool");

  return Array.from(stack.values());
}

/**
 * Organizes detected technology stack items into category buckets for UI rendering.
 */
export function categorizeTechStack(stack: TechStackItem[]): CategorizedTechStack {
  const result: CategorizedTechStack = {
    frontend: [],
    backend: [],
    database: [],
    styling: [],
    toolsAndPackageManagers: [],
    testing: [],
    languages: [],
  };

  const frontendNames = [
    "react",
    "next.js",
    "vue.js",
    "nuxt",
    "svelte",
    "angular",
    "flutter",
    "redux toolkit",
    "zustand",
    "react query",
    "tailwind css",
    "bootstrap",
    "material ui",
    "styled components",
    "emotion",
    "sass / scss",
    "vite",
    "webpack",
  ];

  const backendNames = [
    "express.js",
    "nestjs",
    "fastify",
    "hono",
    "django",
    "flask",
    "fastapi",
    "spring boot",
    "laravel",
    "symfony",
    "actix web",
    "axum",
    "gin",
    "fiber",
    "mongodb",
    "postgresql",
    "mysql",
    "prisma orm",
    "drizzle orm",
    "supabase",
    "firebase",
    "redis",
    "sqlalchemy",
    "gorm",
  ];

  for (const item of stack) {
    const lowerName = item.name.toLowerCase();

    if (item.category === "Language") {
      result.languages.push(item);
    }
    
    if (item.category === "Styling") {
      result.styling.push(item);
    }
    
    if (item.category === "Database") {
      result.database.push(item);
    }
    
    if (item.category === "Testing") {
      result.testing.push(item);
    }
    
    if (item.category === "Package Manager" || item.category === "Build Tool" || item.category === "Tool") {
      result.toolsAndPackageManagers.push(item);
    }

    if (frontendNames.includes(lowerName) || item.category === "Styling") {
      if (!result.frontend.some((f) => f.name === item.name)) {
        result.frontend.push(item);
      }
    }

    if (backendNames.includes(lowerName) || item.category === "Database") {
      if (!result.backend.some((b) => b.name === item.name)) {
        result.backend.push(item);
      }
    }
  }

  return result;
}
