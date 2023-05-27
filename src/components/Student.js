import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "40px auto" };
  const textStyle = { margin: "20px auto" };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const handleSave = (e) => {
    e.preventDefault();
    const student = { name, address };
    fetch("http://localhost:8080/person/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New student is successfully added");
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/person/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Add a new student</h1>
        <form>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            style={textStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth
            style={textStyle}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </form>
        <h1>List of all students</h1>

        {students.map((student) => (
          <Paper
            elevation={4}
            style={{
              margin: "10px auto",
              padding: "15px",
              textAlign: "left",
            }}
            key={student.id}
          >
            ID:{student.id}
            <br />
            Name:{student.name}
            <br />
            Address:{student.address}
            <br />
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
