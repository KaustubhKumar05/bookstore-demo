# Book store demo

[Hosted on Vercel](https://bookstore-demo-vert.vercel.app/login)

[Demo video on Loom](https://www.loom.com/share/427c10a440604aa388659f94fb3419aa?sid=60c3423e-586a-4863-9397-cb8aa8d2a1a4)

## Tasks:

- Setup project with relevant deps
- Models for Author and Book using Sequelize
- Setup postgres and mongo instances on Railway
- Models for User and Review using Mongoose
- GraphQL CRUD APIs
- Next for FE
- Authentication

### Day 1

- Planning out daily checkpoints for the project
- Reading documentation for Apollo, GraphQL, Sequelize and BullMQ

### Day 2

- Initialised a Next frontend
- Set up DB instances on Railway
- Created models with Sequelize and seeded dummy data

### Day 3

- Set up CRUD APIs
- Built list views with toggle and pagination

### Day 4

- Dialogs for adding, viewing, editing and deleting entries
- UI for filters
- Added more sample data

### Day 5

- Edit records
    - Handle author name using a select
- Polish
    - Clear filters
    - Hide pagination if there's only 1 page, no results state
    - UI layout
- MongoDB for book reviews

### Day 6
- Authentication
- Hosting



## Running the project on local

Client:

```
cd client

// Install dependencies
npm i

// Start local server
npm run dev

```

Server:

```
cd server

// Install dependencies
npm i

//Start local server
npm run dev

```

Seeding data in the DBs:
```
cd server

node seeder
```
This populates authors and books in Postgres and then reviews in MongoDB. User login credentials are also stored in MongoDB 