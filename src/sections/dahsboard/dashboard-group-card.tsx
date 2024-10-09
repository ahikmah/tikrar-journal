import type { CardProps } from '@mui/material/Card';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';

import { EmptyContent } from 'src/components/empty-content';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  group?: {
    id: string;
    name: string;
    totalMembers: number;
  };
};

export function DashboardGroupCard({ title, subheader, group, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      {group?.id ? (
        <>{/* todo: group comp */}</>
      ) : (
        <EmptyContent
          filled
          title="You have no group yet"
          description="Join a group to start memorizing together."
          sx={{ mt: 2, py: 3, height: 'auto' }}
          action={
            <Button variant="contained" sx={{ mt: 3 }}>
              Join Group
            </Button>
          }
        />
      )}
    </Card>
  );
}
