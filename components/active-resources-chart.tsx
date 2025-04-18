"use client"

import { useEffect, useRef } from "react"

// Mock data for resources
const resourceData = {
  labels: ["Medical", "Food", "Water", "Shelter", "Transport", "Volunteers"],
  datasets: [
    {
      data: [25, 20, 18, 15, 12, 10],
      backgroundColor: [
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

export function ActiveResourcesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // This is a simplified version - in a real app, you'd use a proper chart library like Chart.js
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    let startAngle = 0
    const total = resourceData.datasets[0].data.reduce((a, b) => a + b, 0)

    // Draw pie chart
    resourceData.datasets[0].data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = resourceData.datasets[0].backgroundColor[index]
      ctx.strokeStyle = resourceData.datasets[0].borderColor[index]
      ctx.lineWidth = resourceData.datasets[0].borderWidth

      ctx.fill()
      ctx.stroke()

      startAngle += sliceAngle
    })

    // Draw legend
    const legendX = 10
    let legendY = canvas.height - 10 - resourceData.labels.length * 25

    resourceData.labels.forEach((label, index) => {
      const value = resourceData.datasets[0].data[index]
      const percentage = Math.round((value / total) * 100)

      // Color box
      ctx.fillStyle = resourceData.datasets[0].backgroundColor[index]
      ctx.fillRect(legendX, legendY, 15, 15)

      // Label text
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.fillText(`${label}: ${percentage}%`, legendX + 20, legendY + 12)

      legendY += 25
    })
  }, [])

  return (
    <div className="w-full h-[300px] relative">
      <canvas ref={canvasRef} width={400} height={300} className="w-full h-full" />
    </div>
  )
}
