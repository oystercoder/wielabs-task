// chatgpt+stackoverflow
import path from 'path';

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'out/database.sqlite'), // Adjust the path as needed
  },
  useNullAsDefault: true,
};
