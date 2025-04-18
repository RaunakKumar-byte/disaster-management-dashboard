"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

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

interface CustomMapProps {
  activeDisasters: boolean
  showResources: boolean
  showHelpRequests: boolean
}

export default function CustomMap({
  activeDisasters = true,
  showResources = true,
  showHelpRequests = true,
}: CustomMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedMarker, setSelectedMarker] = useState<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapImage, setMapImage] = useState<HTMLImageElement | null>(null)

  // Convert geo coordinates to canvas coordinates
  const geoToCanvas = (lat: number, lng: number, canvas: HTMLCanvasElement) => {
    // Simple linear mapping for demo purposes
    // In a real app, you'd use proper geo projection
    const centerLat = 51.505
    const centerLng = -0.09
    const scale = 10000

    const x = (lng - centerLng) * scale + canvas.width / 2
    const y = -(lat - centerLat) * scale + canvas.height / 2

    return { x, y }
  }

  // Draw the map and markers
  const drawMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw map background
    if (mapImage) {
      ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height)
    } else {
      // Fallback if map image fails to load
      ctx.fillStyle = "#e5e7eb"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
    }

    // Draw disaster markers
    if (activeDisasters) {
      disasterData.forEach((disaster) => {
        const { x, y } = geoToCanvas(disaster.coordinates[0], disaster.coordinates[1], canvas)

        // Draw marker
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, 2 * Math.PI)
        ctx.fillStyle = disaster.status === "Active" ? "#ef4444" : "#eab308"
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    // Draw resource markers
    if (showResources) {
      resourceData.forEach((resource) => {
        const { x, y } = geoToCanvas(resource.coordinates[0], resource.coordinates[1], canvas)

        // Draw marker
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, 2 * Math.PI)
        ctx.fillStyle = "#22c55e"
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    // Draw help request markers
    if (showHelpRequests) {
      helpRequestData.forEach((request) => {
        const { x, y } = geoToCanvas(request.coordinates[0], request.coordinates[1], canvas)

        // Draw marker
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, 2 * Math.PI)
        ctx.fillStyle = "#3b82f6"
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    // Draw selected marker info if any
    if (selectedMarker) {
      const { x, y } = geoToCanvas(selectedMarker.coordinates[0], selectedMarker.coordinates[1], canvas)

      // Draw highlight around selected marker
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, 2 * Math.PI)
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw info box
      const boxWidth = 200
      const boxHeight = 100
      let boxX = x + 20
      let boxY = y - 50

      // Adjust box position if it would go off canvas
      if (boxX + boxWidth > canvas.width) boxX = x - boxWidth - 20
      if (boxY < 0) boxY = y + 20
      if (boxY + boxHeight > canvas.height) boxY = canvas.height - boxHeight - 10

      // Draw box background
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight)
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight)

      // Draw text
      ctx.fillStyle = "#000000"
      ctx.font = "bold 14px Arial"
      ctx.fillText(selectedMarker.type, boxX + 10, boxY + 20)
      ctx.font = "12px Arial"
      ctx.fillText(`Location: ${selectedMarker.location}`, boxX + 10, boxY + 40)

      if ("severity" in selectedMarker) {
        ctx.fillText(`Severity: ${selectedMarker.severity}`, boxX + 10, boxY + 60)
        ctx.fillText(`Status: ${selectedMarker.status}`, boxX + 10, boxY + 80)
      } else if ("quantity" in selectedMarker) {
        ctx.fillText(`Quantity: ${selectedMarker.quantity}`, boxX + 10, boxY + 60)
      } else if ("urgency" in selectedMarker) {
        ctx.fillText(`Urgency: ${selectedMarker.urgency}`, boxX + 10, boxY + 60)
      }
    }

    setMapLoaded(true)
  }

  // Handle canvas click to select markers
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if click is on any marker
    const checkMarker = (marker: any) => {
      const { x: markerX, y: markerY } = geoToCanvas(marker.coordinates[0], marker.coordinates[1], canvas)
      const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2))
      return distance <= 10 // 10px radius
    }

    // Check all visible markers
    let found = false

    if (activeDisasters) {
      const disaster = disasterData.find(checkMarker)
      if (disaster) {
        setSelectedMarker(disaster)
        found = true
      }
    }

    if (!found && showResources) {
      const resource = resourceData.find(checkMarker)
      if (resource) {
        setSelectedMarker(resource)
        found = true
      }
    }

    if (!found && showHelpRequests) {
      const request = helpRequestData.find(checkMarker)
      if (request) {
        setSelectedMarker(request)
        found = true
      }
    }

    if (!found) {
      setSelectedMarker(null)
    }

    // Redraw the map
    drawMap()
  }

  // Load map background image
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      setMapImage(img)
    }
    img.onerror = () => {
      console.error("Failed to load map image")
      setMapLoaded(true) // Still mark as loaded so we show the fallback
    }
    img.src = "/placeholder.svg?height=600&width=800"
  }, [])

  // Initialize canvas and draw map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Draw initial map
    drawMap()

    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      drawMap()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mapImage])

  // Redraw when filters change
  useEffect(() => {
    drawMap()
  }, [activeDisasters, showResources, showHelpRequests, selectedMarker, mapImage])

  return (
    <div className="relative w-full h-[600px]">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full rounded-md cursor-pointer" onClick={handleCanvasClick} />
    </div>
  )
}
