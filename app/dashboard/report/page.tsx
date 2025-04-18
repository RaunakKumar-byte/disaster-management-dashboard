"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Upload, MapPin, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import CustomLocationPicker from "@/components/custom-location-picker"

export default function ReportDisasterPage() {
  const [disasterType, setDisasterType] = useState("")
  const [severity, setSeverity] = useState("")
  const [location, setLocation] = useState("")
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null)
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!coordinates) {
      toast({
        title: "Location required",
        description: "Please select a location on the map",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Disaster reported",
        description: "Your report has been submitted successfully",
      })

      router.push("/dashboard/map")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit disaster report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLocationSelect = (coords: [number, number], address: string) => {
    setCoordinates(coords)
    setLocation(address)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <AlertTriangle className="h-6 w-6 mr-2 text-destructive" />
        <h2 className="text-3xl font-bold tracking-tight">Report Disaster</h2>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Disaster Information</CardTitle>
            <CardDescription>Provide details about the disaster to help coordinate relief efforts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="disaster-type">Disaster Type</Label>
                <Select value={disasterType} onValueChange={setDisasterType} required>
                  <SelectTrigger id="disaster-type">
                    <SelectValue placeholder="Select disaster type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="earthquake">Earthquake</SelectItem>
                    <SelectItem value="landslide">Landslide</SelectItem>
                    <SelectItem value="hurricane">Hurricane/Cyclone</SelectItem>
                    <SelectItem value="tornado">Tornado</SelectItem>
                    <SelectItem value="tsunami">Tsunami</SelectItem>
                    <SelectItem value="drought">Drought</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select value={severity} onValueChange={setSeverity} required>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Address or landmark"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <Button type="button" variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Select Location on Map</Label>
              <CustomLocationPicker onLocationSelect={handleLocationSelect} />
              {coordinates && (
                <p className="text-sm text-muted-foreground">
                  Selected coordinates: {coordinates[0].toFixed(6)}, {coordinates[1].toFixed(6)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the disaster, current situation, and immediate needs"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">Upload Photos (optional)</Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop files here or click to browse</p>
                <Input id="photos" type="file" multiple accept="image/*" className="hidden" />
                <Button type="button" variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Disaster
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
