"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function NotificationsForm() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="space-y-1 w-full lg:w-120">
          <h3 className="text-lg font-semibold">Email notifications</h3>
          <p className="text-sm text-muted-foreground">
            Choose which email notifications you want to receive.
          </p>
        </div>
        <div className="space-y-6 w-full lg:w-120">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="new-messages" defaultChecked />
              <Label htmlFor="new-messages" className="font-normal text-muted-foreground">New messages from Pearl</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="mentions" defaultChecked />
              <Label htmlFor="mentions" className="font-normal text-muted-foreground">New messages from Team</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="team-updates" />
              <Label htmlFor="team-updates" className="font-normal text-muted-foreground">Daily digest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="security" defaultChecked />
              <Label htmlFor="security" className="font-normal text-muted-foreground">Weekly digest</Label>
            </div>
          </div>
          <Button>Save</Button>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="space-y-1 w-full lg:w-120">
          <h3 className="text-lg font-semibold">Push notifications</h3>
          <p className="text-sm text-muted-foreground">
            Configure push notifications for your mobile and desktop devices.
          </p>
        </div>
        <div className="space-y-6 w-full lg:w-120">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="push-messages" defaultChecked />
              <Label htmlFor="push-messages" className="font-normal text-muted-foreground">New messages from Pearl</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="push-mentions" defaultChecked />
              <Label htmlFor="push-mentions" className="font-normal text-muted-foreground">New messages from Team</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="push-reminders" />
              <Label htmlFor="push-reminders" className="font-normal text-muted-foreground">Daily reminders</Label>
            </div>
          </div>
          <Button>Save</Button>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="space-y-1 w-full lg:w-120">
          <h3 className="text-lg font-semibold">Notification frequency</h3>
          <p className="text-sm text-muted-foreground">
            Set how often you want to receive digest notifications.
          </p>
        </div>
        <div className="space-y-6 w-full lg:w-120">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="digest-daily" />
              <Label htmlFor="digest-daily" className="font-normal text-muted-foreground">Notify me immediately</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="digest-weekly" defaultChecked />
              <Label htmlFor="digest-weekly" className="font-normal text-muted-foreground">Batch notifications every 2 hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="digest-monthly" />
              <Label htmlFor="digest-monthly" className="font-normal text-muted-foreground">Batch notifications once a day</Label>
            </div>
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
} 