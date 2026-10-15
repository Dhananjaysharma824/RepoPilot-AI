import { TechStackItem, ArchitectureAnalysisResult } from "@/types";

export function analyzeArchitecture(
  repoName: string,
  primaryLanguage: string | null,
  treePaths: string[],
  techStack: TechStackItem[]
): ArchitectureAnalysisResult {
  const pathsStr = treePaths.join("\n").toLowerCase();
  const techNames = techStack.map((t) => t.name.toLowerCase());

  // 1. Frontend Structure
  let frontendStructure = "Client Web Interface";
  if (pathsStr.includes("app/layout") || pathsStr.includes("app/page")) {
    frontendStructure = "Next.js App Router Architecture (React Server Components, Layouts, Client Components)";
  } else if (pathsStr.includes("pages/_app") || pathsStr.includes("pages/index")) {
    frontendStructure = "Next.js Pages Router Architecture (File-based page routing in /pages)";
  } else if (techNames.includes("react")) {
    frontendStructure = "Single Page Application (React Component hierarchy in /src)";
  } else if (techNames.includes("vue.js") || techNames.includes("nuxt")) {
    frontendStructure = "Vue / Nuxt Architecture (Single File Components in /components & /pages)";
  } else if (techNames.includes("flutter")) {
    frontendStructure = "Flutter Cross-Platform Architecture (Widget Tree in /lib)";
  } else if (techNames.includes("angular")) {
    frontendStructure = "Angular Enterprise Frontend Architecture (/src/app modules)";
  }

  // 2. Backend Structure
  let backendStructure = "API & Service Layer";
  if (pathsStr.includes("app/actions") || pathsStr.includes("app/api")) {
    backendStructure = "Next.js Fullstack Architecture (Server Actions & Serverless API Routes)";
  } else if (pathsStr.includes("controllers/") || pathsStr.includes("services/")) {
    backendStructure = "Layered Architecture (Controller-Service-Repository Pattern)";
  } else if (techNames.includes("express.js") || techNames.includes("nestjs") || techNames.includes("fastify")) {
    backendStructure = "Node.js RESTful Backend API Microservice";
  } else if (techNames.includes("django") || techNames.includes("flask") || techNames.includes("fastapi")) {
    backendStructure = "Python WSGI/ASGI Server Architecture";
  } else if (techNames.includes("spring boot")) {
    backendStructure = "Java Spring Boot Enterprise MVC Architecture";
  } else if (techNames.includes("actix web") || techNames.includes("axum")) {
    backendStructure = "Rust Async HTTP Microservice";
  }

  // 3. API Routes Detection
  let apiRoutes = "Standard REST / Action Handlers";
  if (pathsStr.includes("app/api")) {
    apiRoutes = "Next.js Route Handlers in /app/api directory";
  } else if (pathsStr.includes("pages/api")) {
    apiRoutes = "Next.js Serverless API Functions in /pages/api";
  } else if (pathsStr.includes("app/actions")) {
    apiRoutes = "Next.js Server Actions (Type-safe direct server invocations)";
  } else if (pathsStr.includes("routes/")) {
    apiRoutes = "Dedicated Express/Fastify API router module (/routes)";
  } else if (pathsStr.includes("controllers/")) {
    apiRoutes = "REST Controllers mapping HTTP verbs to business logic (/controllers)";
  } else if (pathsStr.includes("urls.py")) {
    apiRoutes = "Django URL patterns mapping endpoints to views";
  }

  // 4. Components & UI Layer
  let componentsLayer = "Modular UI Components";
  if (pathsStr.includes("components/ui")) {
    componentsLayer = "Atomic UI Primitives system (/components/ui) with reusable page components (/components)";
  } else if (pathsStr.includes("src/components") || pathsStr.includes("components/")) {
    componentsLayer = "Modular Component Hierarchy (/components & /hooks)";
  } else if (pathsStr.includes("lib/widgets")) {
    componentsLayer = "Flutter UI Widget Tree (/lib/widgets)";
  }

  // 5. Database Layer
  let databaseLayer = "No dedicated ORM schema detected";
  if (pathsStr.includes("prisma/schema.prisma")) {
    databaseLayer = "Prisma ORM Database Schema & Automated Migrations (/prisma)";
  } else if (pathsStr.includes("drizzle.config") || pathsStr.includes("db/schema")) {
    databaseLayer = "Drizzle Type-Safe Database Schema Layer";
  } else if (pathsStr.includes("models/") || pathsStr.includes("entities/")) {
    databaseLayer = "Object-Relational Mapping (ORM) Entity Layer (/models)";
  } else if (techNames.includes("mongodb") || techNames.includes("mongoose")) {
    databaseLayer = "MongoDB Document Schema via Mongoose ODM";
  } else if (techNames.includes("supabase")) {
    databaseLayer = "Supabase PostgreSQL Database with Row Level Security (RLS)";
  }

  // 6. Key Architecture Highlights
  const highlights: string[] = [
    `Language & Stack: ${primaryLanguage || "Polyglot"} ecosystem with ${techStack.length} detected technologies`,
    `Frontend Design: ${frontendStructure}`,
    `Backend & API Routing: ${backendStructure} (${apiRoutes})`,
    `UI & Component Isolation: ${componentsLayer}`,
    `Data Persistence: ${databaseLayer}`,
  ];

  const overview = `${repoName} uses a ${frontendStructure} paired with ${backendStructure}. API routes are organized via ${apiRoutes}, and data persistence is backed by ${databaseLayer}.`;

  return {
    overview,
    frontendStructure,
    backendStructure,
    apiRoutes,
    componentsLayer,
    databaseLayer,
    highlights,
  };
}
