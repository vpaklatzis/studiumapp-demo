import {useState} from 'react';
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/eventDashboard/EventDashboards";
import NavBar from "../../features/nav/NavBar";

function App() {

  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <NavBar setFormOpen={setFormOpen} />
      <Container className='main'>
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
      </Container>
    </>
  );
}

export default App;
