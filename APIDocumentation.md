## Questions to ask

* Should this entity get its own table in the database schema? Or can it be represented by attribute(s) on an existing table?
* What should the table be called?
* What kinds of attributes should be on the table?
* How does this entity's table relate to other existing tables in the schema? (A one-to-many or many-to-many relationship?)


## Delete a Spot

Deletes an existing spot.

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: ?
  * URL: ?
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Spot couldn't be found",
      "statusCode": 404
    }
    ```
## Securing your Application Against CSRF Attacks
You will only focus on securing your application against the first example of a CSRF attack, not the second.

# Steps to prevent CSRF attacks:

* Create two CSRF tokens - one encrypted and one decrypted.
* Add the decrypted CSRF token to a cookie.
* Add the encrypted CSRF token in a cookie that is HTTP-only (cannot be used by JavaScript) and Same-Site only (cannot be used by another web application)
* Frontend can read the decrypted CSRF token cookie and add it into the headers of any request made to the backend
* Backend reads the headers of the request and matches the decrypted CSRF token in the headers to the encrypted CSRF token in the cookies

