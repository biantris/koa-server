![image](https://user-images.githubusercontent.com/65451957/170831440-11ffbec9-5380-4513-9084-a6c09aa9dcdb.png)

# koa-server
GraphQL Back-end Server with Relay, Koa, MongoDB and Mongoose

See Front-end project [graphql-relay-web](https://github.com/biantris/graphql-relay-web)

#### 🚧 WIP 🚧
- [x] Koa
- [x] MongoDB
- [x] Mongoose
- [x] GraphQL
- [x] Relay
- [x] Jest
- [x] SuperTest

### Project architecture
[wip]

### Getting Started
- clone this repo
```sh
# install dependencies
yarn
# or
yarn install

# copy .env file
cp .env.example .env

# start project
yarn start

# see on GraphiQL graphql interface on localhost link
http://localhost:9000/graphql
```

### Generating the schema
```sh
yarn schema
```

### Create events manually
```sh
yarn seed
```

## to-do

- https://github.com/biantris/koa-server/projects/1

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
     eventId: "629521641ff2c2c8f5f2e449", 
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
