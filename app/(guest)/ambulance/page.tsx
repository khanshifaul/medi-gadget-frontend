"use client";
import AmbulanceTable from "@/components/common/ambulance-table";
import { useState } from "react";

interface Ambulance {
  id: number;
  driverName: string;
  phoneNo: string;
  currentLocation: string;
}

const AmbulancePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const availableAmbulances: Ambulance[] = [
    {
      id: 1,
      driverName: "John Doe",
      phoneNo: "123-456-7890",
      currentLocation: "Downtown",
    },
    {
      id: 2,
      driverName: "Jane Smith",
      phoneNo: "987-654-3210",
      currentLocation: "Uptown",
    },
    {
      id: 3,
      driverName: "Alice Johnson",
      phoneNo: "555-123-4567",
      currentLocation: "Midtown",
    },
    {
      id: 4,
      driverName: "Bob Brown",
      phoneNo: "444-987-6543",
      currentLocation: "Suburbs",
    },
  ];

  const filteredAmbulances = availableAmbulances.filter(
    (ambulance) =>
      ambulance.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ambulance.currentLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:container mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        Available Ambulances
      </h1>
      <input
        type="text"
        placeholder="Search by driver name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full mx-auto"
      />
      <AmbulanceTable ambulances={filteredAmbulances} />
    </div>
  );
};

export default AmbulancePage;
