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
  - [x] a timestamps
-  A `user` has:
  - [ ] a unique id.
  - [ ] a unique username.
  - [ ] a password.
  - [ ] a last_name.
  - [ ] a first_name.
  - [ ] a email.
  - [ ] a user_type.
  - [ ] a donated integer amount user has donated.

### Enpoints

- [ ] School API has the following endpoints:

    - [ ] GET to '/schools' for retrieving an array of schools
    - [ ] restricted POST to '/schools' for adding schools.
    - [ ] restricted PUT to '/schools/:id' by school `id` for updating schools.
    - [ ] restricted DELETE to '/schools/:id' by school `id` for deleteing schools.
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
            created_at: "",
            updated_at: ""
        }
        ```


- [ ] Users API has the following endpoints:

    - '/api'
    - [ ] GET to '/users' for retrieving an array of schools
    - [ ] POST to '/register' for adding users.
    - [ ] POST to '/login' by school `id` for updating schools.
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