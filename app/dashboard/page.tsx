"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, Package, Users, MessageSquareIcon as MessageSquareHelp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { RecentDisastersTable } from "@/components/recent-disasters-table"
import { ActiveResourcesChart } from "@/components/active-resources-chart"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/map">
              View Map <MapPin className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/report">
              Report Disaster <AlertTriangle className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Alert className="bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-300">Active Disaster Alert</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          Flooding reported in Central District. Resources needed.{" "}
          <Link href="/dashboard/map" className="font-medium underline">
            View on map
          </Link>
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disasters</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 in the last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Resources</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <p className="text-xs text-muted-foreground">+18 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+32 in the last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Help Requests</CardTitle>
            <MessageSquareHelp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">-5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Disasters</CardTitle>
            <CardDescription>Latest reported incidents across all regions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentDisastersTable />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Resource Distribution</CardTitle>
            <CardDescription>Current allocation of resources by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ActiveResourcesChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link href="/dashboard/resources/add">
                Add Resources <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link href="/dashboard/help-requests/create">
                Request Help <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link href="/dashboard/map">
                View Disaster Map <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Nearby Volunteers</CardTitle>
            <CardDescription>People available to help in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">Medical, 2.3 km away</p>
                  </div>
                </div>
                <Button size="sm">Contact</Button>
              </div>
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Mike Smith</p>
                    <p className="text-sm text-muted-foreground">Transport, 3.1 km away</p>
                  </div>
                </div>
                <Button size="sm">Contact</Button>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Amy Lee</p>
                    <p className="text-sm text-muted-foreground">Logistics, 4.7 km away</p>
                  </div>
                </div>
                <Button size="sm">Contact</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
