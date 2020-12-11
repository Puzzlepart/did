---
name: Smoke test
about: Use this issue type when performing a smoke test
labels: smoke tests
---

The following suite of tests should be performed before each release in dev https://didapp-dev.azurewebsites.net/ and after deploy to production

You can see active smoke test issues [here](https://github.com/Puzzlepart/did/issues?q=is%3Aopen+is%3Aissue+label%3A%22smoke+tests%22).

# Timesheet **$1**

## Navigation **$1.1**

- [ ] Possible to navigate betweeen **Overview**, **Summary** and **Allocation** **$1.1.1**
- [ ] I have navigated to previous week using back arrow icon **$1.1.2**
- [ ] I have navigated to next week using next arrow icon **$1.1.2**
- [ ] I have navigated to current week using current week button **$1.1.2**
- [ ] I have navigated to a week using the week picker **$1.1.2**
- [ ] I have navigated to the current, previous and next week using shortcuts `shift+i` **$1.1.3**

## Resolving / confirming $1.2

- [ ] I have manually resolved an event **$1.2.1**
- [ ] I have manually ignored an event **$1.2.2**
- [ ] I have automatically resolved an an event using projectkey/customer key **$1.2.3**
- [ ] I have automatically ignored an event using `IGNORE` label or tag **$1.2.4**
- [ ] Having resolved all appointments, I have confirmed the current week **$1.2.5**
- [ ] I have unconfirmed the current week **$1.2.6**
- [ ] I have forecasted the current week **$1.2.7**
- [ ] I have forecasted a week in the future **$1.2.8**
- [ ] I have confirmed a week in the future **$1.2.9**

# Projects $2

## Navigation $2.1

- [ ] I can navigate to the `Projects` section **$2.1.1**

## Search $2.2

- [ ] I can find the project `PZL ADM` **$2.2.1**

## Edit $2.3

- [ ] I can find and edit the project `PZL ADM` and persist the changes **$2.3.1**
- [ ] I can add a tag to the project **$2.3.2**

## Add $2.4

- [ ] I can add a new project **$2.4.1**
- [ ] I can find the newly added project using search **$2.4.2**

## View $2.5

- [ ] I can select the project `PZL ADM` **$2.5.1**
- [ ] I can see information about the project **$2.5.2**
- [ ] I can navigate to the `Time entries` tab and see time entries in a tabula view **$2.5.3**

# Customers $3

## Navigation $3.1

- [ ] I can navigate to the `Customers` section **$3.1.1**

## Search $3.2

- [ ] I can find the customer `Puzzlepart` **$3.2.1**

## Add $3.3

- [ ] I can add a new customer **$3.3.1**
- [ ] I can find the newly added customer using search **$3.3.2**

  

## Edit $3.4

- [ ] I can find and edit the customer `PZL` and persist the changes **$3.4.1**

# Backoffice functions $4

## Reports $4.1

- [ ] I can navigate to `Reports` **$4.1.1**
- [ ] I can generate the report `Last month`, and content appears valid **$4.1.2**
  - [ ] I have tried filtering the report
  - [ ] I have tried downloading the report as excel
- [ ] I can generate the report `Current month`, and content appears valid **$4.1.3** 
  - [ ] I have tried filtering the report
  - [ ] I have tried downloading the report as excel
- [ ] I can generate the report `This year`, and content appears valid **$4.1.4**
  - [ ] I have tried filtering the report
  - [ ] I have tried downloading the report as excel
- [ ] I can generate the report `Forecast`, and content appears valid **$4.1.5**
  - [ ] I have tried filtering the report
  - [ ] I have tried downloading the report as excel

## Admin $4.2

### Users $4.2.1

- [ ] I can navigate to the `Users` section **$4.2.1.1**
- [ ] I have openend the `Bulk import` UI. Add users if possible **$4.2.1.2**
- [ ] I have openend the `Add user` UI. Add a user if possible **$4.2.1.3**

### Summary $4.2.2

- [ ] I can navigate to the `Summary` section **$4.2.2.1**
- [ ] I can see all users under the `Week` and `Month` tabs **$4.2.2.2**
- [ ] I can see if users have confirmed their weeks and the number of hours they have confirmed **$4.2.2.3**
- [ ] I have tried exporting the current view as excel and the content appears valid **$4.2.2.4**

### Labels $4.2.3

- [ ] I can navigate to the `Labels` section **$4.2.3.1**
- [ ] I have added a new label **$4.2.3.2**
- [ ] I have edited this label **$4.2.3.3**
- [ ] I can add this new label to an new or existing project **$4.2.3.4**
- [ ] This new label appears in the Timesheet on mouseover on the project being tagged **$4.2.3.5**
- [ ] I have deleted this label **$4.2.3.6**

### Roles and permissions $4.2.4

- [ ] I can navigate to the `Roles and permissions` section **$4.2.4.1**
- [ ] I have added a new role **$4.2.4.2**
- [ ] I have edited an existing role **$4.2.4.3**
- [ ] I have assigned this new role to a user **$4.2.4.4**
- [ ] I have removed the role i previously created **$4.2.4.5**

### Subscription $4.2.5

- [ ] I can see my tenant name in the `Name` section (`Puzzlepart`) **$4.2.5.1**
- [ ] I have turned off `Synchronise user properties`, saved changes and seen it persist on reload **$4.2.5.2**
- [ ] I have turned `Synchronise user properties` back on, saved and seen it persist on reload **$4.2.5.3**
- [ ] I have turned some `Properties to synchronise` off, saved and seen it persist on reload **$4.2.5.4**
- [ ] I can adjust forecasting (all the below tasks require saving and logging out and in again to see the changes) **$4.2.5.5**
  - [ ] I have turned `Forecasting enabled` off and observed there are no forecast notifications. **$4.2.5.5.1**
  - [ ] I have turned `Forecasting enabled` on, set the number of weeks to 8, and seen that I have at least 8 forecasting notifications (split weeks produce 2 notifications). **$4.2.5.5.2** 



### API Tokens $4.2.6

- [ ] I can navigate to the `API tokens` section **$4.2.6.1**
- [ ] I have generated a new API token **$4.2.6.2**
- [ ] I can see the newly generated token **$4.2.6.3**
- [ ] I have deleted this newly created token **$4.2.6.4**

# Personal settings $5

- [ ] I can see notifications for unconfirmed and unforecasted weeks **$5.1**
- [ ] I can dismiss notifications, and they don't reappear **$5.2**
- [ ] I can see the `Settings` flyout **$5.3**
- [ ] I can change language **$5.4**
- [ ] I can see my current tenant affiliation **$5.5**
- [ ] I can see my current name and email **$5.6**
- [ ] I can see the 'Export my hours' UI **$5.7**
- [ ] I have exported my hours as excel and they appear valid **$5.8**