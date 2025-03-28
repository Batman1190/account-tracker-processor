
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ActivityRecord } from '@/types/ActivityTypes';

interface ActivityTableProps {
  records: ActivityRecord[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ records }) => {
  const getCategoryClass = (category: string): string => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory === 'account') return 'category-account';
    if (lowerCategory === 'ob') return 'category-ob';
    if (lowerCategory === 'ib') return 'category-ib';
    if (lowerCategory.includes('team')) return 'category-team';
    return 'bg-gray-500';
  };

  return (
    <Table>
      <TableCaption>Activity Records ({records.length} total)</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Category</TableHead>
          <TableHead className="w-2/3">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="text-center text-muted-foreground">
              No records found. Import some data to get started.
            </TableCell>
          </TableRow>
        ) : (
          records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                <Badge className={getCategoryClass(record.category)}>
                  {record.category || 'Unknown'}
                </Badge>
              </TableCell>
              <TableCell>{record.action || 'Unknown'}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ActivityTable;
