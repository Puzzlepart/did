// MongoDB initialization script for DID development
// This script sets up the initial database structure

print('Initializing DID MongoDB database...');

// Switch to did_dev database
db = db.getSiblingDB('did_dev');

// Create indexes that are commonly used by the application
print('Creating indexes...');

// Create collections with basic indexes
db.createCollection('users');
db.users.createIndex({ "mail": 1 }, { unique: true });
db.users.createIndex({ "displayName": 1 });

db.createCollection('timeentries');
db.timeentries.createIndex({ "userId": 1, "date": 1 });
db.timeentries.createIndex({ "projectId": 1 });

db.createCollection('projects');
db.projects.createIndex({ "name": 1 });
db.projects.createIndex({ "customerId": 1 });

db.createCollection('customers');
db.customers.createIndex({ "name": 1 });

db.createCollection('subscriptions');
db.subscriptions.createIndex({ "tenantId": 1 }, { unique: true });

print('DID MongoDB database initialized successfully!');