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
