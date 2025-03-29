
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, Mail, Shield, CheckCircle, 
  Clock, AlertCircle, MoreHorizontal 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Analyst" | "Viewer";
  status: "Active" | "Pending" | "Offline";
  avatar?: string;
  lastActive?: string;
};

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@deepguard.io",
    role: "Admin",
    status: "Active",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Sam Taylor",
    email: "sam@deepguard.io",
    role: "Analyst",
    status: "Active",
    lastActive: "5 mins ago",
  },
  {
    id: "3",
    name: "Jordan Lee",
    email: "jordan@deepguard.io",
    role: "Analyst",
    status: "Active",
    lastActive: "20 mins ago",
  },
  {
    id: "4",
    name: "Morgan Smith",
    email: "morgan@deepguard.io",
    role: "Viewer",
    status: "Offline",
    lastActive: "2 days ago",
  },
  {
    id: "5",
    name: "Jamie Wilson",
    email: "jamie@example.com",
    role: "Viewer",
    status: "Pending",
  },
];

const getRoleBadgeColor = (role: TeamMember["role"]) => {
  switch (role) {
    case "Admin":
      return "bg-violet-600 hover:bg-violet-700";
    case "Analyst":
      return "bg-blue-600 hover:bg-blue-700";
    case "Viewer":
      return "bg-gray-600 hover:bg-gray-700";
    default:
      return "bg-gray-600 hover:bg-gray-700";
  }
};

const getStatusIcon = (status: TeamMember["status"]) => {
  switch (status) {
    case "Active":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "Pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "Offline":
      return <Clock className="h-4 w-4 text-gray-500" />;
    default:
      return null;
  }
};

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState<{
    name: string;
    email: string;
    role: TeamMember["role"];
  }>({
    name: "",
    email: "",
    role: "Viewer",
  });
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'status'>('delete');
  
  const { toast } = useToast();

  const handleInviteMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newId = (teamMembers.length + 1).toString();
    const memberToAdd: TeamMember = {
      id: newId,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      status: "Pending"
    };

    setTeamMembers([...teamMembers, memberToAdd]);
    setInviteDialogOpen(false);
    setNewMember({
      name: "",
      email: "",
      role: "Viewer",
    });
    
    toast({
      title: "Member Invited",
      description: `Invitation sent to ${newMember.email}`,
    });
  };

  const handleSendEmail = () => {
    if (!selectedMember || !emailSubject || !emailContent) {
      toast({
        title: "Validation Error",
        description: "Please fill in all email fields",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send an actual email
    toast({
      title: "Email Sent",
      description: `Email sent to ${selectedMember.name}`,
    });
    
    setEmailDialogOpen(false);
    setEmailSubject("");
    setEmailContent("");
  };

  const handleStatusChange = (member: TeamMember) => {
    setSelectedMember(member);
    setActionType('status');
    setConfirmDialogOpen(true);
  };

  const handleDeleteMember = (member: TeamMember) => {
    setSelectedMember(member);
    setActionType('delete');
    setConfirmDialogOpen(true);
  };

  const confirmAction = () => {
    if (!selectedMember) return;

    if (actionType === 'delete') {
      setTeamMembers(teamMembers.filter((m) => m.id !== selectedMember.id));
      toast({
        title: "Member Removed",
        description: `${selectedMember.name} has been removed from the team`,
      });
    } else if (actionType === 'status') {
      setTeamMembers(teamMembers.map((m) => {
        if (m.id === selectedMember.id) {
          const newStatus = m.status === "Active" ? "Offline" : "Active";
          return { ...m, status: newStatus };
        }
        return m;
      }));
      
      const statusAction = selectedMember.status === "Active" ? "deactivated" : "activated";
      toast({
        title: "Status Updated",
        description: `${selectedMember.name}'s account has been ${statusAction}`,
      });
    }
    
    setConfirmDialogOpen(false);
    setSelectedMember(null);
  };

  const openEmailDialog = (member: TeamMember) => {
    setSelectedMember(member);
    setEmailDialogOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <Button onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" /> Invite Member
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Team Members ({teamMembers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/50">
                <div className="col-span-4">Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              {teamMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="grid grid-cols-12 px-4 py-3 items-center border-t"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-violet-100 text-violet-800">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      {member.lastActive && (
                        <p className="text-xs text-muted-foreground">
                          Active {member.lastActive}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3 text-sm">{member.email}</div>
                  <div className="col-span-2">
                    <Badge variant="secondary" className={`${getRoleBadgeColor(member.role)} text-white`}>
                      {member.role === "Admin" && <Shield className="h-3 w-3 mr-1" />}
                      {member.role}
                    </Badge>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 text-sm">
                    {getStatusIcon(member.status)}
                    <span>{member.status}</span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEmailDialog(member)}>
                          <Mail className="h-4 w-4 mr-2" /> Contact
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(member)}
                        >
                          {member.status === "Active" ? (
                            <Clock className="h-4 w-4 mr-2" />
                          ) : (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          )}
                          {member.status === "Active" ? "Set as Inactive" : "Set as Active"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteMember(member)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <AlertCircle className="h-4 w-4 mr-2" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Member Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invite to add a new member to your team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={newMember.role}
                onValueChange={(value: any) => 
                  setNewMember({...newMember, role: value as TeamMember["role"]})
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleInviteMember}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Contact {selectedMember?.name}</DialogTitle>
            <DialogDescription>
              Send an email to {selectedMember?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <textarea
                id="message"
                rows={5}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="col-span-3 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendEmail}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'delete' ? 'Remove Team Member' : 'Change Status'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'delete' 
                ? 'Are you sure you want to remove this team member?' 
                : 'Are you sure you want to change this member\'s status?'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center font-medium">{selectedMember?.name}</p>
            <p className="text-center text-sm text-muted-foreground">{selectedMember?.email}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
            <Button 
              variant={actionType === 'delete' ? "destructive" : "default"}
              onClick={confirmAction}
            >
              {actionType === 'delete' ? 'Remove' : 'Change Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Team;
