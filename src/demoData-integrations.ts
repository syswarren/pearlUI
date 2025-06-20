import { Integration, IntegrationCategory } from '@/types/integrations';

export const integrationCategories: IntegrationCategory[] = [
  {
    id: 'crm',
    name: 'CRM',
    description: 'Customer relationship management systems',
    icon: '👥'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Calendar and scheduling tools',
    icon: '📅'
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Team communication platforms',
    icon: '💬'
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Productivity and project management tools',
    icon: '⚡'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Data analytics and reporting tools',
    icon: '📊'
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Other integrations',
    icon: '🔗'
  }
];

export const integrations: Integration[] = [
  // Active Integrations
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Connect your Salesforce CRM to sync leads, contacts, and opportunities',
    icon: '/integration/salesforce.png',
    category: 'crm',
    status: 'active',
    isConnected: true,
    lastSync: '2024-01-15T10:30:00Z',
    connectionDetails: {
      accountName: 'Acme Corp',
      email: 'admin@acmecorp.com'
    },
    capabilities: ['Lead Sync', 'Contact Sync', 'Opportunity Sync', 'Activity Tracking'],
    setupUrl: '/integrations/salesforce/setup',
    disconnectUrl: '/integrations/salesforce/disconnect',
    syncUrl: '/integrations/salesforce/sync',
    color: '#00A1E0',
    isPopular: true
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Sync your HubSpot contacts and deals with Pearl',
    icon: '/integration/hubspot.png',
    category: 'crm',
    status: 'active',
    isConnected: true,
    lastSync: '2024-01-14T15:45:00Z',
    connectionDetails: {
      accountName: 'Acme Corp HubSpot',
      email: 'admin@acmecorp.com'
    },
    capabilities: ['Contact Sync', 'Deal Sync', 'Company Sync', 'Email Tracking'],
    setupUrl: '/integrations/hubspot/setup',
    disconnectUrl: '/integrations/hubspot/disconnect',
    syncUrl: '/integrations/hubspot/sync',
    color: '#FF7A59',
    isPopular: true
  },

  // Available Integrations
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync your Google Calendar events and meetings',
    icon: '/integration/googlecalendar.png',
    category: 'calendar',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Event Sync', 'Meeting Scheduling', 'Availability Sync'],
    setupUrl: '/integrations/google-calendar/setup',
    color: '#4285F4',
    isPopular: true
  },
  {
    id: 'outlook-calendar',
    name: 'Outlook Calendar',
    description: 'Connect your Microsoft Outlook calendar',
    icon: '/integration/outlook.png',
    category: 'calendar',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Event Sync', 'Meeting Scheduling', 'Availability Sync'],
    setupUrl: '/integrations/outlook-calendar/setup',
    color: '#0078D4'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Connect your Slack workspace for team notifications',
    icon: '/integration/Slack.png',
    category: 'communication',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Team Notifications', 'Channel Integration', 'Message Sync'],
    setupUrl: '/integrations/slack/setup',
    color: '#4A154B',
    isPopular: true
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Integrate with Microsoft Teams for collaboration',
    icon: '💬',
    category: 'communication',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Team Notifications', 'Channel Integration', 'Meeting Integration'],
    setupUrl: '/integrations/microsoft-teams/setup',
    color: '#6264A7'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sync your Notion databases and pages',
    icon: '📝',
    category: 'productivity',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Database Sync', 'Page Sync', 'Template Sharing'],
    setupUrl: '/integrations/notion/setup',
    color: '#000000',
    isNew: true
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Connect your Asana projects and tasks',
    icon: '📋',
    category: 'productivity',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Project Sync', 'Task Sync', 'Team Collaboration'],
    setupUrl: '/integrations/asana/setup',
    color: '#F06A6A'
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Sync your Trello boards and cards',
    icon: '📋',
    category: 'productivity',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Board Sync', 'Card Sync', 'List Management'],
    setupUrl: '/integrations/trello/setup',
    color: '#0079BF'
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Connect your Google Analytics data',
    icon: '📊',
    category: 'analytics',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Data Sync', 'Report Generation', 'Metrics Tracking'],
    setupUrl: '/integrations/google-analytics/setup',
    color: '#F9AB00'
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    description: 'Integrate with Mixpanel for user analytics',
    icon: '📊',
    category: 'analytics',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Event Tracking', 'User Analytics', 'Funnel Analysis'],
    setupUrl: '/integrations/mixpanel/setup',
    color: '#7E57C2'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect thousands of apps through Zapier',
    icon: '🔗',
    category: 'other',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Workflow Automation', 'App Integration', 'Custom Triggers'],
    setupUrl: '/integrations/zapier/setup',
    color: '#FF4A00'
  },
  {
    id: 'webhook',
    name: 'Webhooks',
    description: 'Set up custom webhooks for real-time data sync',
    icon: '🔗',
    category: 'other',
    status: 'inactive',
    isConnected: false,
    capabilities: ['Custom Integration', 'Real-time Sync', 'API Endpoints'],
    setupUrl: '/integrations/webhook/setup',
    color: '#6B7280'
  }
]; 