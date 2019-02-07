# Luncher App BackEnd
## object descriptions

- A `school` has:
    - [x] a unique Id.
    - [x] a unique name.
    - [x] a description.
    - [x] a address.
    - [x] a requested_funds
    - [x] a admin_id that refrences an id on users table.
    - [x] a donated integer, amount donated to school.
    - [x] a flag that indicates if the funds are complete or not.
    - [x] a city.
    - [x] a state.
    - [x] a lat, lattitude on map
    - [x] a lon, longitude on map
    - [x] a timestamps

-  A `user` has:
    - [x] a unique id.
    - [x] a unique username.
    - [x] a password.
    - [x] a last_name.
    - [x] a first_name.
    - [x] a email.
    - [x] a user_type.
    - [x] a donated integer amount user has donated.

### Enpoints

- [ ] School API has the following endpoints:

    - [ ] GET to '/schools' for retrieving an array of schools
    - [ ] restricted POST to '/schools' for adding schools.
    - [ ] restricted PUT to '/schools/:id' by school `id` for updating schools.
    - [ ] restricted DELETE to '/schools/:id' by school `id` for deleteing schools.

        ```js
        {
            deleted: true
        }
        ```

    - [ ] GET toto '/schools/:id' for retrieving a `school` by its `id` that returns an object with the following structure:

        ```js
        {
            id: 1,
            name: 'school name here',
            description: 'the school description',
            achieved: false, // or true, the database will return 1 for true and 0 for false
            address: "229 Lawn Way",
            requested_funds: 4000,
            admin_id: 1,
            donated: 0,
            achieved: false,
            city: "town",
            state: "US",
            lat: 0.0,
            lon: 0.0,
            created_at: "",
            updated_at: ""
        }
        ```


- [ ] Users API has the following endpoints:

    - [ ] GET to '/api/users' for retrieving an array of schools
    - [ ] POST to '/api/register' for adding users that returns an object with the following structure:

        ```js
        {
            username: "",
            token: "",
            id: 0
        }
        ```

    - [ ] POST to '/api/login' by school `id` for updating schools that returns an object with the following structure:

        ```js
        {
            username: "",
            token: "",
            id: 0
        }
        ```

    - [ ] GET for retrieving a `user` by its `id` that returns an object with the following structure:

        ```js
        {
            id: 1,
            username: "Reginald",
            first_name: "leland",
            last_name: "rogers",
            email: "lelgandrogers@gmail.com",
            user_type: "patron",
            donated: 200
        }
        ```
