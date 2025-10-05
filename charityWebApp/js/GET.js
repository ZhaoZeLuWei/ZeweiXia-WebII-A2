function getEvents() {
    fetch('http://localhost:3060/api/events')
        .then(res => res.json())
        .then(events => {
            const eventDiv = document.getElementById('events');
            eventDiv.innerHTML = '';

            if(events.length > 0){
                events.forEach(event => {
                    console.log(event);
                    let formattedDate = event.EventDate.split('T')[0];
                    const eventParagraph = document.createElement('p');
                    eventParagraph.innerHTML = `
                    <img src="${event.ImageURL}" alt="${event.EventName}" width="200"><br>
                    Event: ${event.EventName}<br>
                    Date: ${formattedDate}<br>
                    Category: ${event.CategoryName}
                    `;
                    eventDiv.appendChild(eventParagraph);
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