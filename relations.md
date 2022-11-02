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
}

2. Language:
{
    id: number,
    title: string,
    code: string,
    dateCreated: date,
}

3. Card:
{
    id: number,
    userId: number,
    foreignWordId: number,
    nativeWordId: number,
    dateCreated: date,
}

4. Word:
{
    id: number,
    languageId: number,
    word: string,
}

5. Task:
{
    id: number,
    userId: number,
    cardId: number,
    target: 'to_native'|'to_foreign',
    completeStatus: null|'fail'|'succes',
    dateCreated: date,
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

5. Word - Word: many-to-many relation
Described in Card

6. Language - User: one-to-many relation
Language.id(PK) - User.nativeLanguageId(FK)

```
