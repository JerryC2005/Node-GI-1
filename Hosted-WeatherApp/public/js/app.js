

// get url with address query
//
const weatherForm = document.querySelector('form');
const searchEl = document.querySelector('input');
const msg1 = document.getElementById('msg-1');
const msg2 = document.getElementById('msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchEl.value
    const unit = document.querySelector('input[name="unit"]:checked').value
    let locationUrl = `/weather?address=${location}&unit=${unit}`

    console.log(locationUrl)

    msg1.textContent = 'Loading...';
    msg2.textContent = '';

    fetch(locationUrl).then((response) => {
        response.json().then((data) => {
            console.log(data)
    
            if(data.error) {
                msg2.textContent = data.error;
            } else {
                console.log(data.location)
                console.log(data.forecast)

                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        })
    })
})