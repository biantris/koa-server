![image](https://user-images.githubusercontent.com/65451957/170831440-11ffbec9-5380-4513-9084-a6c09aa9dcdb.png)

<h1 align="center">
 koa-server
</h1>

<p align="center">
GraphQL Back-end Server with Relay, Koa, MongoDB and Mongoose
</p>

<p align="center">
   <a href="https://github.com/biantris/koa-server/actions">
      <img alt="Tests Passing" src="https://github.com/biantris/koa-server/actions/workflows/test.yml/badge.svg" />
    </a>
    <a href='https://coveralls.io/github/biantris/koa-server?branch=feat/codev'>
      <img src='https://coveralls.io/repos/github/biantris/koa-server/badge.svg?branch=feat/codev' alt='Coverage Status' />
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=biantris_">
        <img src="https://img.shields.io/twitter/follow/biantris_?style=social&logo=twitter"
        alt="follow on Twitter">
    </a>
</p>

<p align="center">🚧 WIP 🚧</p>

> **Note**
> See Front-end project [graphql-relay-web](https://github.com/biantris/graphql-relay-web)

### Stack
- [x] Koa
- [x] MongoDB
- [x] Mongoose
- [x] GraphQL
- [x] Relay
- [x] Jest
- [x] SuperTest
- [x] Code Coverage(Coverall) [see](https://github.com/biantris/koa-server/issues/129)
- [ ] Linter (Eslint)
- [ ] Prettier

### Project architecture
```
.
├── graphql/
│   └── schema.graphql
├── script
├── src/
│   ├── __tests__
│   ├── database
│   ├── graphql
│   ├── modules/
│   │   ├── event/
│   │   │   ├── __tests__
│   │   │   ├── fixure
│   │   │   ├── mutations/
│   │   │   │   ├── __tests__
│   │   │   │   ├── EventCreateMutation.ts
│   │   │   │   ├── EventDeleteMutation.ts
│   │   │   │   ├── EventUpdateMutation.ts
│   │   │   │   └── index.ts
│   │   │   ├── EventFilterInputType.ts
│   │   │   ├── EventLoader.ts
│   │   │   ├── EventModel.ts
│   │   │   └── EventType.ts
│   │   └── node/
│   │       └── typeRegister.ts
│   ├── schema/
│   │   ├── MutationType.ts
│   │   ├── QueryType.ts
│   │   └── schema.ts
│   └── shared
└── test
```

### Getting Started
- clone this repo
```sh
# install dependencies
> yarn
# or
> yarn install

# copy .env file
> cp .env.example .env

# start project
> yarn start

# see on GraphiQL graphql interface on localhost link
http://localhost:9000/graphql

# or see graphql Playground
http://localhost:9000/playground
```

### Generating the schema
```sh
> yarn schema
```

### Create events manually
```sh
> yarn seed
```

## to-do

- [projects](https://github.com/biantris/koa-server/projects/1)
![image](https://user-images.githubusercontent.com/65451957/214913343-0bcb661f-a6be-453a-ac89-b09736cc8738.png)


## demo
- 🔗 https://koa-server-production.up.railway.app/
- 🔗 https://koa-server-production.up.railway.app/graphql
- 🔗 https://koa-server-production.up.railway.app/playground

### Mutations
- Event Create Mutation
```graphql
 mutation {
   EventCreate (input: { 
     eventId: 564654, 
     name: "nice event", 
     start: "2022-07-01T00:00:00.000Z",
     end: "2022-07-01T23:59:59.000Z",
     allDay: false
   }) {
       event {
         id
         name
         start
         end
         allDay
       }
        error
        success
      }
    }
```
- Event delete Mutation
```graphql
  mutation {
      EventDelete (input: { eventId: "629521641ff2c2c8f5f2e449" }) {
        eventId
        error
        success
      }
    }
```
- Event Update Mutation
```graphql
   mutation {
   EventUpdate (input: { 
     eventId: "62952906f5c651ced019adf3", 
     name: "nice event /o/", 
     start: "2022-07-01T00:00:00.000Z",
     end: "2022-07-01T23:59:59.000Z",
     allDay: false
   }) {
       event {
         id
         name
         start
         end
         allDay
       }
        error
        success
      }
    }
```
  
### Queries
- Event queries
```graphql
 query {
  events {
    edges {
      node {
        name
        start
        end
        allDay
      }
    }
  }
}

```

## contributions
Feel free to contribute to this project, if you find any bugs or improvements, open an issue and send a PR about it \o/
