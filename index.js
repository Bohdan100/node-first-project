const colors = require("@colors/colors");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await listContacts();
      console.log("Your contacts in phonebook:".green);
      console.table(contactList);
      break;

    case "get":
      const foundСontact = await getContactById(id);
      console.log("The contact you are looking for:".yellow);
      console.table(colors.yellow(foundСontact));
      break;

    case "add":
      const updateContactList = await addContact(name, email, phone);
      console.log("Your new contact list in phonebook:".green);
      console.table(updateContactList);
      break;

    case "remove":
      const remoteContact = await removeContact(id);
      console.log(
        "You have deleted the following contact in your phonebook:".red
      );
      console.table(colors.red(remoteContact));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
