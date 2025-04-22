# MileHighRentals

## Database Schema Design

![db-schema]

[db-schema]: ./images/airbnb_dbdiagram.png

## API Documentation

LOG IN FIRST

        fetch('/api/session', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
          },
          body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
        }).then(res => res.json()).then(data => console.log(data));
