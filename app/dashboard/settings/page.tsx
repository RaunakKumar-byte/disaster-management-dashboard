"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Emergency Alerts</Label>
                <p className="text-sm text-gray-500">
                  Receive notifications for critical emergencies
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Resource Updates</Label>
                <p className="text-sm text-gray-500">
                  Get notified about resource allocation changes
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Help Requests</Label>
                <p className="text-sm text-gray-500">
                  Notifications for new help requests
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the dashboard looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                      theme === "light" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                      theme === "dark" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                      theme === "system" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <Globe className="h-4 w-4" />
                    System
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Map View</Label>
                <div className="grid grid-cols-3 gap-4">
                  <button className="px-4 py-2 text-sm border rounded-md bg-primary text-primary-foreground">
                    Satellite
                  </button>
                  <button className="px-4 py-2 text-sm border rounded-md bg-muted">
                    Terrain
                  </button>
                  <button className="px-4 py-2 text-sm border rounded-md bg-muted">
                    Street
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 