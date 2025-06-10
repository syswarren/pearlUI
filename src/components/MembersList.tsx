import React from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

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
  return (
    <div className="px-4 mt-4 sm:px-6 mt-6 lg:px-8 mt-8">
      <PageHeader
        title="Members"
        description="A list of all the members in your team including their name, title, email and role."
        action={<Button type="button" variant="secondary">Add member</Button>}
      />
      <div className="-mx-4 mt-8 sm:-mx-0">
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
                <td className="py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-0">
                  <a
                    href="#"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Edit<span className="sr-only">, {person.name}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 