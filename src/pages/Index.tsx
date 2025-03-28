
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ActivityInput from '@/components/ActivityInput';
import ActivityDashboard from '@/components/ActivityDashboard';
import ActivityTable from '@/components/ActivityTable';
import ActivitySummary from '@/components/ActivitySummary';
import ActivitySummaryTable from '@/components/ActivitySummaryTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityRecord } from '@/types/ActivityTypes';
import { Button } from '@/components/ui/button';
import { Download, Upload, BarChart, Table } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [records, setRecords] = useState<ActivityRecord[]>([]);

  const handleDataImport = (newRecords: ActivityRecord[]) => {
    setRecords(prevRecords => [...prevRecords, ...newRecords]);
  };

  const handleClearData = () => {
    if (records.length === 0) {
      toast({
        title: "Info",
        description: "No data to clear",
      });
      return;
    }
    
    setRecords([]);
    toast({
      title: "Success",
      description: "All data has been cleared",
    });
  };

  const handleDownloadCSV = () => {
    if (records.length === 0) {
      toast({
        title: "Error",
        description: "No data to download",
        variant: "destructive",
      });
      return;
    }

    // Create CSV content
    const headers = "Category,Action\n";
    const rows = records.map(record => `${record.category},${record.action}`).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "activity_data.csv");
    document.body.appendChild(link);
    
    // Trigger download and clean up
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: "CSV file downloaded",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Activity Dashboard</h2>
            <p className="text-muted-foreground">
              Track and visualize account activity data
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleClearData}>
              Clear Data
            </Button>
            <Button variant="outline" onClick={handleDownloadCSV}>
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </div>
        </div>

        <ActivityInput onDataImport={handleDataImport} />

        {records.length > 0 && (
          <>
            <ActivitySummaryTable records={records} />
            
            <ActivitySummary records={records} />
            
            <Tabs defaultValue="dashboard" className="space-y-4">
              <TabsList>
                <TabsTrigger value="dashboard">
                  <BarChart className="h-4 w-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="data">
                  <Table className="h-4 w-4 mr-2" />
                  Data Table
                </TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard">
                <ActivityDashboard records={records} />
              </TabsContent>
              <TabsContent value="data">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Records</CardTitle>
                    <CardDescription>
                      View all imported activity records
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityTable records={records} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        {records.length === 0 && (
          <Card className="bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Data Available</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mt-2">
                Enter your activity data above to get started. You can paste tab-separated data with Category and Action columns or use the sample data.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Index;
