# Django-React Authentication using Knox and Redux

## Overview

I wanted to create a basic starting point for a project with authentication. This repo has 2 parts, the Django back end and the React Front end. The Django project contains a users app, and uses DRF/ Knox in order to handle user registration and authentication.

This is connected to the React Front end, which communicates with the back end via Axios, and uses Redux for state management.

This was mostly done by following this blog post - http://v1k45.com/blog/modern-django-part-4-adding-authentication-to-react-spa-using-drf/
with a few changes here and there.

There may be some bugs with this project, that may not be discovered until it's expanded on.

## OAUTH Flow

### Frontend

Spent way too much time figuring this out so should document it for future reference.
right now the app is configured for Oauth through Facebook (assuming the user already has an account with the same email address in the DB)
The process starts in the frontend, in CustomFB.js, this component is just a button/ anchor to the FB oauth page, and sends along the app id, a redirect uri (also specified in the dev settings page on FB, and a state param. see FB Oauth docs).
On successful login to Facebook, this page will return to the redirect_uri specified in the initial link, and include a code in the url as a query param.
For now/ at this point, this points back to OauthLoading.js, this component is essentially a loading screen. It takes the code from the query, and sends it to the backend, and waits for the backend to verify the code

### Backend

an endpoint was setup in the backend to acceopt and verify the access code sent from the front end, the process is as follows.

- First, it takes the code, app_id, app_private_key\*\*, and the same redirect_uri specified in the front end/ FB dev settings. and exchanges the code for an access token with the Facebook server.
- Next, with the access token, it asks FB for user info, in this case, the users Name, and ID.
- Once it has the users email, the code checks if the user exists in the database (email === username in this case). if it does, we return the user object and token to the front end, otherwise it returns a 404

(\*\*for now defined in settings.py, but should be an environment variable)

### Notes

This code, while functional (will verify a user, and return an API token), is incomplete, there is nothing to handle errors on the code/token exchange process, or any feedback to errors in the front end.. and there is nothing in place to save the user data sent back to the redux store in the front end.
