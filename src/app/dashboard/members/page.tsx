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

export default function MembersPage() {
  return <MembersList people={people} />;
} 