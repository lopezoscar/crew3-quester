# Quester - Backend Take Home Assignment

Crew3 functions as a central hub for web3 communities, where contributors gather to learn, engage, and discover new communities. The bedrock of the engagement mechanism lies in its quests, which are are designed to be modulable, fun and intuitive.

For this assignement, you will create a simple version of our claim quest endpoint, written in NodeJs (using the framework of your choice) and Typescript. Given a JSON payload that represents a quest submission, the endpoint should return a JSON response that includes the submission's success status and a score that reflects the submission's quality. 

## Requirements

* Node.js 14 or above

## Getting started

> npm install

> npm start

## API Request examples

> /quest/claim

```bash
curl --location --request POST 'http://localhost:3000/quest/claim' \
--header 'Content-Type: application/json' \
--data-raw '{
  "questId": "4569bee2-8f42-4054-b432-68f6ddbc20b5", 
  "userId": "cb413e98-44a4-4bb1-aaa1-0b91ab1707e7", 
  "claimed_at": "2023-03-15T10:44:22+0000", 
  "access_condition": [ 
   {
      "type": "nft",
      "operator": "contains",
      "value": "0x1"
   },
   {
     "type": "date",
     "value": "2023-02-15T10:44:22+0000",
     "operator": "<"
   },
   {
     "type": "level",
     "value": "2",
     "operator": ">"
   }
  ],
  "user_data": {
    "completed_quests": [
      "94e2e33e-07e9-4750-8cea-c033d7706057"
    ],
    "nfts": ["0x1", "0x2"],
    "level": 3
  },
  "submission_text": "aaa abaaba!.. joyful"
}'

```

## API Endpoints

> /quest/claim

## Architecture

> app.ts (entrypoint for the server)

> routers (express routing, request validation and http status management)

> services (business logic)

> models (entities and data access)

> util (utility functions. e.x validations)

> error (error for business logic and routers - services don't know about HTTP)

## Testing

This project is tested with jest

You can run `npm test` to run the whole suite of tests and the coverage report

If you want to code and test, run `npm run test:watch`

## Features

## Future improvements

* Add a API Catalog like Swagger
* Add a logger
* Add monitoring
* Add authentication and authorization
* Improve scalability of types.d.ts and app.ts

## Assessment

## The input
```jsonc
{
  "questId": "4569bee2-8f42-4054-b432-68f6ddbc20b5", // uuid
  "userId": "cb413e98-44a4-4bb1-aaa1-0b91ab1707e7", // uuid
  "claimed_at": "2023-03-15T10:44:22+0000", // date in ISO 8601 format
  "access_condition": [ // array of condition object, variable in size
   {
      "type": "nft", //check if a user NFTs contain/notContain a specific ID
      "operator": "contains", //can be "contains" or "notContains"
      "value": "0x1" // Id of the NFT
   },
   {
     "type": "date", // check if the claimed_at date is > or < to the specified value
     "value": "2023-02-15T10:44:22+0000",
     "operator": ">" //can be ">" or "<"
   },
   {
     "type": "level", // check if the user level is > or < to the specified value
     "value": "4", // positive integer
     "operator": ">" // operator can be ">" or "<"
   }
  ],
  "user_data": {
    "completed_quests": [
      "94e2e33e-07e9-4750-8cea-c033d7706057"
    ], // array of uuid
    "nfts": ["Ox1", "0x2"], // array of NFTs ID (hexadecimal)
    "level": 3 // positive integer
  },
  "submission_text": "Lorem ipsum dolor sit amet.", // string
}
```
## Expected output
```jsonc
{
  "status": "success" // can be fail or success,
  "score": 3, // integer between 0 and 10
}
```
For a quest to be considered successful, the following criteria must be met:
- It satisfies all access conditions (NFT, date and level). Keep in mind that not all access conditions might be there.
- The quest has not been previously completed by the user. For the simplicity of the exercice, you can store completed quests either in a global variable or in a file.
- The score is greater or equal than 5.

## Score algorithm
The score should be computed using the submission_text string:
- Initialize a score variable to 0.
- If the string contains one punctuation character (",", ".", "?", "!"), add 1 points.
- If the string contains a palindrome, add 2 points.
- For each joyfull words, add 1 point. The point allocation should be limited to a maximum of 3 words. Happyword list is: Joyful, Happy, Vibrant, Thrilled, Euphoric, Cheerful, Delighted.
- If the string contains any repetitive sequences (such as "aaa" or "abaaba"), add 3 points.

**Bonus:** Check if the input string contains any offensive language or hate speech. If it does, return a score of 0.

## Submission
The code should be organized, designed, tested, and documented as if it were going into production.
When complete, please provide a link to your projects GitHub repo (or public source control service of choice).
You can do this by replying to the email from the recruiting team.

If you have any questions, please reach out to louis@crew3.xyz.

If you spend more than 2 hours on this, feel free to submit partial work. We want to be respectful of people's time commitments, and we can learn a lot about your work even if it's incomplete.

