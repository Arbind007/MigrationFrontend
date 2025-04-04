import React, { useState, useEffect } from "react";
import { Card, CardContent} from "../ui/Card";
import { Progress } from "../ui/Progress";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from "recharts";
import { Button } from "../ui/Button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/Select";
import { Input } from "../ui/Input";

import 'bootstrap/dist/css/bootstrap.min.css';
const COLORS = ["#4CAF50", "#FF9800", "#F44336"];


const idpOptions = [
  { id: "select", name: "select", attributes: [] },
  { id: "okta", name: "Okta", attributes: ["Username", "Email", "Groups"] },
  { id: "auth0", name: "Auth0", attributes: ["User ID", "Email", "Roles"] },
  { id: "azure", name: "Azure AD", attributes: ["UPN", "Display Name", "Groups"] },
];

const Dashboard = () => {
  const [migrationData, setMigrationData] = useState({
    totalUsers: 1000,
    migratedUsers: 780,
    failedUsers: 50,
    pendingUsers: 170,
    errorLogs: []
  });

  const [selectedSourceIdp, setSelectedSourceIdp] = useState(null);
  const [selectedDestinationIdp, setSelectedDestinationIdp] = useState(null);
  const [logs, setLogs] = useState([]);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prevLogs) => [...prevLogs, `Checking migration status...`]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSourceIdpChange = (value) => {
    setSelectedSourceIdp(idpOptions.find((option) => option.id === value));
  };
  

  const handleDestinationIdpChange = (value) => {
    setSelectedDestinationIdp(idpOptions.find((option) => option.id === value));
  };

  const handleInputChange = (attribute, value) => {
    setInputValues({ ...inputValues, [attribute]: value });
  };

  const handleImport = () => {
    setLogs((prevLogs) => [...prevLogs, "Importing data from source to destination..."]);
  };

  const handleAbortImport = () => {
    setLogs((prevLogs) => [...prevLogs, "Stoping the Import dataprocess..."]);
  };

  const pieData = [
    { name: "Migrated", value: migrationData.migratedUsers },
    { name: "Pending", value: migrationData.pendingUsers },
    { name: "Failed", value: migrationData.failedUsers },
  ];

  return (
    
    <div className="bg-primary">
      
      <p class="py-3 bg-primary">
      </p>
      <Card className="container-xl">
        
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Select Source and Destination IDPs</h2>
          <div className="row g-3">
            <div className="col-md-6">
              <h3 className="text-lg font-semibold">Source IDP</h3>
              <p></p>
              <Select onValueChange={handleSourceIdpChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Source IDP" />
                </SelectTrigger>
                <SelectContent>
                  {idpOptions.map((idp) => (
                    <SelectItem key={idp.id} value={idp.id}>{idp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p class="py-2"></p>
              {selectedSourceIdp && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold">Enter Source IDP Details</h4>
                  <p></p>
                  {selectedSourceIdp.attributes.map((attr) => (
                    <p>
                    <Input id="customInput" key={attr} placeholder={attr} className="mt-4" onChange={(e) => handleInputChange(attr, e.target.value)} />
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <h3 className="text-lg font-semibold">Destination IDP</h3>
              <p></p>
              <Select onValueChange={handleDestinationIdpChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Destination IDP" />
                </SelectTrigger>
                <SelectContent>
                  {idpOptions.map((idp) => (
                    <SelectItem key={idp.id} value={idp.id}>{idp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p class="py-2"></p>
              {selectedDestinationIdp && (
                <div className="">
                  <h4 className="text-lg font-semibold">Enter Source IDP Details</h4>
                  <p></p>
                  {selectedDestinationIdp.attributes.map((attr) => (
                    <p>
                    <Input key={attr} placeholder={attr} className="form-control form-control-lg" onChange={(e) => handleInputChange(attr, e.target.value)} />
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p class="py-1"></p>
          <Button onClick={handleImport} className="my-2 btn btn-primary">Import</Button>
          <p class="py-1"></p>
        </CardContent>
      </Card>

      <p class="py-3 bg-primary">
      </p>
      <div className="container-xl">
      <div className="row">
      <Card className="col-md-6">
        <CardContent>
          <h2 className="text-xl font-semibold">Migration Progress</h2>
          <Progress value={(migrationData.migratedUsers / migrationData.totalUsers) * 100} className="mt-4" />
          <div class="spinner-border m-5" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p></p>
          <div class="clearfix">
            <div class="float-end">
            <Button type="button" className="btn btn-danger" onClick={handleAbortImport}>Stop Migration</Button>
            </div>
          </div>
        </CardContent>
      </Card> 
      <div className="col-md-1"></div>
      <Card className="col-md-5">
        <CardContent>
          <h2 className="text-xl font-semibold">Migration Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={110} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      </div>
      </div>

      <p class="py-3 bg-primary">
      </p>
      {/* Error logs */}

      <Card className="container">
        <CardContent>
          <h2 className="text-xl font-semibold">Error Logs</h2>
          <p class="py-1"></p>
          <div className="mt-2 bg-black text-success p-4 h-40 overflow-y-auto font-mono">
            {logs.map((log, index) => (
              <div key={index} className="animate-pulse">{log}</div>
            ))}
            <span className="cursor">|</span>
          </div>
        </CardContent>
        <p class="py-1 "></p>
      </Card>
      <p class="py-4 bg-primary"></p>
    </div>
  );
};

export default Dashboard;
