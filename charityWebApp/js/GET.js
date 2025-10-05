function createEventElement(event) {
    console.log(event);

    //URL must follow API
    const link = document.createElement('a');
    link.href = `/${event.EventID}`;
    link.className = 'btn';
    link.innerHTML = `Event Details`;

    //Better present the date information
    const date = new Date(event.EventDate);
    const formatted = date.toLocaleString();


    //build div for each event
    const classEvent = document.createElement('div');
    classEvent.className = 'event';
    classEvent.innerHTML = `    
    <img src="${event.ImageURL}" alt="${event.EventName}" width="200"><br>
    <h3>${event.EventName}</h3>
    <time datetime="${event.EventDate}">${formatted}</time>
    <p>${event.LocationName}</p>
    <p>A <strong><em>${event.CategoryName}</em></strong> Presented by <strong><em>${event.OrgName}</em></strong></p>
    `
    classEvent.appendChild(link);
    return classEvent;
}

function getEvents() {
    fetch('http://localhost:3060/api/events')
        .then(res => res.json())
        .then(events => {
            //get all div blocks and init them
            const upcoming = document.getElementById('upcoming');
            const past = document.getElementById('past');
            const eventsDiv = document.getElementById('events');
            upcoming.innerHTML = '';
            past.innerHTML = '';
            eventsDiv.innerHTML = '';

            //get system date
            const systemDate = new Date();
            console.log(systemDate);

            //build two array to store the event
            const upcomingEvent = [];
            const pastEvent = [];

            //sort events by comparing with local date time
            if(events.length > 0) {
                events.forEach(event => {
                    const eventDate = new Date(event.EventDate);
                    if (eventDate >= systemDate) {
                        upcomingEvent.push(event);
                    } else {
                        pastEvent.push(event);
                    }
                });
            }else {
                eventsDiv.innerHTML = 'No events found';
            }

            // Sort: upcoming ascending, past descending
            upcomingEvent.sort((a, b) => new Date(a.EventDate) - new Date(b.EventDate));
            pastEvent.sort((a, b) => new Date(b.EventDate) - new Date(a.EventDate));



            if (upcomingEvent.length > 0) {
                const upcomingTitle = document.createElement('h2');
                upcomingTitle.innerHTML = `Upcoming Events`;
                upcoming.appendChild(upcomingTitle);
                upcomingEvent.forEach(event => {
                    upcoming.appendChild(createEventElement(event));
                })
            }else {
                upcoming.innerHTML = 'No upcoming events';
            }



            if (pastEvent.length > 0) {
                const pastTitle = document.createElement('h2');
                pastTitle.innerHTML = `Past Events`;
                past.appendChild(pastTitle);
                pastEvent.forEach(event => {
                    past.appendChild(createEventElement(event));
                })
            }else {
                past.innerHTML = 'No past events';
            }

        })
        .catch(err => {
            console.log(err);
            document.getElementById('events').innerHTML = 'Failed to fetch events';
        });
}

function getEventInfo() {

    const pathParts = window.location.pathname.split('/');
    const eventId = pathParts[pathParts.length - 1];
    console.log(eventId);
    if (!eventId) {
        console.error('No event ID in URL');
        return;
    }

    fetch(`http://localhost:3060/api/events/${eventId}`)
        .then(res => res.json())
        .then(event => {
            console.log(event);
        })
    .catch(err => {
        console.log(err);
    })
}