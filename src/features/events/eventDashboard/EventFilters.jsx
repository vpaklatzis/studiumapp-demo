import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import {Calendar} from 'react-calendar';

export default function EventFilters({setPredicate, predicate, loading }) {
    return (
        <>
            <Menu vertical size='large' style={{width: '100%'}}>
                <Header icon='filter' attached style={{color: '#FA696D'}} content='Filters' />
                <Menu.Item 
                    content='All Posts'
                    active={predicate.get('filter') === 'all'} 
                    onClick={() => setPredicate('filter', 'all')}
                    disabled={loading}
                />
                <Menu.Item 
                    content='Attending' 
                    active={predicate.get('filter') === 'isGoing'} 
                    onClick={() => setPredicate('filter', 'isGoing')}
                    disabled={loading}
                />
                <Menu.Item 
                    content='Hosting' 
                    active={predicate.get('filter') === 'isHost'} 
                    onClick={() => setPredicate('filter', 'isHost')}
                    disabled={loading}
                />
            </Menu>
            <Header icon='calendar' attached style={{color: '#FA696D'}} content='Select Date' />
            <Calendar 
                onChange={date => setPredicate('startDate', date)}
                value={predicate.get('startDate') || new Date()}
                tileDisabled={() => loading}
            />
        </>
    )
}