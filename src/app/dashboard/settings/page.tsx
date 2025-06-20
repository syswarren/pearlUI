"use client"

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Form from "@/components/Form";
import NotificationsForm from "@/components/NotificationsForm";
import MembersList, { Member } from "@/components/MembersList";

const people: Member[] = [
  { name: 'Sarah Wilson', title: 'CRO', email: 'sarah.wilson@company.com', role: 'Admin' },
  { name: 'Michael Chen', title: 'Sales Manager', email: 'michael.chen@company.com', role: 'Member' },
  { name: 'Emma Davis', title: 'Account Executive', email: 'emma.davis@company.com', role: 'Member' },
  { name: 'James Wilson', title: 'Account Executive', email: 'james.wilson@company.com', role: 'Member' },
  { name: 'Sophie Martinez', title: 'Account Executive', email: 'sophie.martinez@company.com', role: 'Member' },
  { name: 'Diego Ramirez', title: 'SDR Lead', email: 'diego.ramirez@company.com', role: 'Member' },
  { name: 'Lily Thompson', title: 'Sales Ops Specialist', email: 'lily.thompson@company.com', role: 'Member' },
  { name: 'Arjun Mehta', title: 'Enterprise AE', email: 'arjun.mehta@company.com', role: 'Member' },
  { name: 'Clara Nguyen', title: 'BDR', email: 'clara.nguyen@company.com', role: 'Member' },
  { name: 'Thomas Becker', title: 'Commercial AE', email: 'thomas.becker@company.com', role: 'Member' },
  { name: 'Zoe Tanaka', title: 'Channel Partner Manager', email: 'zoe.tanaka@company.com', role: 'Member' },
  { name: 'Rafael Moretti', title: 'VP of Sales Strategy', email: 'rafael.moretti@company.com', role: 'Member' },
  { name: 'Bianca Laurent', title: 'Account Executive', email: 'bianca.laurent@company.com', role: 'Member' },
  { name: 'Caleb Wright', title: 'Sales Enablement Manager', email: 'caleb.wright@company.com', role: 'Member' },
  { name: 'Nora Haddad', title: 'Enterprise Account Executive', email: 'nora.haddad@company.com', role: 'Member' },
  { name: 'Theo Zhang', title: 'Senior BDR', email: 'theo.zhang@company.com', role: 'Member' },
  { name: 'Priya Sharma', title: 'Sales Analyst', email: 'priya.sharma@company.com', role: 'Member' },
  { name: 'Elijah Brooks', title: 'Regional Sales Manager', email: 'elijah.brooks@company.com', role: 'Member' },
  { name: 'Camille Durand', title: 'Strategic Partnerships Exec', email: 'camille.durand@company.com', role: 'Member' },
  { name: 'Marcus Lee', title: 'Inside Sales Rep', email: 'marcus.lee@company.com', role: 'Member' },
  { name: 'Ava Richardson', title: 'Customer Success Manager', email: 'ava.richardson@company.com', role: 'Member' },
];

const navigationItems = [
  { id: 'account', label: 'Account' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'team', label: 'Team Management' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <Form />;
      case 'notifications':
        return <NotificationsForm />;
      case 'integrations':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Integrations</h3>
            <p className="text-muted-foreground">Connect and manage third-party integrations.</p>
          </div>
        );
      case 'team':
        return <MembersList people={people} />;
      default:
        return <Form />;
    }
  };

  return (
    <div>
      <div className="px-4 mt-4 sm:px-6 mt-6 lg:px-8 mt-8">
        <PageHeader variant="minimal" title="Settings" />
      </div>
      
      <div className="mt-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="border-b border-border">
            <div className="flex w-full overflow-x-auto scrollbar-hide">
              {navigationItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    flex-shrink-0 py-3 text-sm font-medium transition-colors relative
                    ${index === 0 ? 'ml-0 mr-4' : 'mx-4'}
                    ${activeTab === item.id 
                      ? 'text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 