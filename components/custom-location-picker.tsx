"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface CustomLocationPickerProps {
  onLocationSelect: (coordinates: [number, number], address: string) => void
}

export default function CustomLocationPicker({ onLocationSelect }: CustomLocationPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapImage, setMapImage] = useState<HTMLImageElement | null>(null)

  // Convert canvas coordinates to geo coordinates
  const canvasToGeo = (x: number, y: number, canvas: HTMLCanvasElement): [number, number] => {
    // Simple linear mapping for demo purposes
    // In a real app, you'd use proper geo projection
    const centerLat = 51.505
    const centerLng = -0.09
    const scale = 10000

    const lng = (x - canvas.width / 2) / scale + centerLng
    const lat = -((y - canvas.height / 2) / scale) + centerLat

    return [lat, lng]
  }

  // Convert geo coordinates to canvas coordinates
  const geoToCanvas = (lat: number, lng: number, canvas: HTMLCanvasElement) => {
    // Simple linear mapping for demo purposes
    const centerLat = 51.505
    const centerLng = -0.09
    const scale = 10000

    const x = (lng - centerLng) * scale + canvas.width / 2
    const y = -(lat - centerLat) * scale + canvas.height / 2

    return { x, y }
  }

  // Draw the map and marker
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
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
    }

    // Draw selected location marker if any
    if (selectedLocation) {
      const { x, y } = geoToCanvas(selectedLocation[0], selectedLocation[1], canvas)

      // Draw marker
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, 2 * Math.PI)
      ctx.fillStyle = "#ef4444"
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw crosshair
      ctx.beginPath()
      ctx.moveTo(x - 15, y)
      ctx.lineTo(x + 15, y)
      ctx.moveTo(x, y - 15)
      ctx.lineTo(x, y + 15)
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw instructions if no location selected
    if (!selectedLocation) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(10, 10, 220, 30)
      ctx.fillStyle = "#ffffff"
      ctx.font = "14px Arial"
      ctx.fillText("Click on the map to select a location", 20, 30)
    }

    setMapLoaded(true)
  }

  // Handle canvas click to select location
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Convert to geo coordinates
    const coordinates = canvasToGeo(x, y, canvas)
    setSelectedLocation(coordinates)

    // Generate address string (in a real app, you'd use reverse geocoding)
    const address = `Location at ${coordinates[0].toFixed(6)}, ${coordinates[1].toFixed(6)}`

    // Call the callback
    onLocationSelect(coordinates, address)

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
    img.src = "/placeholder.svg?height=300&width=600"
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

  // Redraw when selected location changes
  useEffect(() => {
    drawMap()
  }, [selectedLocation, mapImage])

  return (
    <div className="relative w-full h-[300px]">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full rounded-md cursor-crosshair" onClick={handleCanvasClick} />
    </div>
  )
}
