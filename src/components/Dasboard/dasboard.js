import React, { useState, useEffect } from "react";
import { Card, CardContent} from "../ui/Card";
import { Progress } from "../ui/Progress";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from "recharts";
import { Button } from "../ui/Button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/Select";
import { Input } from "../ui/Input";
import 'bootstrap/dist/css/bootstrap.min.css';
const COLORS = ["#4CAF50", "#FF9800", "#F44336"];


const sourceOptions = [
  { id: "select", name: "select", attributes: [] },
  { id: "ldap", name: "LDAP", attributes: ["Server Detail", "Protocol", "Port Number", "User ID", "Password", "BaseDN"] },
  { id: "ad", name: "Active Directory", attributes: ["Server Detail", "Protocol", "Port Number", "User ID", "Password", "BaseDN"] },
  { id: "db", name: "Database", attributes: ["Host", "Port", "User ID", "Password", "Database Name", "Table Name"] },
];

const destinationOptions = [
  { id: "select", name: "select", attributes: [] },
  { id: "okta", name: "Okta", attributes: ["Okta Base URL", "API Security Token"] },
  { id: "auth0", name: "Auth0", attributes: ["Auth0 Base URL", "API Token"] },
  { id: "ping", name: "Ping", attributes: ["Ping Base URL","Access Token" ]},
  { id: "forgeRock", name: "ForgeRock", attributes: ["ForgeRock Instance URL", "Realm", "Access Token"] },
];


