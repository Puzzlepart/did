const assert = require('assert');
const { first } = require('underscore');
const matchEvents = require('../middleware/graphql/resolvers/timesheet.matching');
const { data: { projects } } = require('./data/projects.json');
const { data: { customers } } = require('./data/customers.json');

describe('Event matching', () => {
    let testEvent = {};

    beforeEach(() => {
        testEvent = {
            title: "Important meeting",
            categories: [],
        };
    })

    describe('Match against project', () => {
        it('IAM VAC in category should match against customer Employee Absence', () => {
            testEvent.categories.push('IAM VAC');
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.customer.name, 'Employee Absence');
        });

        it('[IAM VAC] in subject should match against customer Employee Absence', () => {
            testEvent.title = '[IAM VAC]';
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.customer.name, 'Employee Absence');
        });

        it('[IAM VAC] in body should match against customer Employee Absence', () => {
            testEvent.body = 'Hello this is an event [IAM VAC]';
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.customer.name, 'Employee Absence');
        });

        it('{IAM VAC} in body should match against customer Employee Absence', () => {
            testEvent.body = 'Hello this is an event {IAM VAC}';
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.customer.name, 'Employee Absence');
        });

        it('/IAM VAC/ in body should match against customer Employee Absence', () => {
            testEvent.body = 'Hello this is an event /IAM VAC/';
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.customer.name, 'Employee Absence');
        });

        it('IAM ILL in category should take presedence bfore IAM VAC in subject', () => {
            testEvent.body = 'Hello this is an event /IAM VAC/';
            testEvent.categories.push('IAM ILL');
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.project.key, 'IAM ILL');
        });
    });


    describe('Matching suggestions', () => {
        it('{4SUBSEA FLEXSHARZ} should suggest {4SUBSEA FLEXSHARE}', () => {
            testEvent.body = 'Hello this is an event [4SUBSEA FLEXSHARZ]';
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.suggestedProject.key, '4SUBSEA FLEXSHARE');
        });

        it('{4SUBSEA FLEXSHARZE} should suggest {4SUBSEA FLEXSHARE}', () => {
            testEvent.body = 'Hello this is an event [4SUBSEA FLEXSHARZE]';
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.suggestedProject.key, '4SUBSEA FLEXSHARE');
        });

        it('{IAM VAK} should suggest {IAM VAC}', () => {
            testEvent.categories.push('IAM VAK');
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.suggestedProject.key, 'IAM VAC');
        });

        it('{IAM TRAVELLING} in category should yield no project but a match against Employee Absence', () => {
            testEvent.categories.push('{IAM WHAAT}');
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.customer.name, 'Employee Absence');
        });

        it('4SUBSEA ABC in category should yield no project but a match against 4SUBSEA', () => {
            testEvent.categories.push('4SUBSEA ABC');
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.customer.key, '4SUBSEA');
        });

        it('4SUBSEA ABC in body should yield no project and no match against customer 4SUBSEA', () => {
            testEvent.body = 'Hello this is an event 4SUBSEA ABC';
            const event = first(matchEvents([testEvent], projects, customers));
            assert.strictEqual(event.customer, undefined);
        });
    });
});
