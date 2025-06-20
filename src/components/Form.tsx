"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Form() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="space-y-1 w-full lg:w-120">
          <h3 className="text-lg font-semibold">Basic information</h3>
          <p className="text-sm text-muted-foreground">
            View and update your personal details and account information.
          </p>
        </div>
        <div className="space-y-6 w-full lg:w-120">
          <div>
            <label className="text-sm font-medium" htmlFor="displayName">
              Display name
            </label>
            <Input
              id="displayName"
              defaultValue="Demo User"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email address
            </label>
            <Input
              id="email"
              defaultValue="demo@company.com"
              className="mt-1"
            />
          </div>
          <Button>Save</Button>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="space-y-1 w-full lg:w-120">
          <h3 className="text-lg font-semibold">Change password</h3>
          <p className="text-sm text-muted-foreground">
            Update your password to keep your account secure.
          </p>
        </div>
        <div className="space-y-6 w-full lg:w-120">
          <div>
            <label className="text-sm font-medium" htmlFor="currentPassword">
              Current password
            </label>
            <Input
              id="currentPassword"
              type="password"
              defaultValue="*******************"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="newPassword">
              New password
            </label>
            <Input
              id="newPassword"
              type="password"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="confirmPassword">
              Confirm new password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              className="mt-1"
            />
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}
