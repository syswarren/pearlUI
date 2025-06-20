"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Member } from "./MembersList";

interface EditMemberDialogProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditMemberDialog({ member, open, onOpenChange }: EditMemberDialogProps) {
  const [formData, setFormData] = useState({
    email: member?.email || "",
    role: member?.role || "Member"
  });

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving member:", formData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleRemove = () => {
    // TODO: Implement remove logic
    console.log("Removing member:", member?.email);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogDescription>
            Update {member?.name}'s email and role. You can also remove them from the team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between">
                  {formData.role}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <DropdownMenuRadioItem value="Member">Member</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Admin">Admin</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save changes
            </Button>
          </div>
          
          <Separator className="my-2" />
          
          <Button 
            variant="destructive" 
            onClick={handleRemove}
            className="w-full"
          >
            Remove from team
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 