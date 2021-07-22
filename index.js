// TODO: Include packages needed for this application
const inquirer = require('inquirer');

const fs = require('fs');
const generatePage = require('./src/page-template');
// const { writeFile, copyFile } = require('./utils/generate-site.js');

// TODO: Create an array of questions for user input
function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "projectTitle",
            message: "What is the project title?",
            validate: projectTitle => {
                if (projectTitle) {
                  return true;
                } else {
                  console.log('Please enter your projectTitle!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "description",
            message: "Write a description of your project: ",
            validate: description => {
                if (description) {
                  return true;
                } else {
                  console.log('Please enter a valid description!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "installation",
            message: "Describe the installation process if any: "
        },
        {
            type: "input",
            name: "usage",
            message: "What is this project usage for?",
            validate: usage => {
                if (usage) {
                  return true;
                } else {
                  console.log('Please enter the usage!');
                  return false;
                }
              }
        },
        {
            type: "list",
            name: "license",
            message: "Chose the appropriate license for this project: ",
            choices: [
                "Apache",
                "Academic",
                "GNU",
                "ISC",
                "MIT",
                "Mozilla",
                "Open"
            ]
        },
        {
            type: "input",
            name: "contributing",
            message: "Who are the contributors of this projects?",
            validate: contributing => {
                if (contributing) {
                  return true;
                } else {
                  console.log('Please enter a name!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "tests",
            message: "Is there a test included?",
            validate: tests => {
                if (tests) {
                  return true;
                } else {
                  console.log('Please enter Y/N!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "questions",
            message: "What do I do if I have an issue? ",
            validate: questions => {
                if (questions) {
                  return true;
                } else {
                  console.log('Please enter your name!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "username",
            message: "Please enter your GitHub username: ",
            validate: username => {
                if (username) {
                  return true;
                } else {
                  console.log('Please enter your username!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email: ",
            validate: email => {
                if (email) {
                  return true;
                } else {
                  console.log('Please enter your email!');
                  return false;
                }
              }
        }
    ]);
} 

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileName, err => {
          // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
          if (err) {
            reject(err);
            // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
            return;
          }
    
          // if everything went well, resolve the Promise and send the successful data to the `.then()` method
          resolve({
            ok: true,
            message: 'File created!'
          });
        });
      });
};

// TODO: Create a function to initialize app
function init() {
    promptUser()
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageREAD => {
        return writeToFile(pageREAD);
    })
    .catch(err => {
        console.log(err);
    });
};

// Function call to initialize app
init();
