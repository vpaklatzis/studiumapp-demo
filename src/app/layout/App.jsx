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
import AccountPage from '../../features/auth/AccountPage.jsx';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent.jsx';
import ProfilePage from '../../features/profiles/profilePage/ProfilePage.jsx';
import PrivateRoute from './PrivateRoute.jsx';

function App() {

  const {key} = useLocation();
  const {initialized} = useSelector((state) => state.async);

  if (!initialized) return <LoadingComponent content='' />

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
              <PrivateRoute
                path={['/createEvent', '/manage/:id']} 
                component={EventForm} 
                key={key} 
              />
              <PrivateRoute path='/account' component={AccountPage} />
              <PrivateRoute path='/profile/:id' component={ProfilePage} />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )} 
      />  
    </>
  );
}

export default App;
