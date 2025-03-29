
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowDownToLine, 
  Calendar, 
  Check, 
  ChevronDown, 
  Download, 
  File, 
  FileText, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Reports = () => {
  const { toast } = useToast();
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showNewReportForm, setShowNewReportForm] = useState(false);
  const [reportDescription, setReportDescription] = useState("");
  const [reportName, setReportName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");

  const monthlyReports = [
    { id: "m1", month: "June 2023", status: "Ready", size: "4.2MB" },
    { id: "m2", month: "May 2023", status: "Ready", size: "3.8MB" },
    { id: "m3", month: "April 2023", status: "Ready", size: "4.1MB" },
  ];

  const customReports = [
    { id: "c1", name: "Media Analysis Q2", date: "Jun 15, 2023", status: "Ready", size: "2.7MB" },
    { id: "c2", name: "Social Media Audit", date: "May 22, 2023", status: "Ready", size: "5.1MB" },
    { id: "c3", name: "Celebrity Deepfakes", date: "Apr 10, 2023", status: "Ready", size: "3.3MB" },
  ];

  const scheduledReports = [
    { id: "s1", name: "Weekly Summary", frequency: "Every Monday", next: "Jun 19, 2023" },
    { id: "s2", name: "Executive Briefing", frequency: "Monthly", next: "Jul 1, 2023" },
    { id: "s3", name: "Detection Trends", frequency: "Bi-weekly", next: "Jun 24, 2023" },
  ];

  const allReports = [
    { id: "r1", name: "June 2023 Monthly Report", type: "Monthly", date: "Jun 1, 2023", status: "Ready" },
    { id: "r2", name: "Media Analysis Q2", type: "Custom", date: "Jun 15, 2023", status: "Ready" },
    { id: "r3", name: "Weekly Summary Report", type: "Weekly", date: "Jun 12, 2023", status: "Ready" },
    { id: "r4", name: "Social Media Detection Report", type: "Custom", date: "Jun 8, 2023", status: "Ready" },
    { id: "r5", name: "May 2023 Monthly Report", type: "Monthly", date: "May 1, 2023", status: "Ready" },
    { id: "r6", name: "April 2023 Monthly Report", type: "Monthly", date: "Apr 1, 2023", status: "Ready" }
  ];

  const filteredReports = allReports.filter(report => {
    if (activeFilter === "all") return true;
    return report.type.toLowerCase() === activeFilter.toLowerCase();
  });

  const handleDownload = (reportName: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${reportName}...`,
    });
    
    // Simulate download completion after 1.5 seconds
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `${reportName} has been downloaded successfully.`,
        variant: "default",
      });
    }, 1500);
  };

  const toggleReportSelection = (reportId: string) => {
    setSelectedReports(prevSelected => {
      if (prevSelected.includes(reportId)) {
        return prevSelected.filter(id => id !== reportId);
      } else {
        return [...prevSelected, reportId];
      }
    });
  };

  const handleGenerateReport = () => {
    if (!reportName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a report name",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      setShowNewReportForm(false);
      setReportName("");
      setReportDescription("");
      
      toast({
        title: "Report generated",
        description: "Your custom report has been created successfully!",
      });
    }, 2000);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: "Filter applied",
      description: `Showing ${filter === 'all' ? 'all' : filter} reports`,
    });
  };

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
            <Button onClick={() => setShowNewReportForm(!showNewReportForm)}>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        {showNewReportForm && (
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle>Create New Report</CardTitle>
              <CardDescription>Generate a custom analysis report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="report-name" className="text-sm font-medium">Report name</label>
                  <input
                    id="report-name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter report name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="report-description" className="text-sm font-medium">Description (optional)</label>
                  <Textarea
                    id="report-description"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Enter report description"
                    className="resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium mb-2">Report type</p>
                  <div className="flex flex-wrap gap-2">
                    {["Detection Analysis", "Media Summary", "Platform Activity", "Custom"].map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        className="flex gap-2 items-center"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewReportForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
                {isGeneratingReport ? (
                  <>
                    <span className="animate-spin mr-2">◌</span>
                    Generating...
                  </>
                ) : (
                  <>Generate Report</>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Monthly Reports</CardTitle>
              <CardDescription>Comprehensive monthly analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {monthlyReports.map((report, i) => (
                  <div key={i} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-violet-500" />
                      <div>
                        <p className="font-medium">{report.month}</p>
                        <p className="text-xs text-muted-foreground">{report.size}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDownload(report.month)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <span className="text-sm text-muted-foreground">{monthlyReports.length} reports</span>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0"
                onClick={() => toast({
                  title: "Monthly reports",
                  description: "Viewing all monthly reports"
                })}
              >
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
                {customReports.map((report, i) => (
                  <div key={i} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDownload(report.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <span className="text-sm text-muted-foreground">{customReports.length} reports</span>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0"
                onClick={() => toast({
                  title: "Custom reports",
                  description: "Viewing all custom reports"
                })}
              >
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
                {scheduledReports.map((report, i) => (
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
              <span className="text-sm text-muted-foreground">{scheduledReports.length} scheduled</span>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0"
                onClick={() => toast({
                  title: "Schedule configuration",
                  description: "Opening report scheduling options"
                })}
              >
                Configure
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Reports</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Collapsible className="w-full">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter by type
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2 bg-background p-2 rounded-md border">
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={activeFilter === "all" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleFilterChange("all")}
                    >
                      All
                    </Button>
                    <Button 
                      variant={activeFilter === "monthly" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleFilterChange("monthly")}
                    >
                      Monthly
                    </Button>
                    <Button 
                      variant={activeFilter === "weekly" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleFilterChange("weekly")}
                    >
                      Weekly
                    </Button>
                    <Button 
                      variant={activeFilter === "custom" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleFilterChange("custom")}
                    >
                      Custom
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <Button variant="outline" size="sm" onClick={() => {
                toast({
                  title: "Date range selector",
                  description: "Opening date range picker"
                });
              }}>
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedReports(filteredReports.map(r => r.id));
                        } else {
                          setSelectedReports([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="w-[300px]">Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report, i) => (
                  <TableRow key={i} className={selectedReports.includes(report.id) ? "bg-accent/30" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={() => toggleReportSelection(report.id)}
                      />
                    </TableCell>
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownload(report.name)}
                        >
                          <ArrowDownToLine className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            toast({
                              title: "Options",
                              description: `Showing options for ${report.name}`
                            });
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <File className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No reports found</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActiveFilter('all')}
                        >
                          Clear filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {selectedReports.length > 0 && (
              <div className="bg-accent/30 p-2 rounded-md mt-2 flex items-center justify-between">
                <span className="text-sm">{selectedReports.length} reports selected</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => {
                    toast({
                      title: "Batch action",
                      description: `Downloading ${selectedReports.length} reports`
                    });
                    setSelectedReports([]);
                  }}>
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Download all
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => {
                    toast({
                      title: "Action canceled",
                      description: "No reports were deleted"
                    });
                    setSelectedReports([]);
                  }}>
                    <X className="h-3.5 w-3.5 mr-1" />
                    Clear selection
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Showing {filteredReports.length} reports</p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
