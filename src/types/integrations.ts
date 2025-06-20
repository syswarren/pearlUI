export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'crm' | 'calendar' | 'communication' | 'productivity' | 'analytics' | 'other';
  status: 'active' | 'inactive' | 'pending' | 'error';
  isConnected: boolean;
  lastSync?: string;
  connectionDetails?: {
    accountName?: string;
    email?: string;
    workspace?: string;
  };
  capabilities: string[];
  setupUrl?: string;
  disconnectUrl?: string;
  syncUrl?: string;
  color?: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface IntegrationCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface IntegrationSearchFilters {
  category?: string;
  status?: string;
  search?: string;
} 