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
      nativeLandId: number;
      foreignLangId: number;
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
    status: "OK";
    token: string;
  }
  ```
  
  If Email is not unique: 

  ```TypeScript
  {
    status: "ERROR";
    message: "Email must be unique";
  }
  ```

  If Password is not
  consist of at least 8 Latin characters of lower and upper
  case, at least one digit and at least one special character
  (!@#$%^&*()_+=):

  ```TypeScript
  {
    status: "ERROR";
    message: "Password is not must consist of at least 8 Latin characters of lower and upper  case, at least one digit and at least one special character (!@#$%^&*()_+=)";
  }
  ```

  If length of username less than 5 or higher than 256:

  ```TypeScript
  {
    status: "ERROR";
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
    status: "OK";
    token: string;
  }
  ```

  If password not match email, or user does not exist:

  ```TypeScript
  {
    status: "ERROR";
    message: "Cant log in, check email or password";
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
    language: Language;
  }
  ```
- `PATCH api/v1/langs/:id` - endpoint for editing language:

  ```TypeScript
  {
    title: string; // one ore more fields
    code: string;
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    language: Language;
  }
  ```

- `DELETE api/v1/langs/:id` - endpoint for deleting language.

  Returns:

  ```TypeScript
  {
    status: "OK";
  }
  ```

- `GET api/v1/langs?limit=number&offset=number` - endpoint for receiving languages with pagination.
  
  Supports:
    - orderBy{Name, Date}={asc,desc}
    - filter=string 

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
    nativeLandId: number;
    foreignLangId: number;
    nativeWord: string;
    foreignWord: string; 
  }
  ```

  Returns:
  ```TypeScript
  {
    status: "OK";
    card: Card;
  }
   ```

   If word in card exists

  ```TypeScript
    {
      status: "ERROR";
      message: "Word already exists";
    }
   ```
- `PATCH api/v1/cards/:id` - endpoint for editing card:

  ```TypeScript
  //one of the following fields
  {
    nativeLandId: number;
    foreignLangId: number;
    nativeWord: string;
    foreignWord: string; 
  }
  ```

  Returns:

  ```TypeScript
  {
    status: "OK";
    card: Card;
  }
  ```

  If word in card exists

  ```TypeScript
    {
      status: "ERROR";
      message: "Word already exists";
    }
   ```

- `DELETE api/v1/cards/:id` - endpoint for deleting card.

  Returns:

  ```TypeScript
  {
    status: "OK";
  }
  ```

- `GET api/v1/cards?limit=Number&offset=Number` - endpoint for receiving cards with pagination.

  Supports:
  - orderBy{Foreign, Native, Date}={asc,desc}
  - filter{Foreign, Native}=string

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

  Returns:
  ```TypeScript
  {
    status: "OK";
    exercise: Excercise;
  }
   ```

- `POST api/v1/exercises/:id` - endpoint for completing exercise:

  ```TypeScript
  {
    answer: string;
  }
  ```
  Returns:

  ```TypeScript
  {
    status: "OK";
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
