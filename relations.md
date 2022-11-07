# Entities and relations in app

``` ts
ENTITIES

1. User:
{
    id: number,
    name: string,
    email: string,
    password: string,
    token: string,
    nativeLanguageId: number,
    role: 'admin'|'user',
    createdAt: date,
    updatedAt: date,
}

2. Language:
{
    id: number,
    title: string,
    code: string,
    createdAt: date,
    updatedAt: date,
}

3. Card:
{
    id: number,
    userId: number,
    foreignWordId: number,
    nativeWordId: number,
    createdAt: date,
    updatedAt: date,
}

4. Word:
{
    id: number,
    languageId: number,
    word: string,
    createdAt: date,
    updatedAt: date,
}

5. Task:
{
    id: number,
    userId: number,
    cardId: number,
    target: 'to_native'|'to_foreign',
    isCompleted: boolean,
    createdAt: date,
    updatedAt: date,
}

6. Answer:
{
    id: number,
    userId: number,
    taskId: number,
    answerWord: string,
    isSuccess: boolean,
    createdAt: date,
    updatedAt: date,
}
```

```
RELATIONS

1. Language - Word: one-to-many relation
Language.id(PK) - Word.languageId(FK)

2. Card - Task: one-to-many relation
Card.id(PK) - Task.cardId(FK)

3. User - Task: one-to-many relation
User.id(PK) - Task.userId(FK)

4. User - Card: one-to-many relation
User.id(PK) - Card.userId(FK)

5. Language - User: one-to-many relation
Language.id(PK) - User.nativeLanguageId(FK)

6. User - Answer: one-to-many relation
User.id(PK) - Answer.userId(FK)

7. Task - Answer: one-to-many relation
Task.id(PK) - Answer.taskId(FK)
```