const Dashboard = () => {
  const [migrationData, setMigrationData] = useState({
    totalUsers: 1000,
    migratedUsers: 780,
    failedUsers: 50,
    pendingUsers: 170,
    errorLogs: []
  });

  const [selectedSourceIdp, setSelectedSourceIdp] = useState(sourceOptions[0]);
  const [selectedDestinationIdp, setSelectedDestinationIdp] = useState(destinationOptions[0]);
  const [logs, setLogs] = useState([]);
  const [sourceInputValues, setSourceInputValues] = useState({});
  const [destinationInputValues, setDestinationInputValues] = useState({});
  const [visibleButton, setVisibleButton] = useState(1); 

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prevLogs) => [...prevLogs, `Checking migration status...`]);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleSourceIdpChange = (value) => {
    const selected = sourceOptions.find((option) => option.id === value);
    setSelectedSourceIdp(selected);
    console.log("Selected Source ID:", selected.id);
    setSourceInputValues({});
  };
  

  const handleDestinationIdpChange = (value) => {
    const selectedDestination = destinationOptions.find((option) => option.id === value);
    setSelectedDestinationIdp(selectedDestination);
    console.log("Selected Destination ID:", selectedDestination.id);
    setDestinationInputValues({});
  };

  const handleSourceInputChange = (attribute, value) => {
    setSourceInputValues({ ...sourceInputValues, [attribute]: value });
  };

  const handleDestinationInputChange = (attribute, value) => {
    setDestinationInputValues({ ...destinationInputValues, [attribute]: value });
  };

  const handleNext = () => {
    if(selectedSourceIdp?.id !== "select"){
      const sourceAttrs = selectedSourceIdp?.attributes || [];
      const destAttrs = selectedDestinationIdp?.attributes || [];
  
      console.log(selectedSourceIdp);
      console.log(selectedDestinationIdp);
  
      const missingSourceFields = sourceAttrs.filter(
        attr => !sourceInputValues[attr]?.trim()
      );
    
      const missingDestinationFields = destAttrs.filter(
        attr => !destinationInputValues[attr]?.trim()
      );
  
      const allMissingFields = [...missingSourceFields, ...missingDestinationFields];
  
      if (allMissingFields.length > 0) {
        alert(`Please fill all required fields: ${allMissingFields.join(", ")}`);
        return;
      } 
      setVisibleButton(2);
      console.log(sourceInputValues);
      console.log(destinationInputValues);
      setLogs((prevLogs) => [...prevLogs, "Importing data from source to destination..."]);
    }
    else{
      alert(`Please select a valid source and destination option`);
    }

    // resetting the source and destination options
    setSelectedSourceIdp(sourceOptions[0]);
    setSelectedDestinationIdp(destinationOptions[0]);
  };

  const handleReplicate = () => {
    setVisibleButton(3);
    setLogs((prevLogs) => [...prevLogs, "Replicating data from source to destination..."]);
  };

  const handleMigrate = () => {
    setVisibleButton(1);
    setLogs((prevLogs) => [...prevLogs, "Migrating the Import dataprocess..."]);
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
      
      <p className="py-3 bg-primary">
      </p>
      <Card className="container-xl">
        
        <CardContent>
        {visibleButton === 1 && (
          <h2 className="text-xl font-semibold mb-4">Select Source and Destination IDPs</h2>
        )}
          {visibleButton === 1 && (<div className="row g-3">
            <div className="col-md-6">
              <h3 className="text-lg font-semibold">Select Source</h3>
              <p></p>
              <Select onValueChange={handleSourceIdpChange} className="form-select">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Source IDP" />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((idp) => (
                    <SelectItem key={idp.id} value={idp.id}>{idp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="py-2"></p>
              {selectedSourceIdp && (
                <div className="mt-6">
                  {selectedSourceIdp?.id !== "select" && (<h4 className="text-lg font-semibold">Enter Source Details</h4>)}
                  {/* <h4 className="text-lg font-semibold">Enter Source Details</h4> */}
                  <p></p>
                  {selectedSourceIdp.attributes.map((attr) => (
                    <p>
                    <Input id="customInput" key={attr} placeholder={attr} className="mt-4" onChange={(e) => handleSourceInputChange(attr, e.target.value)} />
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <h3 className="text-lg font-semibold">Destination</h3>
              <p></p>
              <Select onValueChange={handleDestinationIdpChange} className="form-select">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Destination IDP" />
                </SelectTrigger>
                <SelectContent>
                  {destinationOptions.map((idp) => (
                    <SelectItem key={idp.id} value={idp.id}>{idp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="py-2"></p>
              {selectedDestinationIdp && (
                <div className="">
                  {selectedDestinationIdp?.id !== "select" && (<h4 className="text-lg font-semibold">Enter Destination Details</h4>)}
                  {/* <h4 className="text-lg font-semibold">Enter Destination Details</h4> */}
                  <p></p>
                  {selectedDestinationIdp.attributes.map((attr) => (
                    <p>
                    <Input key={attr} placeholder={attr} className="mt-4" onChange={(e) => handleDestinationInputChange(attr, e.target.value)} />
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>)}
          <p className="py-1"></p>
          {visibleButton === 1 && (<Button onClick={handleNext} className="my-2 btn btn-primary">Next</Button>)}
          {visibleButton === 2 && (<Button onClick={handleReplicate} className="my-2 btn btn-primary">Replicate Data</Button>)}
          {visibleButton === 3 && (<Button onClick={handleMigrate} className="my-2 btn btn-primary">MigrateUser</Button>)}
          <p className="py-1"></p>
        </CardContent>
      </Card>

      <p className="py-3 bg-primary">
      </p>
      <div className="container-xl">
      <div className="row">
      <Card className="col-md-6">
        <CardContent>
          <h2 className="text-xl font-semibold">Migration Progress</h2>
          <Progress value={(migrationData.migratedUsers / migrationData.totalUsers) * 100} className="mt-4" />
          <div className="spinner-border m-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p></p>
          <div className="clearfix">
            <div className="float-end">
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

      <p className="py-3 bg-primary">
      </p>
      {/* Error logs */}

      <Card className="container">
        <CardContent>
          <h2 className="text-xl font-semibold">Error Logs</h2>
          <p className="py-1"></p>
          <div className="mt-2 bg-black text-success p-4 h-40 overflow-y-auto font-mono">
            {logs.map((log, index) => (
              <div key={index} className="animate-pulse">{log}</div>
            ))}
            <span className="cursor">|</span>
          </div>
        </CardContent>
        <p className="py-1 "></p>
      </Card>
      <p className="py-4 bg-primary"></p>
    </div>
  );
};

export default Dashboard;
