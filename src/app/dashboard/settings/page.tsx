import PageHeader from "@/components/PageHeader";
import Form from "@/components/Form";
import NotificationsForm from "@/components/NotificationsForm";
import MembersList, { Member } from "@/components/MembersList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function SettingsPage() {
  return (
    <div>
      <div className="px-4 mt-4 sm:px-6 mt-6 lg:px-8 mt-8">
        <PageHeader variant="minimal" title="Settings" />
      </div>
      
      <div className="mt-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="flex w-full overflow-x-auto scrollbar-hide sm:px-2 lg:px-2">
            <TabsTrigger value="account" className="flex-shrink-0">Account</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-shrink-0">Notifications</TabsTrigger>
            <TabsTrigger value="integrations" className="flex-shrink-0">Integrations</TabsTrigger>
            <TabsTrigger value="team" className="flex-shrink-0">Team Management</TabsTrigger>
          </TabsList>
          
          <div className="px-4 mt-6 sm:px-6 lg:px-8">
            <TabsContent value="account">
              <Form />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationsForm />
            </TabsContent>
            
            <TabsContent value="integrations">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Integrations</h3>
                <p className="text-muted-foreground">Connect and manage third-party integrations.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="team">
              <MembersList people={people} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
} 