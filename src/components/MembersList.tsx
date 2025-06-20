"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import EditMemberDialog from "./EditMemberDialog";

export type Member = {
  name: string;
  title: string;
  email: string;
  role: string;
};

interface MembersListProps {
  people: Member[];
}

export default function MembersList({ people }: MembersListProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditClick = (member: Member) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">Team Members</h3>
          <p className="text-sm text-muted-foreground">Manage team members, roles, and permissions.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search members..."
              className="w-full sm:w-64 pl-10"
            />
          </div>
          <Button type="button" variant="secondary">Add member</Button>
        </div>
      </div>
      
      <div className="-mx-4 sm:-mx-0">
        <table
          className="min-w-full divide-y"
          style={{ borderColor: "var(--color-border)" }}
        >
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pr-3 pl-4 sm:pl-0 text-left text-sm font-semibold"
                style={{ color: "var(--color-foreground)" }}
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
                style={{ color: "var(--color-foreground)" }}
              >
                Title
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell"
                style={{ color: "var(--color-foreground)" }}
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold"
                style={{ color: "var(--color-foreground)" }}
              >
                Role
              </th>
              <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody
            className="divide-y"
            style={{
              background: "transparent",
              borderColor: "var(--color-border)"
            }}
          >
            {people.map((person) => (
              <tr key={person.email}>
                <td
                  className="w-full max-w-0 py-4 pr-3 pl-4 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {person.name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd
                      className="mt-1 truncate"
                      style={{ color: "var(--color-muted-foreground)" }}
                    >
                      {person.title}
                    </dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd
                      className="mt-1 truncate sm:hidden"
                      style={{ color: "var(--color-muted-foreground)" }}
                    >
                      {person.email}
                    </dd>
                  </dl>
                </td>
                <td
                  className="hidden px-3 py-4 text-sm lg:table-cell"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {person.title}
                </td>
                <td
                  className="hidden px-3 py-4 text-sm sm:table-cell"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {person.email}
                </td>
                <td
                  className="px-3 py-4 text-sm"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {person.role}
                </td>
                <td className="py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-1">
                  <button
                    onClick={() => handleEditClick(person)}
                    style={{ color: "var(--color-primary)" }}
                    className="hover:underline"
                  >
                    Edit<span className="sr-only">, {person.name}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditMemberDialog
        member={selectedMember}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
} 