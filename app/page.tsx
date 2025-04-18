"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import dynamic from "next/dynamic";
import { ActiveResourcesChart } from "@/components/active-resources-chart";
import { RecentDisastersTable } from "@/components/recent-disasters-table";

// Dynamically import the DisasterMap component with no SSR
const DisasterMap = dynamic(() => import("@/components/disaster-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-muted/20 rounded-md border">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Disaster Map</h2>
              <DisasterMap 
                activeDisasters={true}
                showResources={true}
                showHelpRequests={true}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Active Resources</h2>
              <ActiveResourcesChart />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Disasters</h2>
            <RecentDisastersTable />
          </div>
        </main>
      </div>
    </div>
  );
}
