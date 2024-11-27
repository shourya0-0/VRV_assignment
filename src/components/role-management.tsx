import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const roles = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access with all permissions',
    users: 3,
    permissions: ['create', 'read', 'update', 'delete'],
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Can edit and publish content',
    users: 5,
    permissions: ['read', 'update'],
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Read-only access to content',
    users: 8,
    permissions: ['read'],
  },
];

export function RoleManagement() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Role Management</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Role
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {role.name}
                <Badge variant="secondary">{role.users} users</Badge>
              </CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium">Permissions:</div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <Badge key={permission} variant="outline">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}