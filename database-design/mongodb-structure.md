# Mongo DB structure

``` ts
Collections

1. Users:
{
    name: string,
    email: string,
    password: string,
    nativeLanguageId: number,
    role: 'admin'|'user'
    cards: [
        {
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
    ],
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

3. Answers:
{
    id: number,
    userId: number,
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
