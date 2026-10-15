import { GoogleGenAI } from "@google/genai";
import { GeminiAnalysisResult, SeniorMentorAnalysis, TechStackItem, RootFolderItem } from "@/types";

/**
 * In-memory response cache to prevent duplicate Gemini API calls for the same repository.
 */
const geminiCacheMap = new Map<string, GeminiAnalysisResult>();

export interface GenerateGeminiSummaryParams {
  owner: string;
  repo: string;
  description: string | null;
  primaryLanguage: string | null;
  stars: number;
  forks: number;
  techStack: TechStackItem[];
  rootFolders: RootFolderItem[];
  readmeContent?: string | null;
  packageJsonContent?: string | null;
}

/**
 * Generate comprehensive heuristic Senior Mentor AI summary when Gemini API key is unavailable or API fails.
 */
function generateFallbackSummary(params: GenerateGeminiSummaryParams): GeminiAnalysisResult {
  const { repo, owner, description, primaryLanguage, techStack, rootFolders } = params;
  const techNames = techStack.map((t) => t.name);
  const lang = primaryLanguage || (techNames.length > 0 ? techNames[0] : "Polyglot");
  const framework = techStack.find((t) => t.category === "Framework")?.name || "Web Application Framework";
  const database = techStack.find((t) => t.category === "Database")?.name || "Data Persistence Layer";

  const isAdvanced = techStack.length > 8 || rootFolders.length > 6;
  const isIntermediate = techStack.length > 4 || rootFolders.length > 3;
  const complexityLevel: "Beginner" | "Intermediate" | "Advanced" = isAdvanced ? "Advanced" : isIntermediate ? "Intermediate" : "Beginner";
  const estimatedTime = isAdvanced ? "2-3 weeks" : isIntermediate ? "1-2 weeks" : "3-5 days";

  const mentorAnalysis: SeniorMentorAnalysis = {
    purpose: {
      whatItIs: `${repo} is a ${lang}-driven software solution built by ${owner}. It combines modern architecture with ${framework} to deliver structured application capabilities.`,
      whyItExists: `Developed to provide a maintainable, high-performance platform for ${description || "managing complex software workflows"}.`,
      targetAudience: `Full-stack engineers, technical architects, and developers seeking production-grade ${lang} patterns.`,
      problemSolved: `Eliminates boilerplate code overhead, standardizes file structures, and streamlines state management with ${framework}.`,
      realWorldUseCases: [
        `Building scalable ${framework} applications`,
        `Managing structured data models using ${database}`,
        `Standardizing project onboarding for team members`,
      ],
      businessValue: `Reduces technical debt, improves developer velocity, and establishes predictable maintenance workflows.`,
    },
    executiveSummary: {
      mainResponsibility: `Serves as the core codebase and execution runtime for ${repo}.`,
      coreFunctionality: `Orchestrates data fetching, UI state rendering, and domain logic across ${rootFolders.length || 3} primary system modules.`,
      targetAudienceSummary: `Ideal for ${lang} developers looking to understand or extend ${repo}.`,
      majorArchitecturalDecisions: [
        `Selected ${framework} as the application foundation`,
        `Organized code into clear top-level modules (${rootFolders.map((r) => r.name).join(", ") || "src"})`,
        `Enforced clean separation between view components and data services`,
      ],
    },
    architectureDetails: {
      overallStyle: `Layered Component-Driven Architecture`,
      monolithOrModular: `Modular Repository Layout`,
      frontendLayer: techStack.some((t) => t.category === "Framework" || t.category === "Styling")
        ? `Component-based user interface powered by ${framework} and responsive styling.`
        : `Modular view rendering layer.`,
      backendLayer: techStack.some((t) => t.category === "Framework" || t.name.includes("Express") || t.name.includes("Next"))
        ? `Server-side routing and domain business logic execution.`
        : `Service and handler layer.`,
      dataLayer: `Data persistence layer structured around ${database}.`,
      apiLayer: `RESTful / JSON route handlers and controller abstractions.`,
      authLayer: `Session & middleware security checks.`,
      deploymentConsiderations: `Configured for cloud-native deployment or modern serverless platforms.`,
    },
    rankedFolders: rootFolders.map((rf, idx) => ({
      folderName: `/${rf.name}`,
      rank: idx + 1,
      whyExists: rf.description || `Houses domain modules and assets for ${rf.name}.`,
      codeBelongingThere: `Core functions, components, and helper utilities specific to ${rf.name}.`,
      whatToLearnFromIt: `Observe how ${rf.name} isolates responsibilities and manages dependencies.`,
      isCritical: idx < 3,
    })),
    explainedTechnologies: techStack.map((t) => ({
      name: t.name,
      category: t.category,
      whyUsed: `Industry-standard tool for ${t.category.toLowerCase()} management.`,
      rolePlayed: `Powers ${t.category.toLowerCase()} operations within ${repo}.`,
      systemInteraction: `Integrates directly with ${lang} modules and application entry points.`,
    })),
    onboardingGuide: {
      step1WhatToReadFirst: `Begin by examining root configuration files and documentation (README.md, package.json).`,
      step2FoldersToExplore: `Review key directories: ${rootFolders.map((r) => `/${r.name}`).join(", ") || "/src"}.`,
      step3AppFlow: `Trace execution from main entry scripts down through component modules.`,
      step4DataFlow: `Follow data mutations from user actions to state updates and backend services.`,
      step5HowToStartContributing: `Pick a good first issue, set up your local environment, and submit a pull request.`,
    },
    codeReadingStrategy: {
      initialFiles: [
        { path: "README.md", reason: "Understand high-level goal, prerequisites, and setup instructions." },
        { path: "package.json / config", reason: "Inspect project dependencies, scripts, and build tools." },
      ],
      subsequentFolders: rootFolders.slice(0, 3).map((rf) => ({
        path: `/${rf.name}`,
        reason: `Study component layout and business logic inside ${rf.name}.`,
      })),
      recommendedOrder: [
        "1. Root configuration files & manifests",
        "2. Main application entry points & routing handlers",
        "3. Core components & domain logic",
        "4. Data access layers & utility helpers",
      ],
    },
    phasedRoadmap: [
      { phase: "Week 1: Foundations", focusArea: "Setup & Architecture", actionableGoal: "Run application locally and map out top-level routes." },
      { phase: "Week 2: Core Components", focusArea: "UI & Business Logic", actionableGoal: "Inspect component hierarchy and state mutations." },
      { phase: "Week 3: Deep Dive", focusArea: "API & Data Layers", actionableGoal: "Understand data persistence and external integrations." },
      { phase: "Week 4: Contribution", focusArea: "Bugfixes & Features", actionableGoal: "Implement a feature or documentation improvement." },
    ],
    difficultyAssessment: {
      level: complexityLevel,
      reasoning: `Assessed based on ${techStack.length} detected technologies and ${rootFolders.length} top-level folders.`,
      factors: {
        codebaseSize: rootFolders.length > 5 ? "Substantial multi-module codebase" : "Compact modular codebase",
        architectureComplexity: isAdvanced ? "High - Multi-layered distributed structure" : isIntermediate ? "Moderate - Standard modular architecture" : "Simple - Straightforward single-layer layout",
        techStackBreadth: techNames.slice(0, 4).join(", ") || "Standard dependencies",
        experienceRequired: complexityLevel === "Advanced" ? "Senior developer familiar with complex systems" : complexityLevel === "Intermediate" ? "Mid-level developer experienced in " + lang : "Beginner to early mid-level developer",
      },
    },
    timeEstimate: {
      basicUnderstanding: "2 - 3 Days",
      contributionReady: "1 - 2 Weeks",
      advancedMastery: "1 - 2 Months",
      reasoning: `Estimates reflect codebase modularity and learning curve of ${lang} with ${framework}.`,
    },
    keyConcepts: [
      {
        conceptName: "Modular Component Architecture",
        explanation: "Separating UI and business logic into isolated, testable modules.",
        whyItMatters: "Prevents code tight-coupling and simplifies maintenance.",
        repoLocation: rootFolders[0]?.name ? `/${rootFolders[0].name}` : "/src",
      },
      {
        conceptName: "Data Flow & State Management",
        explanation: "Handling data mutations and UI sync across the application.",
        whyItMatters: "Ensures UI consistency and reliable user interaction.",
        repoLocation: rootFolders[1]?.name ? `/${rootFolders[1].name}` : "/lib",
      },
    ],
    contributorGuidance: {
      goodFirstTasks: [
        "Add JSDoc or inline comments to complex functions",
        "Improve error boundary messaging",
        "Add unit tests for core helper utilities",
      ],
      easyModulesToUnderstand: rootFolders.slice(0, 2).map((r) => `/${r.name}`),
      areasToAvoidInitially: ["Core environment setup", "Global routing state engine"],
      recommendedContributionPath: "Start with non-breaking UI or utility enhancements before modifying core domain logic.",
    },
    expertInsights: {
      strengths: [
        "Clear folder separation adhering to modern best practices",
        `Effective utilization of ${lang} features`,
        "Scalable modular design ready for feature expansion",
      ],
      potentialChallenges: [
        "Requires familiarity with modern async state patterns",
        `New developers must learn ${framework} conventions`,
      ],
      scalabilityConsiderations: `Modular layout allows adding new endpoints and components without refactoring core logic.`,
      maintainabilityObservations: `Predictable folder hierarchy makes tracking bugs and adding tests straightforward.`,
      uniqueCharacteristics: `Combines robust ${lang} execution with flexible ${framework} component design.`,
    },
  };

  return {
    projectOverview: `${repo} is a ${lang}-based software application by ${owner}. ${description || "Designed to provide modern application functionality with modular component design."}`,
    problemSolved: `${repo} simplifies developer workflows and application state management by providing structured codebase patterns with ${framework}.`,
    mainTechnologies: techStack.map((t) => ({
      name: t.name,
      purpose: `${t.category} dependency powering ${t.name.toLowerCase()} features in ${repo}.`,
    })),
    architectureExplanation: `The repository is organized around a ${framework} core architecture. Top-level modules reside in ${rootFolders.map((r) => `/${r.name}`).join(", ") || "/src"}.`,
    importantFoldersAndFiles: rootFolders.map((rf) => ({
      name: `/${rf.name}`,
      description: rf.description || `Directory containing ${rf.name} source modules.`,
    })),
    suggestedLearningOrder: [
      `1. Review core ${lang} syntax and configuration files.`,
      `2. Study entry points and routing structure in ${rootFolders[0]?.name ? `/${rootFolders[0].name}` : "source directory"}.`,
      `3. Explore ${framework} integration and component state.`,
      `4. Inspect ${database} data access patterns and local setup steps.`,
    ],
    developerOnboardingSummary: `To contribute to ${repo}, first familiarize yourself with ${lang} and ${framework}. Clone the repository, install dependencies, and explore key folder entry points.`,
    insights: {
      complexityLevel,
      estimatedLearningTime: estimatedTime,
      recommendedSkills: [lang, framework, ...techNames.slice(0, 3)],
      keyConceptsToLearnFirst: [
        `${lang} Syntax & Conventions`,
        `${framework} Modular Architecture`,
        "Folder Tree Structure & Entry Points",
      ],
    },
    mentorAnalysis,
    isAIContent: false,
  };
}

