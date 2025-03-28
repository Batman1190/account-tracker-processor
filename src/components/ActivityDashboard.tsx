
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ActivityRecord } from '@/types/ActivityTypes';

interface ActivityDashboardProps {
  records: ActivityRecord[];
}

const COLORS = ['#2563eb', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

const ActivityDashboard: React.FC<ActivityDashboardProps> = ({ records }) => {
  const getCategoryData = () => {
    const counts: Record<string, number> = {};
    
    records.forEach(record => {
      const category = record.category || 'Unknown';
      counts[category] = (counts[category] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };
  
  const getActionData = () => {
    const counts: Record<string, number> = {};
    
    records.forEach(record => {
      const action = record.action || 'Unknown';
      counts[action] = (counts[action] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };
  
  const getCategoryActionData = () => {
    const data: Record<string, Record<string, number>> = {};
    const categories = new Set<string>();
    const actions = new Set<string>();
    
    records.forEach(record => {
      const category = record.category || 'Unknown';
      const action = record.action || 'Unknown';
      
      categories.add(category);
      actions.add(action);
      
      if (!data[category]) {
        data[category] = {};
      }
      
      data[category][action] = (data[category][action] || 0) + 1;
    });
    
    return {
      data: Object.entries(data).map(([category, actionCounts]) => ({
        category,
        ...Object.fromEntries(
          Object.entries(actionCounts).map(([action, count]) => [action, count])
        )
      })),
      categories: Array.from(categories),
      actions: Array.from(actions)
    };
  };

  const categoryData = getCategoryData();
  const actionData = getActionData();
  const { data: categoryActionData, actions } = getCategoryActionData();

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No data available. Import some data to see visualizations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} records`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Activity Distribution by Action</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={actionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {actionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} records`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Category by Action Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryActionData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              {actions.map((action, index) => (
                <Bar key={action} dataKey={action} stackId="a" fill={COLORS[index % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityDashboard;
