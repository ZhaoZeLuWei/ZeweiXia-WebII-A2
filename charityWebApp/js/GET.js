function getEvents() {
    fetch('http://localhost:3060/api/events')
        .then(res => res.json())
        .then(events => {
            const eventDiv = document.getElementById('events');
            eventDiv.innerHTML = '';
            if(events.length > 0){
                events.forEach(event => {
                    console.log(event);
                    const link = document.createElement('a');
                    link.href = `/${event.EventID}`;
                    const date = new Date(event.EventDate);
                    const formatted = date.toLocaleString();
                    link.innerHTML = `
                    <img src="${event.ImageURL}" alt="${event.EventName}" width="200"><br>
                    <h3>${event.EventName}</h3>
                    <time datetime="${event.EventDate}">${formatted}</time>
                    <p>${event.LocationName}</p>
                    <p>A <strong><em>${event.CategoryName}</em></strong> Presented by <strong><em>${event.OrgName}</em></strong></p>
                    `;
                    eventDiv.appendChild(link);
                })
            }else {
                eventDiv.innerHTML = 'No events found';
            }
        })
        .catch(err => {
            console.log(err);
            document.getElementById('events').innerHTML = 'Failed to fetch events';
        });
}