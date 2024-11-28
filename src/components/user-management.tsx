"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Plus, Filter } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

type User = {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastActive: string
}

type FilterOptions = {
  roles: string[]
  status: string[]
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "Editor", "Viewer"][Math.floor(Math.random() * 3)],
      status: ["Active", "Inactive"][Math.floor(Math.random() * 2)],
      lastActive: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    }))
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [filters, setFilters] = useState<FilterOptions>({
    roles: [],
    status: [],
  })
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRoleFilter =
      filters.roles.length === 0 || filters.roles.includes(user.role)
    const matchesStatusFilter =
      filters.status.length === 0 || filters.status.includes(user.status)

    return matchesSearch && matchesRoleFilter && matchesStatusFilter
  })

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  const handleDeleteSelected = () => {
    setUsers((prev) => prev.filter((user) => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
    toast.success(`${selectedUsers.length} users deleted successfully`)
  }

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all required fields")
      return
    }
    
    const id = Math.max(...users.map((u) => u.id)) + 1
    setUsers((prev) => [
      {
        ...newUser,
        id,
        lastActive: new Date().toISOString(),
      },
      ...prev,
    ])
    setIsAddUserOpen(false)
    setNewUser({
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
    })
    toast.success("User added successfully")
  }

  const handleDeleteUser = (id: number) => {
    setUserToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== userToDelete))
      toast.success("User deleted successfully")
    }
    setIsDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 w-screen max-w-[100%] max-auto overflow-hidden"
        style={{ width: "calc(100vw - 18rem)" }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              User Management
            </h2>
            <Button
              className="gap-2 bg-zinc-800 hover:bg-zinc-700 text-white"
              onClick={() => setIsAddUserOpen(true)}
            >
              <Plus className="h-4 w-4" /> Add User
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/70" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-zinc-900 border-zinc-800 text-white placeholder:text-white/50"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
                >
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                <DropdownMenuLabel className="text-white">
                  Filter by Role
                </DropdownMenuLabel>
                {["Admin", "Editor", "Viewer"].map((role) => (
                  <DropdownMenuCheckboxItem
                    key={role}
                    checked={filters.roles.includes(role)}
                    onCheckedChange={(checked) => {
                      setFilters((prev) => ({
                        ...prev,
                        roles: checked
                          ? [...prev.roles, role]
                          : prev.roles.filter((r) => r !== role),
                      }))
                    }}
                    className="text-white hover:bg-zinc-800"
                  >
                    {role}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuLabel className="text-white">
                  Filter by Status
                </DropdownMenuLabel>
                {["Active", "Inactive"].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filters.status.includes(status)}
                    onCheckedChange={(checked) => {
                      setFilters((prev) => ({
                        ...prev,
                        status: checked
                          ? [...prev.status, status]
                          : prev.status.filter((s) => s !== status),
                      }))
                    }}
                    className="text-white hover:bg-zinc-800"
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={selectedUsers.length === filteredUsers.length}
                onCheckedChange={handleSelectAll}
                className="h-5 w-5 rounded-sm aspect-square border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <label htmlFor="select-all" className="text-sm font-medium text-white">
                Select All ({filteredUsers.length} users)
              </label>
            </div>
            <AnimatePresence>
              {selectedUsers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-sm font-medium text-white">
                    {selectedUsers.length} selected
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteSelected}
                    className="bg-red-900 hover:bg-red-800 text-white"
                  >
                    Delete Selected
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="rounded-md border border-zinc-800 shadow-sm bg-zinc-900">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-zinc-900">
                  <TableHead className="w-[50px] text-white"></TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Role</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Last Active</TableHead>
                  <TableHead className="w-[50px] text-white"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group border-zinc-800 hover:bg-zinc-800/50"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => {
                          setSelectedUsers((prev) =>
                            checked
                              ? [...prev, user.id]
                              : prev.filter((id) => id !== user.id)
                          )
                        }}
                        className="h-5 w-5 aspect-square border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:text-black"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-white">{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "Admin"
                            ? "bg-blue-900/20 text-blue-200 border-blue-800"
                            : user.role === "Editor"
                            ? "bg-purple-900/20 text-purple-200 border-purple-800"
                            : "bg-zinc-900/20 text-zinc-200 border-zinc-800"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.status === "Active"
                            ? "bg-green-900/20 text-green-200 border-green-800"
                            : "bg-zinc-900/20 text-zinc-200 border-zinc-800"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white/70">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-800"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4 text-white" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-zinc-900 border-zinc-800"
                        >
                          <DropdownMenuItem className="text-white hover:bg-zinc-800">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem 
                            className="text-red-400 hover:bg-zinc-800"
                            onClick={() => handleDeleteUser(user.id)}
                          >
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

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription className="text-zinc-400">
  Fill in the user details below. All fields are required.
</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium text-white">
                Name
              </label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="john@example.com"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="role" className="text-sm font-medium text-white">
                Role
              </label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {["Admin", "Editor", "Viewer"].map((role) => (
                    <SelectItem
                      key={role}
                      value={role}
                      className="text-white hover:bg-zinc-800"
                    >
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium text-white">
                Status
              </label>
              <Select
                value={newUser.status}
                onValueChange={(value) => setNewUser((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {["Active", "Inactive"].map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="text-white hover:bg-zinc-800"
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="bg-zinc-900">
            <Button
              variant="outline"
              onClick={() => setIsAddUserOpen(false)}
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              className="bg-zinc-800 text-white hover:bg-zinc-700"
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-zinc-900">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-900 hover:bg-red-800"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

