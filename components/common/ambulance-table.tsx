"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy } from "lucide-react";
import { useCallback } from "react";

interface Ambulance {
  id: number;
  driverName: string;
  phoneNo: string;
  currentLocation: string;
}

interface AmbulanceTableProps {
  ambulances: Ambulance[];
}

const AmbulanceTable: React.FC<AmbulanceTableProps> = ({ ambulances }) => {
  const copyToClipboard = useCallback((phoneNo: string) => {
    navigator.clipboard
      .writeText(phoneNo)
      .then(() => {
        alert(`Copied ${phoneNo} to clipboard!`);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, []);

  return (
    <Table className="min-w-full border-collapse border border-gray-300">
      <TableHeader>
        <TableRow>
          <TableHead className="border border-gray-300 p-4 max-w-fit">
            Serial No
          </TableHead>
          <TableHead className="border border-gray-300 p-4">
            Driver Name
          </TableHead>
          <TableHead className="border border-gray-300 p-4">Phone No</TableHead>
          <TableHead className="border border-gray-300 p-4">
            Current Location
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ambulances.map((ambulance: Ambulance, index: number) => (
          <TableRow key={ambulance.id}>
            <TableCell className="border border-gray-300 p-4">
              {index + 1}
            </TableCell>
            <TableCell className="border border-gray-300 p-4">
              {ambulance.driverName}
            </TableCell>
            <TableCell className="border border-gray-300 p-4 flex items-center">
              <a href={`tel:${ambulance.phoneNo}`} className="mr-2">
                {ambulance.phoneNo}
              </a>
              <Button
                variant={"ghost"}
                onClick={() => copyToClipboard(ambulance.phoneNo)}
                className="p-0 aspect-square"
              >
                <Copy color="#464444" />
              </Button>
            </TableCell>
            <TableCell className="border border-gray-300 p-4">
              {ambulance.currentLocation}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AmbulanceTable;
