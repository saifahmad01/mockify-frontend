export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface Organization {
  id: number;
  name: string;
  ownerId: number;
  ownerName: string;
  createdAt: string;
  projectCount: number;
}

export interface OrganizationDetail {
  id: number;
  name: string;
  owner: User;
  createdAt: string;
  projects: ProjectSummary[];
}

export interface ProjectSummary {
  id: number;
  name: string;
  schemaCount: number;
  createdAt: string;
}

export interface Project {
  id: number;
  name: string;
  organizationId: number;
  organizationName: string;
  createdAt: string;
  schemaCount: number;
  totalRecords: number;
}

export interface ProjectDetail {
  id: number;
  name: string;
  organization: {
    id: number;
    name: string;
  };
  createdAt: string;
  schemas: MockSchemaSummary[];
  stats: ProjectStats;
}

export interface ProjectStats {
  totalSchemas: number;
  totalRecords: number;
  activeRecords: number;
  expiredRecords: number;
}

export interface MockSchemaSummary {
  id: number;
  name: string;
  recordCount: number;
  createdAt: string;
}

export interface MockSchema {
  id: number;
  name: string;
  projectId: number;
  projectName: string;
  schemaJson: Record<string, object>;
  createdAt: string;
  recordCount: number;
  endpointUrl: string;
}

export interface MockSchemaDetail {
  id: number;
  name: string;
  project: {
    id: number;
    name: string;
    organizationName: string;
  };
  schemaJson: Record<string, object>;
  createdAt: string;
  stats: SchemaStats;
  recentRecords: MockRecordSummary[];
}

export interface SchemaStats {
  totalRecords: number;
  activeRecords: number;
  expiredRecords: number;
  oldestRecord?: string;
  newestRecord?: string;
}

export interface MockRecordSummary {
  id: number;
  data: Record<string, any>;
  createdAt: string;
  expiresAt: string;
  expired: boolean;
}

export interface MockRecord {
  id: number;
  schemaId: number;
  schemaName: string;
  data: Record<string, any>;
  createdAt: string;
  expiresAt: string;
  expired: boolean;
  ttlMinutes: number;
}

export interface ApiError {
  status: number;
  error: string;
  message: string;
  timestamp: string;
  path: string;
  validationErrors?: Record<string, string[]>;
}
