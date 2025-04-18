"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Mock data for map markers
const disasterData = [
  {
    id: "1",
    type: "Flood",
    location: "Central District",
    coordinates: [51.505, -0.09],
    severity: "High",
    status: "Active",
  },
  {
    id: "2",
    type: "Fire",
    location: "Northern Forest",
    coordinates: [51.51, -0.1],
    severity: "Medium",
    status: "Active",
  },
  {
    id: "3",
    type: "Earthquake",
    location: "Western Region",
    coordinates: [51.49, -0.12],
    severity: "High",
    status: "Active",
  },
  {
    id: "4",
    type: "Landslide",
    location: "Mountain Pass",
    coordinates: [51.52, -0.08],
    severity: "Medium",
    status: "Contained",
  },
]

const resourceData = [
  {
    id: "1",
    type: "Medical",
    location: "Central Hospital",
    coordinates: [51.503, -0.11],
    quantity: "High",
  },
  {
    id: "2",
    type: "Food",
    location: "Community Center",
    coordinates: [51.51, -0.08],
    quantity: "Medium",
  },
  {
    id: "3",
    type: "Shelter",
    location: "School Gymnasium",
    coordinates: [51.495, -0.1],
    quantity: "Low",
  },
]

const helpRequestData = [
  {
    id: "1",
    type: "Medical",
    location: "Apartment Complex",
    coordinates: [51.508, -0.11],
    urgency: "High",
  },
  {
    id: "2",
    type: "Evacuation",
    location: "Riverside Homes",
    coordinates: [51.502, -0.095],
    urgency: "High",
  },
  {
    id: "3",
    type: "Food and Water",
    location: "Senior Living Center",
    coordinates: [51.498, -0.085],
    urgency: "Medium",
  },
]

interface DisasterMapProps {
  activeDisasters: boolean
  showResources: boolean
  showHelpRequests: boolean
}

// Empty component to use before map is loaded
const MapPlaceholder = () => (
  <div className="w-full h-[600px] flex items-center justify-center bg-muted/20 rounded-md border">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
)

// The actual map component that will be loaded dynamically
function DisasterMapComponent({
  activeDisasters = true,
  showResources = true,
  showHelpRequests = true,
}: DisasterMapProps) {
  const [map, setMap] = useState<any>(null)
  const [leaflet, setLeaflet] = useState<any>(null)

  useEffect(() => {
    // Import Leaflet dynamically only on the client side
    const loadLeaflet = async () => {
      try {
        const L = (await import("leaflet")).default
        // Import Leaflet CSS
        await import("leaflet/dist/leaflet.css")
        setLeaflet(L)

        // Initialize map
        const mapInstance = L.map("map").setView([51.505, -0.09], 13)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstance)

        setMap(mapInstance)

        return () => {
          if (mapInstance) {
            mapInstance.remove()
          }
        }
      } catch (error) {
        console.error("Error loading Leaflet:", error)
      }
    }

    loadLeaflet()
  }, [])

  useEffect(() => {
    if (!map || !leaflet) return

    // Clear existing markers
    map.eachLayer((layer: any) => {
      if (layer instanceof leaflet.Marker) {
        map.removeLayer(layer)
      }
    })

    // Add disaster markers
    if (activeDisasters) {
      disasterData.forEach((disaster) => {
        const icon = leaflet.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: ${
            disaster.status === "Active" ? "#ef4444" : "#eab308"
          }; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [20, 20],
        })

        const marker = leaflet
          .marker(disaster.coordinates as [number, number], { icon })
          .addTo(map)
          .bindPopup(`
            <strong>${disaster.type}</strong><br>
            Location: ${disaster.location}<br>
            Severity: ${disaster.severity}<br>
            Status: ${disaster.status}
          `)
      })
    }

    // Add resource markers
    if (showResources) {
      resourceData.forEach((resource) => {
        const icon = leaflet.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: #22c55e; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [20, 20],
        })

        const marker = leaflet
          .marker(resource.coordinates as [number, number], { icon })
          .addTo(map)
          .bindPopup(`
            <strong>${resource.type} Resources</strong><br>
            Location: ${resource.location}<br>
            Quantity: ${resource.quantity}
          `)
      })
    }

    // Add help request markers
    if (showHelpRequests) {
      helpRequestData.forEach((request) => {
        const icon = leaflet.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [20, 20],
        })

        const marker = leaflet
          .marker(request.coordinates as [number, number], { icon })
          .addTo(map)
          .bindPopup(`
            <strong>Help Request: ${request.type}</strong><br>
            Location: ${request.location}<br>
            Urgency: ${request.urgency}
          `)
      })
    }
  }, [map, leaflet, activeDisasters, showResources, showHelpRequests])

  return <div id="map" className="w-full h-[600px]" />
}

// Export a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(DisasterMapComponent), {
  ssr: false,
  loading: () => <MapPlaceholder />,
})
