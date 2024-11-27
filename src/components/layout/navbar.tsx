'use client'

import { useState } from 'react'
import { Bell, Search, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className={`flex items-center gap-2 ${isMobile ? 'justify-start w-full' : ''}`}>
            <Bell className="h-5 w-5" />
            <span className={`${isMobile ? '' : 'hidden md:inline-block'}`}>Alerts</span>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary md:hidden" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Notifications</h4>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">New notification {i + 1}</p>
                  <p className="text-sm text-muted-foreground">
                    This is a sample notification message.
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  )

  return (
    <div className="w-full fixed top-0 z-50 bg-background border-b">
      <div className="flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center text-lg font-semibold mr-4">
          Shourya VRV
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <div className="relative w-full max-w-md mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 w-full" />
              </div>
              <NavItems isMobile={true} />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex-1 md:flex-none">
          <div className="relative max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 w-full md:w-[300px]" />
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <div className="hidden md:flex items-center gap-2 mr-2">
            <NavItems />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
