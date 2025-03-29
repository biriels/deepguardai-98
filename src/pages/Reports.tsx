
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownToLine, Calendar, Download, File, FileText, Filter, MoreHorizontal, Plus } from "lucide-react";

const Reports = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground mt-2">
              Generate and access detailed analysis reports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Monthly Reports</CardTitle>
              <CardDescription>Comprehensive monthly analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { month: "June 2023", status: "Ready", size: "4.2MB" },
                  { month: "May 2023", status: "Ready", size: "3.8MB" },
                  { month: "April 2023", status: "Ready", size: "4.1MB" },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-violet-500" />
                      <div>
                        <p className="font-medium">{report.month}</p>
                        <p className="text-xs text-muted-foreground">{report.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <span className="text-sm text-muted-foreground">3 reports</span>
              <Button variant="link" size="sm" className="p-0">
                Show all
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>User-generated analysis reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "Media Analysis Q2", date: "Jun 15, 2023", status: "Ready", size: "2.7MB" },
                  { name: "Social Media Audit", date: "May 22, 2023", status: "Ready", size: "5.1MB" },
                  { name: "Celebrity Deepfakes", date: "Apr 10, 2023", status: "Ready", size: "3.3MB" },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <span className="text-sm text-muted-foreground">3 reports</span>
              <Button variant="link" size="sm" className="p-0">
                Show all
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automated recurring reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "Weekly Summary", frequency: "Every Monday", next: "Jun 19, 2023" },
                  { name: "Executive Briefing", frequency: "Monthly", next: "Jul 1, 2023" },
                  { name: "Detection Trends", frequency: "Bi-weekly", next: "Jun 24, 2023" },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.frequency}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Next: {report.next}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <span className="text-sm text-muted-foreground">3 scheduled</span>
              <Button variant="link" size="sm" className="p-0">
                Configure
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Reports</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "June 2023 Monthly Report",
                    type: "Monthly",
                    date: "Jun 1, 2023",
                    status: "Ready"
                  },
                  {
                    name: "Media Analysis Q2",
                    type: "Custom",
                    date: "Jun 15, 2023",
                    status: "Ready"
                  },
                  {
                    name: "Weekly Summary Report",
                    type: "Weekly",
                    date: "Jun 12, 2023",
                    status: "Ready"
                  },
                  {
                    name: "Social Media Detection Report",
                    type: "Custom",
                    date: "Jun 8, 2023",
                    status: "Ready"
                  },
                  {
                    name: "May 2023 Monthly Report",
                    type: "Monthly",
                    date: "May 1, 2023",
                    status: "Ready"
                  },
                  {
                    name: "April 2023 Monthly Report",
                    type: "Monthly",
                    date: "Apr 1, 2023",
                    status: "Ready"
                  }
                ].map((report, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <ArrowDownToLine className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
