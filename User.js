const Contact = require("./Contact");

class User {
  static id = 0;
  static allUsers = [];
  constructor(name, age, gender, isAdmin) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.id = User.id++;
    this.isAdmin = isAdmin;
    this.contacts = [];
  }
  static newAdmin(name, age, gender) {                                 //Create an admin
    try {
      if (typeof name !== "string") {
        throw new Error("Not a name");
      }
      if (typeof age !== "number") {
        throw new Error("Not an age");
      }
      if (gender !== "M" && gender !== "F" && gender !== "O") {
        throw new Error("Not a gender");
      }
      return new User(name, age, gender, true);
    } catch (error) {
      console.log(error.message);
    }
  }
  newUser(name, age, gender) {                                            //Admin creates user
    try {
      if (typeof name !== "string") {
        throw new Error("Not a name");
      }
      if (typeof age !== "number") {
        throw new Error("Not an age");
      }
      if (gender !== "M" && gender !== "F" && gender !== "O") {
        throw new Error("Not a gender");
      }
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      let newUser = new User(name, age, gender, false);
      User.allUsers.push(newUser);
      return newUser;
    } catch (error) {
      console.log(error.message);
    }
  }
  getAllUser() {                                                 //Admin can get info about user
    try {
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      return User.allUsers;
    } catch (error) {
      console.log(error.message);
    }
  }
  static findUser(userId) {                                       //Admin finds user using it's id
    for (let index = 0; index < User.allUsers.length; index++) {
      if (userId == User.allUsers[index].id) {
        return [User.allUsers[index], index];
      }
    }
    return [null, -1];
  }
  #updateName(value) {                                            //Admin updates the name parameter
    if (typeof value !== "string") {
      throw new Error("Not a name");
    }
    this.name = value;
  }
  #updateAge(value) { //Admin updates the age parameter
    if (typeof value !== "number") {
      throw new Error("Not an age");
    }
    this.age = value;
  }
  #updateGender(value) { //Admin updates the gender parameter
    if (value !== "M" && value !== "F" && value !== "O") {
      throw new Error("Not a gender");
    }
    this.gender = value;
  }
  updateUser(userId, parameter, value) { //Admin can update the user info
    try {
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      let [userToBeUpdated, indexOfUserToBeUpdated] = User.findUser(userId);
      if (userToBeUpdated == null) {
        throw new Error("No users found");
      }
      switch (parameter) {
        case "name":
          userToBeUpdated.#updateName(value);
          break;
        case "age":
          userToBeUpdated.#updateAge(value);
          break;
        case "gender":
          userToBeUpdated.#updateGender(value);
          break;
        default:
          throw new Error("Invalid parameter");
          break;
      }
      return userToBeUpdated;
    } catch (error) {
      console.log(error.message);
    }
  }
  removeUser(userId) { //Admin can remove an user
    try {
      if (!this.isAdmin) {
        throw new Error("Not an admin");
      }
      let [userToBeDeleted, indexOfUserToBeRemoved] = User.findUser(userId);
      if (userToBeDeleted == null) {
        throw new Error("No users found");
      }
      User.allUsers.splice(indexOfUserToBeRemoved, 1);
      return `User is deleted at ${userId}`;
    } catch (error) {
      console.log(error.message);
    }
  }
  createContact(name) { //User can create contact
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot create contacts");
      }
      if (typeof name != "string") {
        throw new Error("Not a name");
      }
      let newContact = new Contact(name);
      this.contacts.push(newContact);
      return newContact;
    } catch (error) {
      console.log(error.message);
    }
  }
  getAllContacts() { //User can get info about all contacts
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot access the contact");
      }
      return this.contacts;
    } catch (error) {
      console.log(error.message);
    }
  }
  #findContact(contactId) { //User finds contact using it's contact id
    for (let index = 0; index < this.contacts.length; index++) {
      if (contactId == this.contacts[index].id) {
        return [this.contacts[index], index];
      }
    }
    return [null, -1];
  }
  updateContact(contactId, parameter, value) { //User can update it's contact
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot update the contacts");
      }
      if (contactId < 0 || typeof contactId != "number") {
        throw new Error("Invalid contact id ");
      }
      let [contactToBeUpdated, indexofContactToBeUpdated] = this.#findContact(contactId);
      if (contactToBeUpdated == null) {
        throw new Error("Not contacts found");
      }
      contactToBeUpdated.updateContact(parameter, value);
    } catch (error) {
      console.log(error.message);
    }
  }
  removeContact(contactId) { //User can delete it's contact
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot delete the contacts");
      }
      let [contactToBeDeleted, indexOfContactToBeDeleted] = this.#findContact(contactId);
      if (contactToBeDeleted == null) {
        throw new Error("No contacts found");
      }
      this.contacts.splice(indexOfContactToBeDeleted, 1);
      return `User is deleted at ${contactId}`;
    } catch (error) {
      console.log(error.message);
    }
  }
  createContactInfo(typeOfContact, valueOfContact, contactID) { //User can create contact info of it's contact
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot create contact info");
      }
      let [contactInfo, indexOfContactInfo] = this.#findContact(contactID);
      if (contactInfo == null) {
        throw new Error("Contact not fouond");
      }
      contactInfo.createContactInfo(typeOfContact, valueOfContact);
    } catch (error) {
      console.log(error.message);
    }
  }
  getAllContactInfo(contactId) { //User can access the contact info of it's contact using it's contact id
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot access contact info");
      }
      let [contactInfo, indexOfContact] = this.#findContact(contactId);
      if (contactInfo == null) {
        throw new Error("Contact Info not found");
      }
      return contactInfo.getAllContactInfo();
    } catch (error) {
      console.log(error.nessage);
    }
  }
  updateContactInfo(contactId, parameter, value, contactInfoId) { //Update contact info of the contact of the user 
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot update contact info");
      }
      if (contactId < 0 || typeof contactId != "number") {
        throw new Error("Invalid contact id ");
      }
      let [contact, indexOfContact] = this.#findContact(contactId);
      if (contact == null) {
        throw new Error("Contact not found");
      }
      return contact.updateContactInfo(parameter, value, contactInfoId);
    } catch (error) {
      console.log(error.message);
    }
  }
  removeContactInfo(contactId, contactInfoId) {
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot remove contact info");
      }
      if (contactId < 0 || typeof contactId != "number") {
        throw new Error("Invalid contact id ");
      }
      let [contactInfo, indexOfContactInfo] = this.#findContact(contactId);
      if (contactInfo == null) {
        throw new Error("Contact not found");
      }
      contactInfo.removeContactInfo(contactInfoId);
      // return `Contact Info is deleted at ${contactInfoId}`;
    } catch (error) {
      console.log(error.message);
    }
  }
}
module.exports = User;
