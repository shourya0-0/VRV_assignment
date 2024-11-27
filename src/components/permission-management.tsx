// import { Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

const resources = [
  'Users',
  'Roles',
  'Permissions',
  'Settings',
  'Reports',
  'Analytics',
];

const permissions = ['create', 'read', 'update', 'delete'];

const roles = ['Administrator', 'Editor', 'Viewer'];

export function PermissionManagement() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Permission Management
        </h2>
        <p className="text-muted-foreground">
          Configure access rights for each role across different resources
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Resource</TableHead>
              {roles.map((role) => (
                <TableHead key={role}>{role}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource}>
                <TableCell className="font-medium">{resource}</TableCell>
                {roles.map((role) => (
                  <TableCell key={`${resource}-${role}`}>
                    <div className="flex flex-wrap gap-2">
                      {permissions.map((permission) => (
                        <div
                          key={`${resource}-${role}-${permission}`}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${resource}-${role}-${permission}`}
                            defaultChecked={role === 'Administrator'}
                          />
                          <label
                            htmlFor={`${resource}-${role}-${permission}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {permission}
                          </label>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}