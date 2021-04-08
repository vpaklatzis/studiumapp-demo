import { Route, useLocation } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard.jsx";
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from "../../features/nav/NavBar";
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import {ToastContainer} from 'react-toastify';
import ErrorComponent from '../common/errors/ErrorComponent.jsx';

function App() {

  const {key} = useLocation();

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'} 
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/sandbox' component={Sandbox} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )} 
      />  
    </>
  );
}

export default App;
