import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { UserActions } from './user-actions';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

interface UserTableProps {
  users: User[];
  selectedUsers: number[];
  onSelectUser: (userId: number, checked: boolean) => void;
  onSelectAll: () => void;
}

export function UserTable({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAll,
}: UserTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedUsers.length === users.length}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={(checked) => onSelectUser(user.id, !!checked)}
                />
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge
                  variant={user.status === 'Active' ? 'default' : 'secondary'}
                  className="transition-all"
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(user.lastActive).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <UserActions userId={user.id} userName={user.name} />
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}