
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Shield, CheckCircle, Clock } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Analyst" | "Viewer";
  status: "Active" | "Pending" | "Offline";
  avatar?: string;
  lastActive?: string;
};

const teamMembers: TeamMember[] = [
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
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <Button>
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
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Team;
