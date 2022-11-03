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
- Card
  
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
  code: 409
  {
    message: "Email must be unique";
  }
  ```

  If Password is not
  consist of at least 8 Latin characters of lower and upper
  case, at least one digit and at least one special character
  (!@#$%^&*()_+=):

  ```TypeScript
  code: 400
  {
    message: "Password is not must consist of at least 8 Latin characters of lower and upper  case, at least one digit and at least one special character (!@#$%^&*()_+=)";
  }
  ```

  If length of username less than 5 or higher than 256:
  
  ```TypeScript
  code: 400
  {
    message: "Username length should be less than 5 or higher than 256";
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
      message: "Can't find user with this email";
    }
    ```
  If password not match email:

  ```TypeScript
  code: 400
  {
    message: "Cant log in, check password";
  }
  ```

  - `POST api/v1/auth/logout` - endpoint for logging out:

## User

For all the rest endpoint if user is not authorized:

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
  code: 400
  {
    message: "Language with this id does not exist"
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
  code: 409
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
    message: "Language with this id does not exist"
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
    message: "Language with this id does not exist"
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
    message: "Language with this id does not exist"
  }
  ```
  
  

- `GET api/v1/languages?limit=number&offset=number` - endpoint for receiving languages with pagination.
  
  Supports:
    - orderBy{Name, Date}={asc,desc}
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
  code: 409
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
    code: 409
    {
      message: "Word already exists";
    }
   ```

  If card with this id does not exist

  ```TypeScript
    code: 404
    {
      message: "Card with this id does not exist";
    }
   ```
- `DELETE api/v1/cards/:id` - endpoint for deleting card.

  If card with this id does not exist

  ```TypeScript
    code: 404
    {
      message: "Card with this id does not exist";
    }
  ```

- `GET api/v1/cards/:id` - endpoint for receiving card:

  Returns __Card__

  If card with this id does not exist

  ```TypeScript
    code: 404
    {
      message: "Card with this id does not exist";
    }
   ```

- `GET api/v1/cards?limit=Number&offset=Number` - endpoint for receiving cards with pagination.

  Supports:
  - orderBy{Foreign, Native, Date}={asc,desc}
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
    taskType: "to_foreign"|"to_native";
  }
  ```

  Returns __Task__:
  
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
    message: "Task was made by another user";
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
    message: "Task was made by another user";
  }
  ```

  If task does not exist:

  ```TypeScript
  code: 404
  {
    message: "Task does not exist";
  }
  ```

- `GET api/v1/tasks?limit=number&offset=number` - endpoint for receiving uncompleted tasks with pagination.

  Supports:
  - orderByDate={asc,desc}
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
