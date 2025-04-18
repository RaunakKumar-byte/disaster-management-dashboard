"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, XCircle } from "lucide-react";

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: "New Emergency Alert",
    message: "Flash flood warning in Central District",
    timestamp: "10 minutes ago",
    type: "emergency",
    read: false,
  },
  {
    id: 2,
    title: "Resource Update",
    message: "Medical supplies dispatched to Northern Hospital",
    timestamp: "1 hour ago",
    type: "info",
    read: false,
  },
  {
    id: 3,
    title: "Help Request Resolved",
    message: "Evacuation completed in Western Region",
    timestamp: "2 hours ago",
    type: "success",
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <button className="text-sm text-blue-500 hover:text-blue-600">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-blue-100">
                    <Bell className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">
                      {notification.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {notification.timestamp}
                  </span>
                  {notification.read ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
} 