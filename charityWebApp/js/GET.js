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
            //API returns an array
            domEventDetails(event[0]);
            domOrgDetails(event[0]);
            domTickets(event[0]);
        })
    .catch(err => {
        console.log(err);
    })
}

function domEventDetails(event) {
    //image
    const imgDiv = document.getElementById('image');
    const imageElement = document.createElement('img');
    console.log(event);
    imageElement.src = `${event.ImageURL}`;
    imgDiv.appendChild(imageElement);

    //eventName
    const nameDiv = document.getElementById('eventName');
    nameDiv.innerHTML = event.EventName;

    //eventGoal
    const goalDiv = document.getElementById('goal');
    goalDiv.innerHTML = event.Goal + " $";

    //date and time
    const timeDiv = document.getElementById('time');
    timeDiv.innerHTML = Date(event.EventDate);

    //location
    const locationDiv = document.getElementById('locationName');
    locationDiv.innerHTML = event.LocationName;

    //street
    const streetDiv = document.getElementById('street');
    streetDiv.innerHTML = event.StreetAddress;

    //venue
    const venue = event.VenueDetails;
    const venueDiv = document.getElementById('venue');
    if (venue === null) {
        venueDiv.innerHTML = '';
    }else {
        venueDiv.innerHTML = venue;
    }

    //about this event (details)
    const detailDiv = document.getElementById('about');
    detailDiv.innerHTML = event.Description;
}

function domOrgDetails(event) {
    //Present By (organisation name)
    const orgNameDiv = document.getElementById('orgName');
    orgNameDiv.innerHTML = event.OrgName;

    //email
    const emailDiv = document.getElementById('email');
    emailDiv.innerHTML = event.Email;

    //phone
    const phoneDiv = document.getElementById('phone');
    phoneDiv.innerHTML = event.PhoneNumber;

    //org Location
    let locationInfo = '';
    if (event.OrgVenueDetails === null) {
        locationInfo = event.OrgStreetAddress;
    }else {
        locationInfo = event.OrgStreetAddress + ' ' + event.OrgVenueDetails;
    }
    const orgLocationDiv = document.getElementById('orgLocation');
    orgLocationDiv.innerHTML = locationInfo;
}


function domTickets(event) {
    const tickets = event.Tickets;
    console.log(tickets);
    if (tickets === null || tickets === undefined) {
        console.error('No tickets found');
    }

    //split string
    const ticketsArray = tickets.split('|').map(t => {
        const [TicketName, Price, Quantity] = t.split(':');
        return {
            TicketName,
            Price,
            Quantity
        };
    });
    console.log(ticketsArray);

    const ticketElement = document.getElementById('tickets');
    ticketsArray.forEach(ticket => {
        const ticketDiv = document.createElement('div');
        ticketDiv.innerHTML = `
        <h4>${ticket.TicketName}</h4>
        <p>Price: ${ticket.Price}</p>
        <p>Quantity: ${ticket.Quantity}</p>
        <button class="register-btn" onclick="warning()">Register</button>
        `;
        ticketDiv.className = "ticket";
        ticketElement.appendChild(ticketDiv);
    })
}

//for register btn
function warning() {
    alert( "This feature is currently under construction.");
}

