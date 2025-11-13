export enum OptimizationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface OptimizationResult {
  original: string;
  optimized: string;
  timestamp: number;
}

export interface PromptRequest {
  idea: string;
  tone?: string;
}