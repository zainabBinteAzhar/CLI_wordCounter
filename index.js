#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from 'gradient-string';
import chalkanimation from 'chalk-animation';
import figlet from 'figlet';
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function Title() {
    const rainbowTitle = chalkanimation.rainbow("\nWord Counter\n");
    await sleep();
    rainbowTitle.stop();
}
function Exit() {
    console.clear();
    const msg = "\nThankyou!\n";
    figlet(msg, (_err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}
let choice;
await Title();
do {
    console.log(chalk.magenta("\n**********MENU**********\n"));
    let options = await inquirer.prompt([
        {
            name: "data",
            type: "list",
            message: chalk.bgMagenta("\nSelect the Option: "),
            choices: ["Count Words in a Sentence", "Exit"]
        }
    ]);
    choice = options.data;
    if (choice === "Count Words in a Sentence") {
        console.log(chalk.greenBright("\n*****Your Word Counter*****"));
        let words = await inquirer.prompt([
            {
                name: "sentence",
                type: "input",
                message: chalk.bgGreenBright("\nEnter the Sentence: "),
                validate: (input) => {
                    if (input.length > 0)
                        return true;
                    else
                        return "Please enter a valid sentence";
                }
            }
        ]);
        let sentence = words.sentence;
        sentence = sentence.trim().replace(/\s+/g, ' ');
        let count = sentence.split(" ").length;
        console.log(chalk.blueBright("\nTotal words are: " + "\n" + count));
    }
    else if (choice === "Exit") {
        Exit();
    }
} while (choice != "Exit");
