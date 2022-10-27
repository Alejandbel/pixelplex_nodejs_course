# Flashcards
__Created by Aliaksandr Bahdanau__

# Api
## Authorization
- `POST api/v1/auth/signup` - endpoint for creating account:

  ```TypeScript
  {
    username: String;
    email: String;
    password: String;
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    token: String;
  }
  ```
- `POST api/v1/auth/login` - endpoint for logging in:

  ```TypeScript
  {
    email: String;
    password: String;
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    token: String;
  }
  ```


## Languages
- `POST api/v1/langs` - endpoint for creating language:

  ```TypeScript
  {
    title: String;
    code: String;
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    id: Number;
    title: String;
    code: String;
  }
  ```
- `PATCH api/v1/langs/:id` - endpoint for editing language:

  ```TypeScript
  {
    title: String; // one ore more fields
    code: String;
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    id: Number;
    title: String;
    code: String;
  }
  ```

- `DELETE api/v1/langs/:id` - endpoint for deleting language.

  Returns:

  ```TypeScript
  {
    status: "OK";
  }
  ```

- `GET api/v1/langs?limit=Number&offset=Number` - endpoint for receiving languages with pagination.
  
  Supports:
    - orderBy{Name, Date}={asc,desc}
    - filter=String 

  Returns:

  ```TypeScript
  {
    items: Array<Language>;
    pagination: {
      offset: Number;
      limit: Number;
      total: Number;
    };
  }
  ```
