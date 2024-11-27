import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreVertical, Plus, Filter } from 'lucide-react';
// import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

const users = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer'][Math.floor(Math.random() * 3)],
  status: ['Active', 'Inactive'][Math.floor(Math.random() * 2)],
  lastActive: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 w-full"
    >
      <div className="flex flex-col gap-6 max-w-full mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add User
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-4 bg-muted rounded-lg"
          >
            <span>{selectedUsers.length} users selected</span>
            <Button variant="destructive" size="sm">Delete Selected</Button>
          </motion.div>
        )}

        <div className="rounded-md border overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length}
                      onCheckedChange={handleSelectAll}
                      className="border border-muted-foreground rounded-sm"
                    />
                    <span className="text-sm">Select All</span>
                  </div>
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
              {filteredUsers.map((user, index) => (
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
                      onCheckedChange={(checked) => {
                        setSelectedUsers(prev =>
                          checked
                            ? [...prev, user.id]
                            : prev.filter(id => id !== user.id)
                        );
                      }}
                      className="border border-muted-foreground rounded-sm"
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}
