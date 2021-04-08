import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';

export default function EventFilters() {
    return (
        <>
            <Menu vertical size='large' style={{width: '100%'}}>
                <Header icon='filter' attached style={{color: '#FA696D'}} content='Filters' />
                <Menu.Item content='All Events' />
                <Menu.Item content='Attending' />
                <Menu.Item content='Hosting' />
            </Menu>
            <Header icon='calendar' attached style={{color: '#FA696D'}} content='Select Date' />
            <Calendar />
        </>
    )
}