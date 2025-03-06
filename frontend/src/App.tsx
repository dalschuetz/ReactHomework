import { useState, useEffect } from "react";
import './App.css'

function Header(){
  return(
    <>
      <h1>NCAA Basketball Teams List</h1>
    </>
  );
}

function Team({school, name, city, state} : {school: string; name: string; city: string, state: string}) {
  return(
    <>
      <h2>School: {school}</h2>
      <h3>Mascot: {name}</h3>
      <h3>Location: {city}, {state}</h3>
    </>
  );
}

function ListTeams() {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    fetch("./CollegeBasketballTeams.json")
      .then((response) => response.json())
      .then((data) => {
        setTeams(Array.isArray(data) ? data : data.teams || []);
      })
  }, []);

  if (teams.length === 0) {
    return <p>Loading teams...</p>;
  }

  return (
    <>
      {teams.map((team, index) => {
        const { school, name, city, state } = team;
        return <Team key={index} school={school} name={name} city={city} state={state} />;
      })}
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <ListTeams />
    </>
  )
}

export default App