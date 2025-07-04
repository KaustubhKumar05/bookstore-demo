import 'dotenv/config'
import { initModels } from './models/index.js';
import { Sequelize } from 'sequelize';
import {authorsData, booksData} from './sample-data.js'

async function seedDatabase() {
  const sequelize = new Sequelize(process.env.PG_CONNECTION_URL);

  try {
    const { Author, Book } = initModels(sequelize);
    
    // Drops all tables, fine in this case
    await sequelize.sync({ force: true }); 
    
    const authors = await Author.bulkCreate(authorsData);
    console.log(`Added ${authors.length} authors`);
    
    const books = await Book.bulkCreate(booksData);    
    console.log(`Added ${books.length} books`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();