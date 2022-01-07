This little project was made to learn API call using fetch. That's why it’s hideous.
The autocomplete is pure js, comparing the input string with a database of french cities and displaying matches to the user.
The user’s request is forwarded to a node server deployed on Heroku where the API call is made to the weather API.
The actual API fetch is separated from the website's code to hide my private API key (and to learn a tiny bit of node, CORS and Heroku's services).
The results are sent back to the website and rendered to the user.
