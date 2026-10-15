import { TechStackItem, RoadmapStep } from "@/types";

export function generateLearningRoadmap(
  repoName: string,
  primaryLanguage: string | null,
  techStack: TechStackItem[]
): RoadmapStep[] {
  const steps: RoadmapStep[] = [];
  let stepCounter = 1;

  const lang = primaryLanguage || techStack.find((t) => t.category === "Language")?.name || "JavaScript";
  const framework = techStack.find((t) => t.category === "Framework")?.name;
  const styling = techStack.find((t) => t.category === "Styling")?.name;
  const database = techStack.find((t) => t.category === "Database")?.name;
  const pkgManager = techStack.find((t) => t.category === "Package Manager")?.name || "npm";

  // Step 1: Core Language
  steps.push({
    stepNumber: stepCounter++,
    title: `Master ${lang} & Syntax Conventions`,
    description: `Understand ${lang} core syntax, async control flow, module imports/exports, and type safety rules used throughout ${repoName}.`,
    techName: lang,
    category: "Language",
  });

  // Step 2: Main Framework
  if (framework) {
    steps.push({
      stepNumber: stepCounter++,
      title: `Learn ${framework} Core Architecture`,
      description: `Study ${framework} routing mechanisms, component lifecycles, state management, and file structure conventions.`,
      techName: framework,
      category: "Framework",
    });
  } else {
    steps.push({
      stepNumber: stepCounter++,
      title: `Understand Application Entry Points`,
      description: `Examine top-level entry files (e.g. index, main, server) and module boundaries in ${repoName}.`,
      techName: lang,
      category: "Framework",
    });
  }

  // Step 3: Styling & UI System
  if (styling) {
    steps.push({
      stepNumber: stepCounter++,
      title: `Explore ${styling} UI & Design System`,
      description: `Review styling tokens, utility classes, and layout component structures built with ${styling}.`,
      techName: styling,
      category: "Styling",
    });
  } else {
    steps.push({
      stepNumber: stepCounter++,
      title: `Inspect UI Component Hierarchy`,
      description: `Browse reusable components in /components or /src/components to see how layout primitives are composed.`,
      techName: "CSS / Components",
      category: "Styling",
    });
  }

  // Step 4: API & Backend Handlers
  steps.push({
    stepNumber: stepCounter++,
    title: `Understand API Routes & Server Logic`,
    description: `Trace how client requests flow into API handlers, controllers, or Server Actions to execute business logic.`,
    techName: framework ? `${framework} API` : "REST API",
    category: "Backend",
  });

  // Step 5: Database & Persistence
  if (database) {
    steps.push({
      stepNumber: stepCounter++,
      title: `Master ${database} & Data Models`,
      description: `Inspect database schema definitions, migration scripts, ORM models, and query functions using ${database}.`,
      techName: database,
      category: "Database",
    });
  }

  // Step 6: Development Setup & Execution
  steps.push({
    stepNumber: stepCounter++,
    title: `Clone & Run ${repoName} Locally`,
    description: `Clone repository, configure environment variables, install dependencies via ${pkgManager}, and launch dev server.`,
    techName: pkgManager,
    category: "Setup",
  });

  return steps;
}
