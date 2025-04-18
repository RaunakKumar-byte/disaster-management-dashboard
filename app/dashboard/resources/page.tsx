"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, Search, MapPin, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data for resources
const resourcesData = [
  {
    id: "1",
    type: "Medical",
    name: "First Aid Kits",
    quantity: 50,
    location: "Central Hospital",
    coordinates: [51.503, -0.11],
    status: "Available",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    type: "Food",
    name: "Canned Food",
    quantity: 200,
    location: "Community Center",
    coordinates: [51.51, -0.08],
    status: "Available",
    lastUpdated: "5 hours ago",
  },
  {
    id: "3",
    type: "Water",
    name: "Bottled Water",
    quantity: 500,
    location: "Distribution Center",
    coordinates: [51.495, -0.1],
    status: "Available",
    lastUpdated: "1 day ago",
  },
  {
    id: "4",
    type: "Shelter",
    name: "Emergency Tents",
    quantity: 20,
    location: "Warehouse",
    coordinates: [51.508, -0.12],
    status: "Available",
    lastUpdated: "2 days ago",
  },
  {
    id: "5",
    type: "Medical",
    name: "Medications",
    quantity: 100,
    location: "Pharmacy",
    coordinates: [51.502, -0.09],
    status: "Low",
    lastUpdated: "3 days ago",
  },
]

// Mock data for my resources
const myResourcesData = [
  {
    id: "6",
    type: "Transport",
    name: "4x4 Vehicle",
    quantity: 1,
    location: "My Location",
    coordinates: [51.505, -0.09],
    status: "Available",
    lastUpdated: "1 hour ago",
  },
  {
    id: "7",
    type: "Medical",
    name: "Medical Supplies",
    quantity: 10,
    location: "My Location",
    coordinates: [51.505, -0.09],
    status: "Available",
    lastUpdated: "3 hours ago",
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [resourceType, setResourceType] = useState("all")

  const filteredResources = resourcesData.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = resourceType === "all" || resource.type.toLowerCase() === resourceType.toLowerCase()

    return matchesSearch && matchesType
  })

  const filteredMyResources = myResourcesData.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = resourceType === "all" || resource.type.toLowerCase() === resourceType.toLowerCase()

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Package className="h-6 w-6 mr-2 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Resources</h2>
        </div>
        <Button asChild>
          <Link href="/dashboard/resources/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Resources
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search resources by name, type, or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="w-full md:w-1/3">
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
          >
            <option value="all">All Types</option>
            <option value="medical">Medical</option>
            <option value="food">Food</option>
            <option value="water">Water</option>
            <option value="shelter">Shelter</option>
            <option value="transport">Transport</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">Available Resources</TabsTrigger>
          <TabsTrigger value="my-resources">My Resources</TabsTrigger>
          <TabsTrigger value="map">Resource Map</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Resources</CardTitle>
              <CardDescription>Resources available for disaster relief efforts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>{resource.type}</TableCell>
                        <TableCell>{resource.name}</TableCell>
                        <TableCell>{resource.quantity}</TableCell>
                        <TableCell>{resource.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              resource.status === "Available"
                                ? "default"
                                : resource.status === "Low"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {resource.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{resource.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/map?resource=${resource.id}`}>
                              <MapPin className="h-4 w-4" />
                              <span className="sr-only">View on map</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/resources/request/${resource.id}`}>
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Request</span>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No resources found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Resources</CardTitle>
              <CardDescription>Resources you have contributed to relief efforts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMyResources.length > 0 ? (
                    filteredMyResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>{resource.type}</TableCell>
                        <TableCell>{resource.name}</TableCell>
                        <TableCell>{resource.quantity}</TableCell>
                        <TableCell>{resource.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              resource.status === "Available"
                                ? "default"
                                : resource.status === "Low"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {resource.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{resource.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/resources/edit/${resource.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No resources found matching your search criteria
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
              <CardTitle>Resource Map</CardTitle>
              <CardDescription>View all available resources on the map</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] bg-muted/20 rounded-md border flex items-center justify-center">
                <p className="text-muted-foreground">Resource map will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
