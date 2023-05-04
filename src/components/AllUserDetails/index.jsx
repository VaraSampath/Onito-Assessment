import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "../../app.css";
const AllUsers = () => {
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "rgba(0, 255, 0,1)",
      },
    },
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Age/Sex",
      selector: (row) => row.age + " / " + row.sex,
    },
    {
      name: "Mobile",
      selector: (row) => (row.mobile ? row.mobile : "Null"),
    },
    {
      name: "Address",
      selector: (row) => (row.address ? row.address : "Null"),
    },
    {
      name: "Govt ID",
      selector: (row) => (row.govtIdNumber ? row.govtIdNumber : "Null"),
    },
    {
      name: "Guardian Details",
      selector: (row) => (row.gName ? row.gName : "Null"),
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
  ];

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const details = await fetch("http://localhost:8000/");
    const { users } = await details.json();
    setUsers(users);
    console.log(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <h1 className="tabel-heading">All Users Info</h1>
      <DataTable
        highlightOnHover={true}
        columns={columns}
        data={users}
        customStyles={customStyles}
      />
    </>
  );
};

export default AllUsers;
