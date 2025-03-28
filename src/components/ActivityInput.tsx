
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityRecord, ActivityCategory, ActivityAction } from '@/types/ActivityTypes';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface ActivityInputProps {
  onDataImport: (data: ActivityRecord[]) => void;
}

const ActivityInput: React.FC<ActivityInputProps> = ({ onDataImport }) => {
  const [inputText, setInputText] = useState<string>('');

  const parseInputText = (text: string): ActivityRecord[] => {
    // Split the text by newlines
    const lines = text.trim().split('\n');
    
    // Process each line to create activity records
    return lines
      .filter(line => line.trim().length > 0)
      .map(line => {
        const parts = line.trim().split('\t');
        
        // Each line should have two parts: category and action
        const category = (parts[0] || '').trim() as ActivityCategory;
        const action = (parts[1] || '').trim() as ActivityAction;
        
        return {
          id: uuidv4(),
          category,
          action,
          timestamp: new Date()
        };
      });
  };

  const handleImport = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some data to import",
        variant: "destructive",
      });
      return;
    }

    const records = parseInputText(inputText);
    if (records.length > 0) {
      onDataImport(records);
      toast({
        title: "Success",
        description: `Imported ${records.length} records`,
      });
      setInputText('');
    } else {
      toast({
        title: "Error",
        description: "No valid records found in the input",
        variant: "destructive",
      });
    }
  };

  const handleSampleData = () => {
    const sampleData = `ACCOUNT\tEMAIL
OB\tPROCESS
OB\tPROCESS
OB\tPROCESS
TEAM'S DEV\tMEETING
ACCOUNT\tENDO
OB\tPROCESS
ACCOUNT\tEMAIL
ACCOUNT\tSMS
ACCOUNT\tEMAIL`;
    setInputText(sampleData);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Input Activity Data</CardTitle>
        <CardDescription>
          Paste your tab-separated activity data (Category and Action columns) or use the sample data button
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="ACCOUNT&#9;EMAIL
OB&#9;PROCESS"
          className="min-h-[200px] mb-4 font-mono"
        />
        <div className="flex space-x-2">
          <Button onClick={handleImport} className="flex-1">
            Import Data
          </Button>
          <Button variant="outline" onClick={handleSampleData}>
            Use Sample Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityInput;
