"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock data for recent disasters
const recentDisasters = [
  {
    id: "1",
    type: "Flood",
    location: "Central District",
    severity: "High",
    reportedAt: "2 hours ago",
    status: "Active",
  },
  {
    id: "2",
    type: "Fire",
    location: "Northern Forest",
    severity: "Medium",
    reportedAt: "5 hours ago",
    status: "Active",
  },
  {
    id: "3",
    type: "Earthquake",
    location: "Western Region",
    severity: "High",
    reportedAt: "1 day ago",
    status: "Active",
  },
  {
    id: "4",
    type: "Landslide",
    location: "Mountain Pass",
    severity: "Medium",
    reportedAt: "2 days ago",
    status: "Contained",
  },
  {
    id: "5",
    type: "Storm",
    location: "Coastal Area",
    severity: "Low",
    reportedAt: "3 days ago",
    status: "Resolved",
  },
]

export function RecentDisastersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reported</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentDisasters.map((disaster) => (
          <TableRow key={disaster.id}>
            <TableCell>{disaster.type}</TableCell>
            <TableCell>{disaster.location}</TableCell>
            <TableCell>
              <Badge
                variant={
                  disaster.severity === "High" ? "destructive" : disaster.severity === "Medium" ? "default" : "outline"
                }
              >
                {disaster.severity}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  disaster.status === "Active" ? "destructive" : disaster.status === "Contained" ? "default" : "outline"
                }
              >
                {disaster.status}
              </Badge>
            </TableCell>
            <TableCell>{disaster.reportedAt}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/dashboard/map?disaster=${disaster.id}`}>
                  <MapPin className="h-4 w-4" />
                  <span className="sr-only">View on map</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/dashboard/disasters/${disaster.id}`}>
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
