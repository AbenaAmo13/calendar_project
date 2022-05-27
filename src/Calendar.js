import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { INITIAL_EVENTS, createEventId } from './event-utils'
import {Button} from "@mui/material";

export default class Calendar extends React.Component {
    state = {
        weekendsVisible: true,
        googleSynced:  false,
        currentEvents: []
    }
    render() {
        return (
            <div className='demo-app'>
                {this.renderSidebar()}
                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        //This allows the calendar to move forward and change
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        googleSynced={this.state.googleSynced}
                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}

                        /*
                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                         */
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                    />

                </div>

            </div>
        );
    }

    renderSidebar(){
        return(
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>

                </div>
                <div className='demo-app-sidebar-section'>
                    <FormControlLabel control={<Switch checked={this.state.weekendsVisible}
                                                       onChange={this.displayWeekends} />} label="Toggle Weekends" />
                </div>

                <div className='demo-app-sidebar-section'>
                    <Button> Sync Calendar to Google Calendar</Button>
                </div>

            </div>

        );
    }
    //This code allows for the weekends to be removed from the calendar per the user's wish
    displayWeekends = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }
s
    handleDateSelect = (selectInfo) => {

        let title = prompt('Please enter a new title for your event');
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }
}
