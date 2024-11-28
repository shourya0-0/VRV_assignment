"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, UserPlus, X } from 'lucide-react'

type Permission = "create" | "read" | "update" | "delete"

interface Role {
  id: number
  name: string
  description: string
  users: User[]
  permissions: Permission[]
}

interface User {
  id: number
  name: string
  email: string
  roleId: number
}

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Administrator",
      description: "Full system access with all permissions",
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", roleId: 1 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", roleId: 1 },
      ],
      permissions: ["create", "read", "update", "delete"],
    },
    {
      id: 2,
      name: "Editor",
      description: "Can edit and publish content",
      users: [
        { id: 3, name: "Bob Wilson", email: "bob@example.com", roleId: 2 },
      ],
      permissions: ["read", "update"],
    },
    {
      id: 3,
      name: "Viewer",
      description: "Read-only access to content",
      users: [
        { id: 4, name: "Alice Brown", email: "alice@example.com", roleId: 3 },
      ],
      permissions: ["read"],
    },
  ])

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as Permission[],
  })

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    roleId: 0,
  })

  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)

  const handleCreateRole = () => {
    if (newRole.name && newRole.description && newRole.permissions.length > 0) {
      setRoles([
        ...roles,
        {
          id: roles.length + 1,
          name: newRole.name,
          description: newRole.description,
          users: [],
          permissions: newRole.permissions,
        },
      ])
      setNewRole({ name: "", description: "", permissions: [] })
      setIsRoleDialogOpen(false)
    }
  }

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.roleId) {
      const updatedRoles = roles.map((role) => {
        if (role.id === newUser.roleId) {
          return {
            ...role,
            users: [
              ...role.users,
              {
                id: Math.max(...roles.flatMap((r) => r.users.map((u) => u.id))) + 1,
                name: newUser.name,
                email: newUser.email,
                roleId: newUser.roleId,
              },
            ],
          }
        }
        return role
      })
      setRoles(updatedRoles)
      setNewUser({ name: "", email: "", roleId: 0 })
      setIsUserDialogOpen(false)
    }
  }

  const removeUser = (roleId: number, userId: number) => {
    const updatedRoles = roles.map((role) => {
      if (role.id === roleId) {
        return {
          ...role,
          users: role.users.filter((user) => user.id !== userId),
        }
      }
      return role
    })
    setRoles(updatedRoles)
  }

  const permissions: Permission[] = ["create", "read", "update", "delete"]

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Space for top navbar */}
      <div className="h-16" />
      <div className="flex">
        {/* Space for side navbar */}
        <div className="w-64" />
        <main className="flex-1 p-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight">Role Management</h2>
              <div className="flex gap-2">
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <UserPlus className="h-4 w-4" /> Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>Add a new user and assign them a role.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select onValueChange={(value) => setNewUser({ ...newUser, roleId: Number(value) })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id.toString()}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddUser}>Add User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" /> Create Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Role</DialogTitle>
                      <DialogDescription>Add a new role with specific permissions.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Role Name</Label>
                        <Input
                          id="name"
                          value={newRole.name}
                          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={newRole.description}
                          onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Permissions</Label>
                        <div className="flex flex-wrap gap-4">
                          {permissions.map((permission) => (
                            <div key={permission} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission}
                                checked={newRole.permissions.includes(permission)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNewRole({
                                      ...newRole,
                                      permissions: [...newRole.permissions, permission],
                                    })
                                  } else {
                                    setNewRole({
                                      ...newRole,
                                      permissions: newRole.permissions.filter((p) => p !== permission),
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={permission} className="capitalize">
                                {permission}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateRole}>Create Role</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => (
                <Card key={role.id} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {role.name}
                      <Badge variant="secondary">{role.users.length} users</Badge>
                    </CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Permissions:</div>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="capitalize">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Users:</div>
                      <div className="space-y-2">
                        {role.users.map((user) => (
                          <div key={user.id} className="flex items-center justify-between gap-2 text-sm">
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-muted-foreground">{user.email}</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeUser(role.id, user.id)}
                              className="h-8 w-8 text-white"
                            >X
                              <X className="h-4 w-4 text-white" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

