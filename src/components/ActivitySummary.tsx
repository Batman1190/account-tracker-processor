
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityRecord, CategoryCount, ActionCount, CategoryActionCount } from '@/types/ActivityTypes';

interface ActivitySummaryProps {
  records: ActivityRecord[];
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ records }) => {
  const getCategoryCounts = (): CategoryCount[] => {
    const counts: Record<string, number> = {};
    
    records.forEach(record => {
      const category = record.category || 'Unknown';
      counts[category] = (counts[category] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  };
  
  const getActionCounts = (): ActionCount[] => {
    const counts: Record<string, number> = {};
    
    records.forEach(record => {
      const action = record.action || 'Unknown';
      counts[action] = (counts[action] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([action, count]) => ({ action, count }))
      .sort((a, b) => b.count - a.count);
  };
  
  const getCategoryActionCounts = (): CategoryActionCount[] => {
    const counts: Record<string, number> = {};
    
    records.forEach(record => {
      const key = `${record.category || 'Unknown'}_${record.action || 'Unknown'}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([key, count]) => {
        const [category, action] = key.split('_');
        return { category, action, count };
      })
      .sort((a, b) => b.count - a.count);
  };

  const getTopNItems = <T extends { count: number }>(items: T[], n: number = 5): T[] => {
    return items.slice(0, n);
  };

  const categoryCounts = getCategoryCounts();
  const actionCounts = getActionCounts();
  const categoryActionCounts = getCategoryActionCounts();
  
  const totalRecords = records.length;

  if (totalRecords === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {getTopNItems(categoryCounts).map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.category}</span>
                <div className="flex items-center">
                  <span className="text-sm mr-2">{item.count}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-primary" 
                      style={{ width: `${(item.count / totalRecords) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Activity by Action</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {getTopNItems(actionCounts).map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.action}</span>
                <div className="flex items-center">
                  <span className="text-sm mr-2">{item.count}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-secondary" 
                      style={{ width: `${(item.count / totalRecords) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitySummary;
