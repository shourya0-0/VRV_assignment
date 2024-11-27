import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AddUserDialog } from './add-user-dialog';
import { UserTable } from './user-table';

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
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const handleSelectUser = (userId: number, checked: boolean) => {
    setSelectedUsers((prev) =>
      checked ? [...prev, userId] : prev.filter((id) => id !== userId)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex flex-col gap-6 max-w-[2000px] mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <AddUserDialog />
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
            <Button variant="destructive" size="sm">
              Delete Selected
            </Button>
          </motion.div>
        )}

        <UserTable
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          onSelectAll={handleSelectAll}
        />
      </div>
    </motion.div>
  );
}