/**
 * Main Gemini AI Repository Analysis function with caching & error handling.
 */
export async function generateGeminiRepositorySummary(
  params: GenerateGeminiSummaryParams
): Promise<GeminiAnalysisResult> {
  const cacheKey = `${params.owner}/${params.repo}`.toLowerCase();

  if (geminiCacheMap.has(cacheKey)) {
    return geminiCacheMap.get(cacheKey)!;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your-gemini-api-key") {
    const fallback = generateFallbackSummary(params);
    geminiCacheMap.set(cacheKey, fallback);
    return fallback;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const techListStr = params.techStack.map((t) => `${t.name} (${t.category})`).join(", ");
    const foldersStr = params.rootFolders.map((f) => `${f.name}: ${f.description}`).join("; ");
    const readmeText = params.readmeContent ? params.readmeContent.slice(0, 2000) : "Not available";

    const prompt = `
You are a Staff Software Engineer, Technical Architect, and Developer Mentor explaining the GitHub repository "${params.owner}/${params.repo}" to a new developer joining the team.

Repository Context:
- Name: ${params.repo}
- Owner: ${params.owner}
- Description: ${params.description || "N/A"}
- Primary Language: ${params.primaryLanguage || "Multi-language"}
- Stars: ${params.stars} | Forks: ${params.forks}
- Detected Tech Stack: ${techListStr || "Standard Web Stack"}
- Root Folders: ${foldersStr || "src, public"}
- Readme Excerpt: ${readmeText}

Produce a detailed human-readable mentor analysis in valid JSON format. Act like an experienced senior engineer explaining the repository to a new colleague.

Required JSON Structure:
{
  "projectOverview": "Comprehensive 2-3 sentence project overview.",
  "problemSolved": "Detailed problem solved by this project.",
  "mainTechnologies": [
    { "name": "Tech Name", "purpose": "Role played" }
  ],
  "architectureExplanation": "High-level overview of application architecture.",
  "importantFoldersAndFiles": [
    { "name": "/folderOrFile", "description": "Why it matters" }
  ],
  "suggestedLearningOrder": ["Step 1...", "Step 2..."],
  "developerOnboardingSummary": "Onboarding summary for new developer.",
  "insights": {
    "complexityLevel": "Beginner" | "Intermediate" | "Advanced",
    "estimatedLearningTime": "e.g. 1-2 weeks",
    "recommendedSkills": ["Skill 1", "Skill 2"],
    "keyConceptsToLearnFirst": ["Concept 1", "Concept 2"]
  },
  "mentorAnalysis": {
    "purpose": {
      "whatItIs": "Detailed explanation of what this project is.",
      "whyItExists": "Why this project was created.",
      "targetAudience": "Who uses this project.",
      "problemSolved": "Real-world problem solved.",
      "realWorldUseCases": ["Use case 1", "Use case 2"],
      "businessValue": "Business value delivered."
    },
    "executiveSummary": {
      "mainResponsibility": "Main responsibility of repo.",
      "coreFunctionality": "Core functionality.",
      "targetAudienceSummary": "Audience summary.",
      "majorArchitecturalDecisions": ["Decision 1", "Decision 2"]
    },
    "architectureDetails": {
      "overallStyle": "e.g. Monolithic / Layered / Microservices",
      "monolithOrModular": "e.g. Modular Monolith",
      "frontendLayer": "Explanation of frontend layer",
      "backendLayer": "Explanation of backend layer",
      "dataLayer": "Explanation of database layer",
      "apiLayer": "Explanation of API layer",
      "authLayer": "Explanation of auth layer",
      "deploymentConsiderations": "Deployment explanation"
    },
    "rankedFolders": [
      {
        "folderName": "/folder",
        "rank": 1,
        "whyExists": "Why this folder exists",
        "codeBelongingThere": "What code lives here",
        "whatToLearnFromIt": "What developer should learn",
        "isCritical": true
      }
    ],
    "explainedTechnologies": [
      {
        "name": "Technology",
        "category": "Category",
        "whyUsed": "Why used",
        "rolePlayed": "Role played",
        "systemInteraction": "How it interacts with system"
      }
    ],
    "onboardingGuide": {
      "step1WhatToReadFirst": "Step 1 details",
      "step2FoldersToExplore": "Step 2 details",
      "step3AppFlow": "Step 3 details",
      "step4DataFlow": "Step 4 details",
      "step5HowToStartContributing": "Step 5 details"
    },
    "codeReadingStrategy": {
      "initialFiles": [{ "path": "file", "reason": "reason" }],
      "subsequentFolders": [{ "path": "folder", "reason": "reason" }],
      "recommendedOrder": ["1...", "2..."]
    },
    "phasedRoadmap": [
      { "phase": "Week 1", "focusArea": "Focus", "actionableGoal": "Goal" }
    ],
    "difficultyAssessment": {
      "level": "Beginner" | "Intermediate" | "Advanced",
      "reasoning": "Reasoning",
      "factors": {
        "codebaseSize": "Size factor",
        "architectureComplexity": "Complexity factor",
        "techStackBreadth": "Breadth factor",
        "experienceRequired": "Experience needed"
      }
    },
    "timeEstimate": {
      "basicUnderstanding": "2-3 Days",
      "contributionReady": "1-2 Weeks",
      "advancedMastery": "1-2 Months",
      "reasoning": "Time reasoning"
    },
    "keyConcepts": [
      {
        "conceptName": "Concept",
        "explanation": "Explanation",
        "whyItMatters": "Why it matters",
        "repoLocation": "/location"
      }
    ],
    "contributorGuidance": {
      "goodFirstTasks": ["Task 1", "Task 2"],
      "easyModulesToUnderstand": ["Module 1"],
      "areasToAvoidInitially": ["Area 1"],
      "recommendedContributionPath": "Contribution path"
    },
    "expertInsights": {
      "strengths": ["Strength 1"],
      "potentialChallenges": ["Challenge 1"],
      "scalabilityConsiderations": "Scalability explanation",
      "maintainabilityObservations": "Maintainability observation",
      "uniqueCharacteristics": "Unique characteristics"
    }
  }
}

Return ONLY the raw JSON object.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response returned from Gemini API.");
    }

    const cleanedJsonText = responseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsedData = JSON.parse(cleanedJsonText);
    const fallback = generateFallbackSummary(params);

    const result: GeminiAnalysisResult = {
      projectOverview: parsedData.projectOverview || fallback.projectOverview,
      problemSolved: parsedData.problemSolved || fallback.problemSolved,
      mainTechnologies: Array.isArray(parsedData.mainTechnologies)
        ? parsedData.mainTechnologies
        : fallback.mainTechnologies,
      architectureExplanation: parsedData.architectureExplanation || fallback.architectureExplanation,
      importantFoldersAndFiles: Array.isArray(parsedData.importantFoldersAndFiles)
        ? parsedData.importantFoldersAndFiles
        : fallback.importantFoldersAndFiles,
      suggestedLearningOrder: Array.isArray(parsedData.suggestedLearningOrder)
        ? parsedData.suggestedLearningOrder
        : fallback.suggestedLearningOrder,
      developerOnboardingSummary: parsedData.developerOnboardingSummary || fallback.developerOnboardingSummary,
      insights: {
        complexityLevel: ["Beginner", "Intermediate", "Advanced"].includes(parsedData.insights?.complexityLevel)
          ? parsedData.insights.complexityLevel
          : fallback.insights.complexityLevel,
        estimatedLearningTime: parsedData.insights?.estimatedLearningTime || fallback.insights.estimatedLearningTime,
        recommendedSkills: Array.isArray(parsedData.insights?.recommendedSkills)
          ? parsedData.insights.recommendedSkills
          : fallback.insights.recommendedSkills,
        keyConceptsToLearnFirst: Array.isArray(parsedData.insights?.keyConceptsToLearnFirst)
          ? parsedData.insights.keyConceptsToLearnFirst
          : fallback.insights.keyConceptsToLearnFirst,
      },
      mentorAnalysis: parsedData.mentorAnalysis ? {
        purpose: {
          whatItIs: parsedData.mentorAnalysis.purpose?.whatItIs || fallback.mentorAnalysis.purpose.whatItIs,
          whyItExists: parsedData.mentorAnalysis.purpose?.whyItExists || fallback.mentorAnalysis.purpose.whyItExists,
          targetAudience: parsedData.mentorAnalysis.purpose?.targetAudience || fallback.mentorAnalysis.purpose.targetAudience,
          problemSolved: parsedData.mentorAnalysis.purpose?.problemSolved || fallback.mentorAnalysis.purpose.problemSolved,
          realWorldUseCases: Array.isArray(parsedData.mentorAnalysis.purpose?.realWorldUseCases)
            ? parsedData.mentorAnalysis.purpose.realWorldUseCases
            : fallback.mentorAnalysis.purpose.realWorldUseCases,
          businessValue: parsedData.mentorAnalysis.purpose?.businessValue || fallback.mentorAnalysis.purpose.businessValue,
        },
        executiveSummary: {
          mainResponsibility: parsedData.mentorAnalysis.executiveSummary?.mainResponsibility || fallback.mentorAnalysis.executiveSummary.mainResponsibility,
          coreFunctionality: parsedData.mentorAnalysis.executiveSummary?.coreFunctionality || fallback.mentorAnalysis.executiveSummary.coreFunctionality,
          targetAudienceSummary: parsedData.mentorAnalysis.executiveSummary?.targetAudienceSummary || fallback.mentorAnalysis.executiveSummary.targetAudienceSummary,
          majorArchitecturalDecisions: Array.isArray(parsedData.mentorAnalysis.executiveSummary?.majorArchitecturalDecisions)
            ? parsedData.mentorAnalysis.executiveSummary.majorArchitecturalDecisions
            : fallback.mentorAnalysis.executiveSummary.majorArchitecturalDecisions,
        },
        architectureDetails: {
          overallStyle: parsedData.mentorAnalysis.architectureDetails?.overallStyle || fallback.mentorAnalysis.architectureDetails.overallStyle,
          monolithOrModular: parsedData.mentorAnalysis.architectureDetails?.monolithOrModular || fallback.mentorAnalysis.architectureDetails.monolithOrModular,
          frontendLayer: parsedData.mentorAnalysis.architectureDetails?.frontendLayer || fallback.mentorAnalysis.architectureDetails.frontendLayer,
          backendLayer: parsedData.mentorAnalysis.architectureDetails?.backendLayer || fallback.mentorAnalysis.architectureDetails.backendLayer,
          dataLayer: parsedData.mentorAnalysis.architectureDetails?.dataLayer || fallback.mentorAnalysis.architectureDetails.dataLayer,
          apiLayer: parsedData.mentorAnalysis.architectureDetails?.apiLayer || fallback.mentorAnalysis.architectureDetails.apiLayer,
          authLayer: parsedData.mentorAnalysis.architectureDetails?.authLayer || fallback.mentorAnalysis.architectureDetails.authLayer,
          deploymentConsiderations: parsedData.mentorAnalysis.architectureDetails?.deploymentConsiderations || fallback.mentorAnalysis.architectureDetails.deploymentConsiderations,
        },
        rankedFolders: Array.isArray(parsedData.mentorAnalysis.rankedFolders)
          ? parsedData.mentorAnalysis.rankedFolders
          : fallback.mentorAnalysis.rankedFolders,
        explainedTechnologies: Array.isArray(parsedData.mentorAnalysis.explainedTechnologies)
          ? parsedData.mentorAnalysis.explainedTechnologies
          : fallback.mentorAnalysis.explainedTechnologies,
        onboardingGuide: {
          step1WhatToReadFirst: parsedData.mentorAnalysis.onboardingGuide?.step1WhatToReadFirst || fallback.mentorAnalysis.onboardingGuide.step1WhatToReadFirst,
          step2FoldersToExplore: parsedData.mentorAnalysis.onboardingGuide?.step2FoldersToExplore || fallback.mentorAnalysis.onboardingGuide.step2FoldersToExplore,
          step3AppFlow: parsedData.mentorAnalysis.onboardingGuide?.step3AppFlow || fallback.mentorAnalysis.onboardingGuide.step3AppFlow,
          step4DataFlow: parsedData.mentorAnalysis.onboardingGuide?.step4DataFlow || fallback.mentorAnalysis.onboardingGuide.step4DataFlow,
          step5HowToStartContributing: parsedData.mentorAnalysis.onboardingGuide?.step5HowToStartContributing || fallback.mentorAnalysis.onboardingGuide.step5HowToStartContributing,
        },
        codeReadingStrategy: {
          initialFiles: Array.isArray(parsedData.mentorAnalysis.codeReadingStrategy?.initialFiles)
            ? parsedData.mentorAnalysis.codeReadingStrategy.initialFiles
            : fallback.mentorAnalysis.codeReadingStrategy.initialFiles,
          subsequentFolders: Array.isArray(parsedData.mentorAnalysis.codeReadingStrategy?.subsequentFolders)
            ? parsedData.mentorAnalysis.codeReadingStrategy.subsequentFolders
            : fallback.mentorAnalysis.codeReadingStrategy.subsequentFolders,
          recommendedOrder: Array.isArray(parsedData.mentorAnalysis.codeReadingStrategy?.recommendedOrder)
            ? parsedData.mentorAnalysis.codeReadingStrategy.recommendedOrder
            : fallback.mentorAnalysis.codeReadingStrategy.recommendedOrder,
        },
        phasedRoadmap: Array.isArray(parsedData.mentorAnalysis.phasedRoadmap)
          ? parsedData.mentorAnalysis.phasedRoadmap
          : fallback.mentorAnalysis.phasedRoadmap,
        difficultyAssessment: {
          level: parsedData.mentorAnalysis.difficultyAssessment?.level || fallback.mentorAnalysis.difficultyAssessment.level,
          reasoning: parsedData.mentorAnalysis.difficultyAssessment?.reasoning || fallback.mentorAnalysis.difficultyAssessment.reasoning,
          factors: {
            codebaseSize: parsedData.mentorAnalysis.difficultyAssessment?.factors?.codebaseSize || fallback.mentorAnalysis.difficultyAssessment.factors.codebaseSize,
            architectureComplexity: parsedData.mentorAnalysis.difficultyAssessment?.factors?.architectureComplexity || fallback.mentorAnalysis.difficultyAssessment.factors.architectureComplexity,
            techStackBreadth: parsedData.mentorAnalysis.difficultyAssessment?.factors?.techStackBreadth || fallback.mentorAnalysis.difficultyAssessment.factors.techStackBreadth,
            experienceRequired: parsedData.mentorAnalysis.difficultyAssessment?.factors?.experienceRequired || fallback.mentorAnalysis.difficultyAssessment.factors.experienceRequired,
          },
        },
        timeEstimate: {
          basicUnderstanding: parsedData.mentorAnalysis.timeEstimate?.basicUnderstanding || fallback.mentorAnalysis.timeEstimate.basicUnderstanding,
          contributionReady: parsedData.mentorAnalysis.timeEstimate?.contributionReady || fallback.mentorAnalysis.timeEstimate.contributionReady,
          advancedMastery: parsedData.mentorAnalysis.timeEstimate?.advancedMastery || fallback.mentorAnalysis.timeEstimate.advancedMastery,
          reasoning: parsedData.mentorAnalysis.timeEstimate?.reasoning || fallback.mentorAnalysis.timeEstimate.reasoning,
        },
        keyConcepts: Array.isArray(parsedData.mentorAnalysis.keyConcepts)
          ? parsedData.mentorAnalysis.keyConcepts
          : fallback.mentorAnalysis.keyConcepts,
        contributorGuidance: {
          goodFirstTasks: Array.isArray(parsedData.mentorAnalysis.contributorGuidance?.goodFirstTasks)
            ? parsedData.mentorAnalysis.contributorGuidance.goodFirstTasks
            : fallback.mentorAnalysis.contributorGuidance.goodFirstTasks,
          easyModulesToUnderstand: Array.isArray(parsedData.mentorAnalysis.contributorGuidance?.easyModulesToUnderstand)
            ? parsedData.mentorAnalysis.contributorGuidance.easyModulesToUnderstand
            : fallback.mentorAnalysis.contributorGuidance.easyModulesToUnderstand,
          areasToAvoidInitially: Array.isArray(parsedData.mentorAnalysis.contributorGuidance?.areasToAvoidInitially)
            ? parsedData.mentorAnalysis.contributorGuidance.areasToAvoidInitially
            : fallback.mentorAnalysis.contributorGuidance.areasToAvoidInitially,
          recommendedContributionPath: parsedData.mentorAnalysis.contributorGuidance?.recommendedContributionPath || fallback.mentorAnalysis.contributorGuidance.recommendedContributionPath,
        },
        expertInsights: {
          strengths: Array.isArray(parsedData.mentorAnalysis.expertInsights?.strengths)
            ? parsedData.mentorAnalysis.expertInsights.strengths
            : fallback.mentorAnalysis.expertInsights.strengths,
          potentialChallenges: Array.isArray(parsedData.mentorAnalysis.expertInsights?.potentialChallenges)
            ? parsedData.mentorAnalysis.expertInsights.potentialChallenges
            : fallback.mentorAnalysis.expertInsights.potentialChallenges,
          scalabilityConsiderations: parsedData.mentorAnalysis.expertInsights?.scalabilityConsiderations || fallback.mentorAnalysis.expertInsights.scalabilityConsiderations,
          maintainabilityObservations: parsedData.mentorAnalysis.expertInsights?.maintainabilityObservations || fallback.mentorAnalysis.expertInsights.maintainabilityObservations,
          uniqueCharacteristics: parsedData.mentorAnalysis.expertInsights?.uniqueCharacteristics || fallback.mentorAnalysis.expertInsights.uniqueCharacteristics,
        },
      } : fallback.mentorAnalysis,
      isAIContent: true,
    };

    geminiCacheMap.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn("Gemini API Notice: Falling back to structured heuristic summary.", error);
    const fallback = generateFallbackSummary(params);
    geminiCacheMap.set(cacheKey, fallback);
    return fallback;
  }
}

