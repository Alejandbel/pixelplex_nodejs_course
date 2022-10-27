# Flashcards
__Created by Aliaksandr Bahdanau__

# Api
## Authorization
- `POST api/v1/auth/signup` - endpoint for creating account:

  ```TypeScript
  {
    username: string;
    email: string;
    password: string;
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    token: string;
  }
  ```
- `POST api/v1/auth/login` - endpoint for logging in:

  ```TypeScript
  {
    email: string;
    password: string;
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    token: string;
  }
  ```


## Languages
- `POST api/v1/langs` - endpoint for creating language:

  ```TypeScript
  {
    title: string;
    code: string;
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    title: string;
    code: string;
  }
  ```
- `PATCH api/v1/langs/:id` - endpoint for editing language:

  ```TypeScript
  {
    title?: string;
    code?: string;
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    title: string;
    code: string;
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
    - filter=[string] 

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


