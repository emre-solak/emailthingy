import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Button from "./ui/button";
import Card, { CardContent } from "./ui/card";
import Input from "./ui/input";

export default function Dashboard() {
  const { data: session } = useSession();
  const [organizationUsers, setOrganizationUsers] = useState([]);
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/fetchUserRole");
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchUserRole();
  }, []);

if (!session) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome</h1>
        <p className="text-lg text-gray-600 mb-6">Sign in to access your dashboard</p>

        <div className="flex flex-col gap-6 w-full">
          <button 
            onClick={() => signIn("google", { scope: "https://www.googleapis.com/auth/gmail.readonly" })} 
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-xl text-lg shadow-md transition-all transform hover:scale-105"
          >
            🔴 Sign in with Google
          </button>
          <button 
            onClick={() => signIn("azure-ad", { scope: "Mail.Read Mail.ReadWrite" })} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl text-lg shadow-md transition-all transform hover:scale-105"
          >
            🔵 Sign in with Office 365
          </button>
        </div>
      </motion.div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mb-8">Manage organization users and roles.</p>
        
        {userRole === "admin" && (
          <Card className="shadow-lg p-6 bg-white w-full mt-6">
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Manage Organization Users</h2>
              <ul>
                {organizationUsers.map((user, index) => (
                  <li key={index} className="border-b py-2 flex justify-between items-center">
                    <span>{user.name} - {user.email} ({user.role})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        
        <div className="mt-6 flex justify-between w-full">
          <Button onClick={() => signOut()} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg">
            Sign Out
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

