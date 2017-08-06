FreeCodeCamp API Basejump: URL Shortener Microservice
=====================================================

User stories:
-------------
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. When I visit that shortened URL, it will redirect me to my original link.

Example creation usage:
-----------------------
https://tiny-url-microservice-fcc.glitch.me/new/https://www.google.com
https://tiny-url-microservice-fcc.glitch.me/new/http://foo.com:80

Example creation output
-----------------------
{ "slug":"0000000", "destination":"https://www.google.com" }

Usage:
https://tiny-url-microservice-fcc.glitch.me/0000000

Will redirect to:
https://www.google.com/