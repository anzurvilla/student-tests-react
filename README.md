# Student Tests App
Student Test App is a useful app for the teachers who need to check their students' test scores.
___

## Installation steps

### 1. Database installation

#### Requirements
You must have installed [MySQL](https://www.mysql.com/downloads/) or [MariaDB](https://mariadb.org/download/).
#### Create and dump the database
Execute the SQL files located in the ```sql``` folder via mysql:
- step1_create_db_user: Create the database and the user, then grant privileges to the user. 
- step2_dump_db: Dump the sctructure and data of the database.

### 2. NodeJS packages
Use the package manager [npm included in Node.js](https://nodejs.org/en/download/) to install Student Tests App. _(Note: You must have installed at least the versions: Node.js-12.x, npm-6.x)_

Install the necessary NodeJS packages for the RESTful Web service to work properly by running the following command in the root folder of the project:
```bash
student_tests> npm i
```

### 3. ReactJS packages installation
Then, install the ReactJS packages:
```bash
student_tests> cd web
student_tests\web> npm i
```

### 4. ReactJS build
Thereafter, build the ReactJS project:
```bash
student_tests\web> npm run build
```

### 5. Configuration
Open and edit the ```.env``` file located in the root folder of the project:
```bash
# main
NODE_ENV=production
TZ=America/Phoenix
API_PORT=8080
WEB_PORT=80

# database (supports: 'mysql', 'sqlite', 'postgres', 'mssql')
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=testscores
DB_USERNAME=testscores_dba
DB_PASSWORD=Strong-DB_Password
DB_CONSOLE_LOG=false
```

## Running
Finally, we execute the following command to run the server:
```bash
npm run start
```

## Usage
Open a browser and access the URL:
[http://localhost](http://localhost)

#### Enjoy it!

## Contributing
Your feedback is welcome. Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

#### Developed by Anzur Villa