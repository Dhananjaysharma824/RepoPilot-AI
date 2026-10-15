import { GithubRepository } from "@/lib/github";

export type { GithubRepository };

export type TechCategory =
  | 'Language'
  | 'Framework'
  | 'Styling'
  | 'Database'
  | 'Tool'
  | 'Testing'
  | 'Package Manager'
  | 'Build Tool';

export interface TechStackItem {
  name: string;
  category: TechCategory;
  iconName?: string;
  version?: string;
}

export interface CategorizedTechStack {
  frontend: TechStackItem[];
  backend: TechStackItem[];
  database: TechStackItem[];
  styling: TechStackItem[];
  toolsAndPackageManagers: TechStackItem[];
  testing: TechStackItem[];
  languages: TechStackItem[];
}

export interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  path?: string;
  children?: TreeNode[];
}

export interface RootFolderItem {
  name: string;
  path: string;
  description: string;
  fileCount?: number;
}

export interface ImportantFileItem {
  name: string;
  path: string;
  description: string;
  size?: string;
}

export interface StructureAnalysis {
  rootFolders: RootFolderItem[];
  importantFiles: ImportantFileItem[];
  totalFiles: number;
  totalFolders: number;
}

export interface ArchitectureAnalysisResult {
  overview: string;
  frontendStructure: string;
  backendStructure: string;
  apiRoutes: string;
  componentsLayer: string;
  databaseLayer: string;
  highlights: string[];
}

export interface RoadmapStep {
  stepNumber: number;
  title: string;
  description: string;
  techName: string;
  category?: string;
}

export interface GeminiInsights {
  complexityLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedLearningTime: string;
  recommendedSkills: string[];
  keyConceptsToLearnFirst: string[];
}

// 13-Section Senior Developer Onboarding & Code Understanding Assistant Data Contract
export interface SeniorMentorAnalysis {
  // Section 1 - Project Purpose
  purpose: {
    whatItIs: string;
    whyItExists: string;
    targetAudience: string;
    problemSolved: string;
    realWorldUseCases: string[];
    businessValue: string;
  };

  // Section 2 - Executive Summary
  executiveSummary: {
    mainResponsibility: string;
    coreFunctionality: string;
    targetAudienceSummary: string;
    majorArchitecturalDecisions: string[];
  };

  // Section 3 - Architecture Explanation
  architectureDetails: {
    overallStyle: string;
    monolithOrModular: string;
    frontendLayer: string;
    backendLayer: string;
    dataLayer: string;
    apiLayer: string;
    authLayer: string;
    deploymentConsiderations: string;
  };

  // Section 4 - Important Folders (Ranked)
  rankedFolders: {
    folderName: string;
    rank: number;
    whyExists: string;
    codeBelongingThere: string;
    whatToLearnFromIt: string;
    isCritical: boolean;
  }[];

  // Section 5 - Technology Explanation
  explainedTechnologies: {
    name: string;
    category: string;
    whyUsed: string;
    rolePlayed: string;
    systemInteraction: string;
  }[];

  // Section 6 - New Developer Onboarding Guide
  onboardingGuide: {
    step1WhatToReadFirst: string;
    step2FoldersToExplore: string;
    step3AppFlow: string;
    step4DataFlow: string;
    step5HowToStartContributing: string;
  };

  // Section 7 - Code Reading Strategy
  codeReadingStrategy: {
    initialFiles: { path: string; reason: string }[];
    subsequentFolders: { path: string; reason: string }[];
    recommendedOrder: string[];
  };

  // Section 8 - Phased Learning Roadmap
  phasedRoadmap: {
    phase: string;
    focusArea: string;
    actionableGoal: string;
  }[];

  // Section 9 - Difficulty Assessment
  difficultyAssessment: {
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    reasoning: string;
    factors: {
      codebaseSize: string;
      architectureComplexity: string;
      techStackBreadth: string;
      experienceRequired: string;
    };
  };

  // Section 10 - Learning Time Estimate
  timeEstimate: {
    basicUnderstanding: string;
    contributionReady: string;
    advancedMastery: string;
    reasoning: string;
  };

  // Section 11 - Key Concepts
  keyConcepts: {
    conceptName: string;
    explanation: string;
    whyItMatters: string;
    repoLocation: string;
  }[];

  // Section 12 - Contributor Guidance
  contributorGuidance: {
    goodFirstTasks: string[];
    easyModulesToUnderstand: string[];
    areasToAvoidInitially: string[];
    recommendedContributionPath: string;
  };

  // Section 13 - AI Expert Architectural Insights
  expertInsights: {
    strengths: string[];
    potentialChallenges: string[];
    scalabilityConsiderations: string;
    maintainabilityObservations: string;
    uniqueCharacteristics: string;
  };
}

export interface GeminiAnalysisResult {
  projectOverview: string;
  problemSolved: string;
  mainTechnologies: { name: string; purpose: string }[];
  architectureExplanation: string;
  importantFoldersAndFiles: { name: string; description: string }[];
  suggestedLearningOrder: string[];
  developerOnboardingSummary: string;
  insights: GeminiInsights;
  mentorAnalysis: SeniorMentorAnalysis;
  isAIContent?: boolean;
}

export interface RepositoryAnalysis {
  id: string;
  name: string;
  owner: string;
  url: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  license: string;
  lastUpdated: string;
  primaryLanguage: string | null;
  techStack: TechStackItem[];
  categorizedTechStack: CategorizedTechStack;
  structure: StructureAnalysis;
  folderStructure: TreeNode[];
  architecture: ArchitectureAnalysisResult;
  roadmap: RoadmapStep[];
  geminiSummary?: GeminiAnalysisResult;
  aiSummary: {
    overview: string;
    keyFeatures: string[];
    architecturePoints: string[];
    onboardingSteps: string[];
  };
}

export interface RecentAnalysisItem {
  id: string;
  repoName: string;
  owner: string;
  repoUrl: string;
  analyzedAt: string;
  stars: number;
  primaryLanguage: string;
  status: 'Completed' | 'Processing' | 'Failed';
}

export interface DashboardStats {
  repositoriesAnalyzed: number;
  aiSummariesGenerated: number;
  savedReports: number;
}
