import MembersList, { Member } from "@/components/MembersList";

const people: Member[] = [
  { name: 'Sarah Wilson', title: 'CRO', email: 'sarah.wilson@company.com', role: 'Admin' },
  { name: 'Michael Chen', title: 'Sales Manager', email: 'michael.chen@company.com', role: 'Member' },
  { name: 'Emma Davis', title: 'Account Executive', email: 'emma.davis@company.com', role: 'Member' },
  { name: 'James Wilson', title: 'Account Executive', email: 'james.wilson@company.com', role: 'Member' },
  { name: 'Sophie Martinez', title: 'Account Executive', email: 'sophie.martinez@company.com', role: 'Member' },
];

export default function MembersPage() {
  return <MembersList people={people} />;
} 