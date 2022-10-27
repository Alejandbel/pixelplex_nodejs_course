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
