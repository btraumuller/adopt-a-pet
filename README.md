# Adopt-a-pet programming exercise

Please write a simple app to display a responsive list of adoptable dogs. Style it any way you like. 
The app should use the api as is without changing it, but feel free to change anything in
the public folder. Any framework (including vanilla js) is fine. We use Vue on our team, so if you are 
familiar with it, that would be a great choice. 

_You will have access to this project for 3 days._ Please start by making a branch for your work. 
**Once you have finished, please create a merge request and share the link with us via email.**

## Development
To get you started we have provided a development server. It can be run using `npm i` followed by `npm run dev`. 
It will start a sever at http://localhost:3002 with the following routes:

- `/` - the public folder served statically
- `/api/dogs` - the api for fetching dogs 
- `/images` - the server/images folder served statically

It uses some "magic" to extend the vite server and provide both a static service of compiled code plus the api routes
in one place. **All the code you will want to change resides in the `src` folder.**

## Api
The api has one route: `/api/dogs`. It takes 3 query parameters: `page`, `pageSize`, and `filter`.

- `page` is the zero-based page number to return. It is a required parameter and must be a positive integer.
- `pageSize` is the number of items to return per page. It is a required parameter and must be a positive integer between 1 and 20.
- `filter` is an optional parameter that will filter the results by breed, sub-breed, or name.

### Data
The response comes back as a json object with the following properties:

- `total` - the total number of items matching the filter (if any)
- `page` - the page number that was requested
- `pageSize` - the number of items per page that was requested
- `items` - an array of dogs matching the filter and page
- `filter` - the filter that was requested (if any)

Each dog is represented by an object with the following properties:

- `name` - the name of the dog
- `breed` - the breed of the dog
- `sub-breed` - the sub-breed of the dog
- `age` - the age of the dog
- `status` - the status of the dog
- `health-concerns` - any health concerns the dog has
- `image` - path to the image of the dog

## Expectations
- Using AI is allowed, but be prepared to discuss the code
- We will run your code using `npm i` and `npm dev`. Make sure it works, **no effort
 will be made to debug it** (beyond verifying the correct OS is being used) should it fail to start.
- `npm run test` should (still) pass.
- Please do not change the API unless you have run into a bug.
- The api is intentionally slow. Please do not optimize it; instead make sure that your solution looks good in those transitional times (eg loading state).
- Similarly think about how your app handles empty results and errors. The API will throw an error for you if you set `filter` to "error".
- Your app should be responsive to screen size changes.
- Your code should be well-structured and easy to read.
- We will be looking at your git commit messages, so keep them helpful.
- We will not be judging your design skills so style it however you like.
- There is at least one broken image and one malformed dog record.
