"use client"

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Form from "@/components/Form";
import NotificationsForm from "@/components/NotificationsForm";
import MembersList, { Member } from "@/components/MembersList";
import { IntegrationsList } from "@/components/IntegrationsList";

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
  { id: 'account', label: 'Account', href: '/dashboard/settings' },
  { id: 'notifications', label: 'Notifications', href: '/dashboard/settings' },
  { id: 'integrations', label: 'Integrations', href: '/dashboard/settings' },
  { id: 'team', label: 'Team members', href: '/dashboard/settings' },
];

// Separate component that uses useSearchParams
function SettingsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('account');

  // Get the active tab from URL or default to 'account'
  useEffect(() => {
    const tab = searchParams.get('tab') || 'account';
    setActiveTab(tab);
  }, [searchParams]);

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <Form />;
      case 'notifications':
        return <NotificationsForm />;
      case 'integrations':
        return <IntegrationsList />;
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
      
      <div className="mt-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="border-b border-border">
            <div className="flex w-full overflow-x-auto scrollbar-hide">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.id}
                  href={`${item.href}?tab=${item.id}`}
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
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="px-4 mt-10 sm:px-6 lg:px-8 pb-12">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function SettingsLoading() {
  return (
    <div>
      <div className="px-4 mt-4 sm:px-6 mt-6 lg:px-8 mt-8">
        <PageHeader variant="minimal" title="Settings" />
      </div>
      
      <div className="mt-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="border-b border-border">
            <div className="flex w-full overflow-x-auto scrollbar-hide">
              {navigationItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    flex-shrink-0 py-3 text-sm font-medium text-muted-foreground
                    ${index === 0 ? 'ml-0 mr-4' : 'mx-4'}
                  `}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="px-4 mt-10 sm:px-6 lg:px-8 pb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsLoading />}>
      <SettingsContent />
    </Suspense>
  );
} 