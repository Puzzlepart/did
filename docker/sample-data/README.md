# Sample Data for Development
this folder contains sample JSON files for seeding the `did` development database.
These files are intended for local development and testing purposes only.
They provide a basic dataset to work with when running the application in a local Docker environment.
## Usage
Rename `sample-data` to `data`, then start the Docker stack with `./scripts/docker.sh start` to import the sample data into your local MongoDB instance on first startup.
The sample data includes:
- Users
- Projects
- Customers
- Time Entries
- Subscriptions
- Roles
- Labels
- Confirmed periods
Feel free to modify or extend the sample data as needed for your development and testing scenarios.
