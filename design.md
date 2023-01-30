The SDK is designed to be one class, TheOne, which the user can easily bring into their package via npm install. The user will then create an instance of the class with their custom settings - token, and page size config (how many results per page). This enables the user to create multiple instances with different tokens and page size configs.

The SDK fetches the movies from the API and returns the data in the promise which allows the user to simply call the SDK's method and retrieve the movies directly, and also handle errors however they want.

The SDK also has retry logic for failed requests, using the axios-retry library - 3 retries and exponential backoff.

The SDK provides a few functions for the user to make it easy for them to paginate and also search by name. The SDK user can get movie details along with its quotes together through one SDK method call.

With more time I would've added the ability to order the list of movies by name, runtime, budget, revenue, nominations, awards, or rotten_tomatoes. Also, the ability to search using more advanced filtering such as by budget size or revenue for example.
