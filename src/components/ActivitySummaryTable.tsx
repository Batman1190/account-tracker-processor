
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityRecord } from '@/types/ActivityTypes';

interface ActivitySummaryTableProps {
  records: ActivityRecord[];
}

const ActivitySummaryTable: React.FC<ActivitySummaryTableProps> = ({ records }) => {
  // Calculate counts for each category
  const getCounts = () => {
    const counts = {
      totalAccountsWorked: 0,
      endorsements: 0,
      respondedEmails: 0,
      inboundCalls: 0,
      outboundCalls: 0,
      welcomeCalls: 0,
      publicReviews: 0,
      sms: 0,
      gift: 0,
      fbMessages: 0,
      training: 0,
      meeting: 0,
      coaching: 0,
      callListening: 0
    };

    records.forEach(record => {
      const category = record.category.trim().toUpperCase();
      const action = record.action.trim().toUpperCase();

      // Total Accounts Worked Today
      if ((category === 'OB' && action === 'PROCESS') ||
          (category === 'IB' && action === 'PROCESS') ||
          (category === 'ACCOUNT' && action === 'EMAIL') ||
          (category === 'ACCOUNT' && action === 'ENDO') ||
          (category === 'ACCOUNT' && action === 'SMS') ||
          (category === 'OB' && action === 'WC') ||
          (category === 'IB' && action === 'WC') ||
          (category === 'ACCOUNT' && action === 'PUBLIC REVIEW') ||
          (category === 'OB' && action === 'PUBLIC REVIEW') ||
          (category === "TEAM'S DEV" && action === 'TRAINING') ||
          (category === "TEAM'S DEV" && action === 'MEETING') ||
          (category === "TEAM'S DEV" && action === 'COACHING') ||
          (category === "TEAM'S DEV" && action === 'CALL LISTENING')) {
        counts.totalAccountsWorked++;
      }

      // Individual categories
      if (category === 'ACCOUNT' && action === 'ENDO') {
        counts.endorsements++;
      }

      if (action === 'EMAIL') {
        counts.respondedEmails++;
      }

      if (category === 'IB' && action === 'PROCESS') {
        counts.inboundCalls++;
      }

      if (category === 'OB' && action === 'PROCESS') {
        counts.outboundCalls++;
      }

      if ((category === 'OB' && action === 'WC') || (category === 'IB' && action === 'WC')) {
        counts.welcomeCalls++;
      }

      if ((category === 'ACCOUNT' && action === 'PUBLIC REVIEW') || 
          (category === 'OB' && action === 'PUBLIC REVIEW')) {
        counts.publicReviews++;
      }

      if (category === 'ACCOUNT' && action === 'SMS') {
        counts.sms++;
      }

      if (category === "TEAM'S DEV" && action === 'TRAINING') {
        counts.training++;
      }

      if (category === "TEAM'S DEV" && action === 'MEETING') {
        counts.meeting++;
      }

      if (category === "TEAM'S DEV" && action === 'COACHING') {
        counts.coaching++;
      }

      if (category === "TEAM'S DEV" && action === 'CALL LISTENING') {
        counts.callListening++;
      }
    });

    return counts;
  };

  const counts = getCounts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Summary of activity counts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/3">Activity Type</TableHead>
              <TableHead className="w-1/3 text-right">Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total Accounts Worked Today</TableCell>
              <TableCell className="text-right">{counts.totalAccountsWorked}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Endorsement Personal/Tracker</TableCell>
              <TableCell className="text-right">{counts.endorsements}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Responded Emails in ZD</TableCell>
              <TableCell className="text-right">{counts.respondedEmails}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Inbound Calls</TableCell>
              <TableCell className="text-right">{counts.inboundCalls}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Sequences Outbound Calls</TableCell>
              <TableCell className="text-right">{counts.outboundCalls}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">After Sales Welcome Call (Completed)</TableCell>
              <TableCell className="text-right">{counts.welcomeCalls}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Public Reviews</TableCell>
              <TableCell className="text-right">{counts.publicReviews}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">SMS</TableCell>
              <TableCell className="text-right">{counts.sms}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Gift</TableCell>
              <TableCell className="text-right">{counts.gift}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">FB Messages</TableCell>
              <TableCell className="text-right">{counts.fbMessages}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Training</TableCell>
              <TableCell className="text-right">{counts.training}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Meeting</TableCell>
              <TableCell className="text-right">{counts.meeting}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Coaching</TableCell>
              <TableCell className="text-right">{counts.coaching}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Call Listening</TableCell>
              <TableCell className="text-right">{counts.callListening}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActivitySummaryTable;
