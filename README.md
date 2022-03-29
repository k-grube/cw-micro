#cw-micro
This is a sample Express based app that will proxy requests from the ConnectWise Manage and ConnectWise Automate APIs using [connectwise-rest](https://github.com/covenanttechnologysolutions/connectwise-rest) package.

## Local Setup

- Clone repository
- Run `npm install`
- Copy `.env.example` to `.env` and adjust values as needed.
- Run `npm run start` to start the application.

## Development Setup

This repository is configured with developer friendly tools like eslint and hot reload.

Run the application in development mode with `npm run dev`


### Sample Route

```
    GET /api/cw/time/charge-codes
        Returns a JSON array of time entry charge codes
```

### Authorization

This application utilizes basic authorization against the specified ConnectWise Automate server.  See `auth.js` as an example.
