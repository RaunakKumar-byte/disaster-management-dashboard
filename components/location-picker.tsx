"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

interface LocationPickerProps {
  onLocationSelect: (coordinates: [number, number], address: string) => void
}

// Empty component to use before map is loaded
const MapPlaceholder = () => (
  <div className="w-full h-[300px] flex items-center justify-center bg-muted/20 rounded-md border">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
)

// The actual location picker component that will be loaded dynamically
function LocationPickerComponent({ onLocationSelect }: LocationPickerProps) {
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)
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
        const mapInstance = L.map("location-picker").setView([51.505, -0.09], 13)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstance)

        setMap(mapInstance)

        // Add click handler
        mapInstance.on("click", (e: any) => {
          const { lat, lng } = e.latlng

          // Remove existing marker
          if (marker) {
            mapInstance.removeLayer(marker)
          }

          // Add new marker
          const newMarker = L.marker([lat, lng]).addTo(mapInstance)
          setMarker(newMarker)

          // Get address from coordinates (reverse geocoding)
          // In a real app, you would use a geocoding service
          // For demo purposes, we'll use a placeholder
          const address = `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`

          onLocationSelect([lat, lng], address)
        })

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
  }, [onLocationSelect])

  return <div id="location-picker" className="w-full h-[300px] rounded-md" />
}

// Export a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(LocationPickerComponent), {
  ssr: false,
  loading: () => <MapPlaceholder />,
})
