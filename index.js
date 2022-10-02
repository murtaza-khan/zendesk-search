
const prompt = require('prompt-sync')();
const tickets = require('./tickets.json');
const users = require('./users.json');
const organizations = require('./organizations.json');

const searchTables = { 1: 'users', 2: 'tickets', 3: 'organizations' }
console.log("Welcome to Zendesk Search");
const isQuit = prompt("Type 'quit' to exit any time, Press Enter to Continue");

/**
 * if input in quit the terminate the process
 */
if (isQuit.toLocaleLowerCase() == 'quit') {
    process.exit();
}

console.log("Select Search Option:\n * Press 1 to search Zendesk\n * Press 2 to view a list on search able fields\n * Type 'quit' to exit");
const searchOption = prompt("");

if (Number(searchOption) === 1) {
    console.log(searchOption);
    const searchTable = prompt("Select 1) Users or 2) Tickets or 3) Organizations: ");
    const searchTerm = prompt("Enter Search term: ");
    console.log(searchTerm);
    const searchValue = prompt("Enter Search Value: ");
    console.log(searchValue);
    const result = search(searchTable, searchTerm, searchValue);
    console.log(result);
} else if (Number(searchOption) === 2) {
    console.log('----------------------------------------\n Search Users With');
    console.log(Object.keys(users[0]));
    console.log('----------------------------------------\n Search Tickets With');
    console.log(Object.keys(tickets[0]));
    console.log('----------------------------------------\n Search Organizations With');
    console.log(Object.keys(organizations[0]));
}

function search(searchTable, searchTerm, searchValue) {
    console.log('*******', searchTable, searchTerm, searchValue);
    let result;
    switch (searchTable) {
        case '1':
            result = users.find(t => t[searchTerm] == searchValue);
            if (result && result.organization_id) {
                result.organizations = organizations.find(t => t._id == result.organization_id);
            }
            break;
        case '2':
            result = tickets.find(t => t[searchTerm] == searchValue);
            if (result && result.organization_id) {
                result.organizations = organizations.find(t => t._id == result.organization_id);
            }
            break;
        case '3':
            result = organizations.find(t => t[searchTerm] == searchValue);
            break;
        default:
            break;
    }
    if (!result) {
        return `Searching ${searchTables[searchTable]} for ${searchTerm} with a value of 333\n No result Found`
    }
    return result;
}