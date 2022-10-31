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
- Exercise
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

- `DELETE api/v1/languages/:id` - endpoint for deleting language.

  If language with this id does not exist:

  ```TypeScript
  code: 404
  {
    message: "Language with this id does not exist"
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
  code: 200
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
    code: 200
    {
      message: "Word already exists";
    }
   ```

- `DELETE api/v1/cards/:id` - endpoint for deleting card.



- `GET api/v1/cards?limit=Number&offset=Number` - endpoint for receiving cards with pagination.

  Supports:
  - orderBy{Foreign, Native, Date}={asc,desc}
  - filter{Foreign, Native}=string
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

## Exercise

- `POST api/v1/exercises` - endpoint for creating exercise:

  ```TypeScript
  {
    languageId: number;
    exerciseType: "to_foreign"|"to_native";
  }
  ```

  Returns __Exercise__:
  
- `POST api/v1/exercises/:id` - endpoint for completing exercise:

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

- `GET api/v1/exercises?limit=number&offset=number` - endpoint for receiving uncompleted exercises with pagination.

  Supports:
  - orderByDate={asc,desc}
  - filterWord=string

  Returns:

  ```TypeScript
  {
    items: Array<Exercises>;
    pagination: {
      offset: number;
      limit: number;
      total: number;
    };
  }
  ```

- `GET api/v1/exercises/statistic` - endpoint for receiving exercises statistic.

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
