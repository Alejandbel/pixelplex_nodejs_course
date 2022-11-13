START TRANSACTION;

DROP TABLE IF EXISTS "answers";
DROP TABLE IF EXISTS "tasks";

DROP TABLE IF EXISTS "cards";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "words";
DROP TABLE IF EXISTS "languages";

DROP TYPE IF EXISTS ROLE_TYPE;
DROP TYPE IF EXISTS TARGET_TYPE;

CREATE TYPE ROLE_TYPE AS ENUM ('user', 'admin');

CREATE TABLE "languages"
(
    "id"        SERIAL PRIMARY KEY,
    "title"     VARCHAR(256) NOT NULL,
    "code"      VARCHAR(256) NOT NULL UNIQUE,
    "createdAt" TIMESTAMP    NOT NULL,
    "updatedAt" TIMESTAMP    NOT NULL
);

INSERT INTO "languages"
    ("title", "code", "createdAt", "updatedAt")
VALUES
    ('English', 'en', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

CREATE TABLE "users"
(
    "id"               SERIAL PRIMARY KEY,
    "name"             VARCHAR(256) NOT NULL,
    "email"            VARCHAR(256) NOT NULL,
    "normalizedEmail"  VARCHAR(256) NOT NULL UNIQUE,
    "password"         VARCHAR(256) NOT NULL,
    "role"             ROLE_TYPE    NOT NULL,
    "nativeLanguageId" INT          REFERENCES "languages" ("id") ON DELETE SET NULL NOT NULL,
    "createdAt"        TIMESTAMP    NOT NULL,
    "updatedAt"        TIMESTAMP    NOT NULL
);

CREATE TABLE "words"
(
    "id"         SERIAL PRIMARY KEY,
    "languageId" INT REFERENCES "languages" ("id") ON DELETE CASCADE NOT NULL,
    "word"       TEXT                                                NOT NULL,
    "createdAt"  TIMESTAMP                                           NOT NULL,
    "updatedAt"  TIMESTAMP                                           NOT NULL,
    UNIQUE ("languageId", "word")
);

CREATE TABLE "cards"
(
    "id"                SERIAL PRIMARY KEY,
    "userId"            INT REFERENCES "users" ("id") ON DELETE CASCADE NOT NULL,
    "nativeLanguageId"  INT REFERENCES "words" ("id") ON DELETE CASCADE NOT NULL,
    "foreignLanguageId" INT REFERENCES "words" ("id") ON DELETE CASCADE NOT NULL,
    "createdAt"         TIMESTAMP                                       NOT NULL,
    "updatedAt"         TIMESTAMP                                       NOT NULL,
    UNIQUE ("userId", "nativeLanguageId", "foreignLanguageId")
);

CREATE TYPE TARGET_TYPE AS ENUM ('to_native', 'to_foreign');

CREATE TABLE "tasks"
(
    "id"          SERIAL PRIMARY KEY,
    "userId"      INT REFERENCES "users" ("id") ON DELETE CASCADE NOT NULL,
    "cardId"      INT REFERENCES "cards" ("id") ON DELETE CASCADE NOT NULL,
    "target"      TARGET_TYPE                                     NOT NULL,
    "isCompleted" BOOLEAN DEFAULT FALSE,
    "createdAt"   TIMESTAMP                                       NOT NULL,
    "updatedAt"   TIMESTAMP                                       NOT NULL
);

CREATE TABLE "answers"
(
    "id"         SERIAL PRIMARY KEY,
    "userId"     INT REFERENCES "users" ("id") ON DELETE CASCADE NOT NULL,
    "taskId"     INT REFERENCES "tasks" ("id") ON DELETE CASCADE NOT NULL,
    "answerWord" TEXT                                            NOT NULL,
    "isSuccess"  BOOLEAN                                         NOT NULL,
    "createdAt"  TIMESTAMP                                       NOT NULL,
    "updatedAt"  TIMESTAMP                                       NOT NULL
);

COMMIT;
