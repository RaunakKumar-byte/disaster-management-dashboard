"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Disaster Management Dashboard
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Link 
            href="/dashboard"
            className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
            <p className="text-gray-600">
              Access the main dashboard with disaster map and resource management.
            </p>
          </Link>

          <Link 
            href="/dashboard/notifications"
            className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
            <p className="text-gray-600">
              View and manage emergency alerts and updates.
            </p>
          </Link>

          <Link 
            href="/dashboard/settings"
            className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">Settings</h2>
            <p className="text-gray-600">
              Configure your dashboard preferences and notifications.
            </p>
          </Link>

          <div className="block p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Quick Stats</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Active Disasters: 3</li>
              <li>Available Resources: 150</li>
              <li>Help Requests: 12</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
