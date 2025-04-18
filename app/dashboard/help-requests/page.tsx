"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MessageSquareIcon as MessageSquareHelp, Plus, MapPin, Edit, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data for help requests
const helpRequestsData = [
  {
    id: "1",
    type: "Medical",
    description: "Need medical supplies and assistance for elderly residents",
    location: "Apartment Complex, Central District",
    coordinates: [51.508, -0.11],
    urgency: "High",
    status: "Open",
    requestedBy: "John Doe",
    requestedAt: "2 hours ago",
  },
  {
    id: "2",
    type: "Evacuation",
    description: "Families trapped by rising water levels need evacuation",
    location: "Riverside Homes, Eastern District",
    coordinates: [51.502, -0.095],
    urgency: "High",
    status: "In Progress",
    requestedBy: "Sarah Johnson",
    requestedAt: "5 hours ago",
  },
  {
    id: "3",
    type: "Food and Water",
    description: "Need food and water supplies for 50 people",
    location: "Senior Living Center, Western District",
    coordinates: [51.498, -0.085],
    urgency: "Medium",
    status: "Open",
    requestedBy: "Community Center",
    requestedAt: "1 day ago",
  },
  {
    id: "4",
    type: "Shelter",
    description: "Temporary shelter needed for 10 families",
    location: "School, Northern District",
    coordinates: [51.515, -0.1],
    urgency: "Medium",
    status: "Open",
    requestedBy: "School Principal",
    requestedAt: "2 days ago",
  },
  {
    id: "5",
    type: "Medical",
    description: "Diabetic supplies needed urgently",
    location: "Residential Area, Southern District",
    coordinates: [51.49, -0.1],
    urgency: "High",
    status: "Completed",
    requestedBy: "Maria Garcia",
    requestedAt: "3 days ago",
  },
]

// Mock data for my help requests
const myHelpRequestsData = [
  {
    id: "6",
    type: "Food and Water",
    description: "Need food and water for 5 people",
    location: "My Location",
    coordinates: [51.505, -0.09],
    urgency: "Medium",
    status: "Open",
    requestedBy: "Me",
    requestedAt: "1 hour ago",
  },
]

export default function HelpRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRequests = helpRequestsData.filter((request) => {
    const matchesSearch =
      request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const filteredMyRequests = myHelpRequestsData.filter((request) => {
    const matchesSearch =
      request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquareHelp className="h-6 w-6 mr-2 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Help Requests</h2>
        </div>
        <Button asChild>
          <Link href="/dashboard/help-requests/create">
            <Plus className="mr-2 h-4 w-4" />
            Request Help
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search by type, description, location, or requester"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="all-requests">
        <TabsList>
          <TabsTrigger value="all-requests">All Requests</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="map">Request Map</TabsTrigger>
        </TabsList>

        <TabsContent value="all-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Help Requests</CardTitle>
              <CardDescription>View and respond to help requests from affected individuals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Requested At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.type}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={request.description}>
                          {request.description}
                        </TableCell>
                        <TableCell>{request.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.urgency === "High"
                                ? "destructive"
                                : request.urgency === "Medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {request.urgency}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "Open"
                                ? "destructive"
                                : request.status === "In Progress"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.requestedBy}</TableCell>
                        <TableCell>{request.requestedAt}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/map?request=${request.id}`}>
                              <MapPin className="h-4 w-4" />
                              <span className="sr-only">View on map</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/help-requests/${request.id}`}>
                              <ArrowRight className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No help requests found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Help Requests</CardTitle>
              <CardDescription>View and manage help requests you have submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMyRequests.length > 0 ? (
                    filteredMyRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.type}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={request.description}>
                          {request.description}
                        </TableCell>
                        <TableCell>{request.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.urgency === "High"
                                ? "destructive"
                                : request.urgency === "Medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {request.urgency}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "Open"
                                ? "destructive"
                                : request.status === "In Progress"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.requestedAt}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/help-requests/edit/${request.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/map?request=${request.id}`}>
                              <MapPin className="h-4 w-4" />
                              <span className="sr-only">View on map</span>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        You haven't submitted any help requests yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Help Request Map</CardTitle>
              <CardDescription>View all help requests on the map</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] bg-muted/20 rounded-md border flex items-center justify-center">
                <p className="text-muted-foreground">Help request map will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
