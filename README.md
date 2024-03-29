# Flashcards
__Created by Aliaksandr Bahdanau__


# Api
## Types
- Language

  ```TypeScript
    {
      id: number;
      title: string;
      code: string;
    }
  ```
- Cards
  
  ```typescript
    {
      id: number;
      nativeLanguageId: number;
      foreignLanguageId: number;
      nativeWord: string;
      foreignWord: string; 
    }
  ```
- Task
  ```typescript
    {
      id: number;
      word: string;
      foreignLanguageId: number;
      target: "to_foreign"|"to_native";
    }
  ```
  
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
    token: string;
  }
  ```
  
  If Email is not unique: 
   
  ```TypeScript
  code: 400
  {
    message: "Email already exists";
  }
  ```

  If Password is not
  consist of at least 8 Latin characters of lower and upper
  case, at least one digit and at least one special character
  (!@#$%^&*()_+=):

  ```TypeScript
  code: 400
  {
    message: "Invalid password format";
  }
  ```

  If length of username less than 5 or higher than 256:
  
  ```TypeScript
  code: 400
  {
    message: "Invalid email length";
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
    token: string;
  }
  ```

  If user with this email does not exist:
  
    ```TypeScript
    code: 404
    {
      message: "User with this email does not exists";
    }
    ```
  If password not match email:

  ```TypeScript
  code: 401
  {
    message: "Wrong password";
  }
  ```

## User

- For all the rest endpoint if user is not authorized:

  ```TypeScript
  code: 401
  {
    message: "You must be authorized to do this"
  }
  ```

- `PATCH api/v1/users/native-language` - endpoint for editing native language:

  ```TypeScript
  {
    languageId: number;
  }
  ```

  If language with this id does not exist:

  ```TypeScript
  code: 404
  {
    message: "Language does not exist"
  }
  ```

## Languages

- `POST api/v1/languages` - endpoint for creating language:

  ```TypeScript
  {
    title: string;
    code: string;
  }
  ```

  Returns __Language__;
  
  If language with this code already exist:

  ```TypeScript
  code: 400
  {
    message: "Language with this code already exists"
  }
  ```

  If user is not admin:

  ```TypeScript
  code: 403
  {
    message: "You are not allowed to do this"
  }
  ```
  
- `PATCH api/v1/languages/:id` - endpoint for editing language:

  ```TypeScript
  {
    title?: string;
    code?: string;
  }
  ```
  
  Returns __Language__;

  If language with this id does not exist:

  ```TypeScript
  code: 404
  {
    message: "Language does not exist"
  }
  ```
  
  If user is not admin:

  ```TypeScript
  code: 403
  {
    message: "You are not allowed to do this"
  }
  ```

- `DELETE api/v1/languages/:id` - endpoint for deleting language.

  If language with this id does not exist:

  ```TypeScript
  code: 404
  {
    message: "Language does not exist"
  }
  ```

  If user is not admin:

  ```TypeScript
  code: 403
  {
    message: "You are not allowed to do this"
  }
  ```
  
- `GET api/v1/languages/:id` - endpoint for receiving language:

  Returns __Language__;

  If language with this id does not exist:

  ```TypeScript
  code: 404
  {
    message: "Language does not exist"
  }
  ```
  
  

- `GET api/v1/languages?limit=number&offset=number` - endpoint for receiving languages with pagination.
  
  Supports:
    - orderBy={name, date}
    - sort={asc,desc}
    - search=string 

  Returns:

  ```TypeScript
  {
    items: Array<Language>;
    pagination: {
      offset: number;
      limit: number;
      total: number;
    };
  }
  ```
  
## Cards 

- `POST api/v1/cards` - endpoint for creating card:

  ```TypeScript
  {
    nativeLanguageId: number;
    foreignLanguageId: number;
    nativeWord: string;
    foreignWord: string; 
  }
  ```

  Returns: __Card__

   If word in card exists

  ```TypeScript
  code: 400
  {
    message: "Word already exists";
  }
  ```
- `PATCH api/v1/cards/:id` - endpoint for editing card:

  ```TypeScript
  {
    nativeLanguageId?: number;
    foreignLanguagefId?: number;
    nativeWord?: string;
    foreignWord?: string; 
  }
  ```

  Returns __Card__

  If word in card exists

  ```TypeScript
    code: 400
    {
      message: "Word already exists";
    }
   ```

  If card with this id does not exist

  ```TypeScript
    code: 404
    {
      message: "Card does not exist";
    }
   ```

  If card was made by another user:

  ```TypeScript
  code: 403
  {
    message: "You are not allowed to do this"
  }
  ```

- `DELETE api/v1/cards/:id` - endpoint for deleting card.

  If card with this id does not exist

  ```TypeScript
    code: 404
    {
      message: "Card does not exist";
    }
  ```

- `GET api/v1/cards/:id` - endpoint for receiving card:

  Returns __Card__

  If card with this id does not exist

  ```TypeScript
    code: 404
    {
      message: "Card does not exist";
    }
   ```

- `GET api/v1/cards?limit=Number&offset=Number` - endpoint for receiving cards with pagination.

  Supports:
  - orderBy={foreign, native, date}
  - sort={asc,desc}
  - search{Foreign, Native}=string
  - languageId=number

  Returns:

  ```TypeScript
  {
    items: Array<Card>;
    pagination: {
      offset: number;
      limit: number;
      total: number;
    };
  }
  ```

## Task

- `POST api/v1/tasks` - endpoint for creating task:

  ```TypeScript
  {
    languageId: number;
    target: "to_foreign"|"to_native";
  }
  ```
  
  Returns __Task__:
  
  If language with specified id does not exist:

  ```TypeScript
    code: 404
    {
      message: "Language does not exist";
    }
   ```

- `POST api/v1/tasks/:id` - endpoint for completing task:

  ```TypeScript
  {
    answer: string;
  }
  ```
  Returns:

  ```TypeScript
  {
    result: "CORRECT"|"INCORRECT";
  }
  ```
  
  If task was made by another user:

  ```TypeScript
  code: 403
  {
    message: "You are not allowed to do this"
  }
  ```

  If task does not exist:

  ```TypeScript
  code: 404
  {
    message: "Task does not exist";
  }
  ```

- `GET api/v1/tasks/:id` - endpoint for receiving task:

  Returns __Task__;

  If task was made by another user:

  ```TypeScript
  code: 403
  {
    message: "You are not allowed to do this"
  }
  ```

  If task does not exist:

  ```TypeScript
  code: 404
  {
    message: "Task does not exist";
  }
  ```

- `GET api/v1/tasks?limit=number&offset=number` - endpoint for receiving uncompleted tasks with pagination. Sorting by date.

  Supports:
  - sort={asc,desc}
  - searchWord=string

  Returns:

  ```TypeScript
  {
    items: Array<tasks>;
    pagination: {
      offset: number;
      limit: number;
      total: number;
    };
  }
  ```

- `GET api/v1/tasks/statistic` - endpoint for receiving tasks statistic.

  Args:
  - dateBegin=Date
  - dateEnd=Date
  - languages=Array<id: number>

  Returns:

  ```TypeScript
  {
    correct: number;
    incorrect: number;
  }
  ```
