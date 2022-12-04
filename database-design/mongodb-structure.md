# Mongo DB structure

``` ts
Collections

1. Users:
{
    name: string,
    email: string,
    password: string,
    nativeLanguageId: ObjectId,
    role: 'admin'|'user'
    createdAt: date,
    updatedAt: date,
}

2. Languages:
{
    title: string,
    code: string,
    createdAt: date,
    updatedAt: date,
}

3. Cards:
{
    userId: ObjectId,
    foreignWord: {
        languageId: ObjectId,
        word: string,
    },
    nativeWord: {
        languageId: ObjectId,
        word: string, 
    },
    tasks: [
        {
            target: 'to_native'|'to_foreign',
            isCompleted: boolean,
            createdAt: date,
            updatedAt: date,
        }
    ]
    createdAt: date,
    updatedAt: date,
}

4. Answers:
{
    userId: ObjectId,
    target: 'to_native'|'to_foreign',
    foreignWord: {
        languageId: ObjectId,
        word: string,
    },
    nativeWord: {
        languageId: ObjectId,
        word: string, 
    },
    answerWord: string,
    isSuccess: boolean,
    createdAt: date,
    updatedAt: date,
}
```
