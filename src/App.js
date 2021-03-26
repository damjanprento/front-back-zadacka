import './App.css';
import React from 'react';
import { Route } from "react-router-dom";

import Home from './components/Home';
import Tickets from './components/Tickets';
import TicketTypes from './components/TicketTypes';
import Priorities from './components/Prioirities';
import Ticket from './components/Ticket';
import TicketType from './components/TicketType';
import Priority from './components/Priority';
import EditTicket from './components/EditTicket';
import EditTicketType from './components/EditTicketType';
import EditPriority from './components/EditPriority';
import CreateTicket from './components/CreateTicket';
import CreateTicketType from './components/CreateTicketType';
import CreatePriority from './components/CreatePriority';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <div className="main">
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/tickets" exact component={Tickets} />
      <Route path="/ticket_types" exact component={TicketTypes} />
      <Route path="/priorities" exact component={Priorities} />
      <Route path="/tickets/details/:id" exact component={Ticket} />
      <Route path="/ticket_types/details/:id" exact component={TicketType} />
      <Route path="/priorities/details/:id" exact component={Priority} />
      <Route path="/tickets/edit_ticket/:id" exact component={EditTicket} />
      <Route path="/ticket_types/edit_ticket_type/:id" exact component={EditTicketType} />
      <Route path="/priorities/edit_priority/:id" exact component={EditPriority} />
      <Route path="/tickets/create_ticket" exact component={CreateTicket} />
      <Route path="/ticket_types/create_ticket_type" exact component={CreateTicketType} />
      <Route path="/priorities/create_priority" exact component={CreatePriority} />
    </div>
  );
}

export default App;
