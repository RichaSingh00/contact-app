const ContactInfo = require("./ContactInfo");

class Contact {
  static id = 0;
  constructor(name) {
    this.name = name;
    this.contactInfo = [];
    this.id = Contact.id++;
  }
  static newContact(name) {
    if (typeof name != "string") {
      throw new Error("Invalid name format");
    }
    return new Contact(name);
  }
  updateContact(parameter, value) {
    try {
      if (typeof parameter != "string") {
        throw new Error("Inavalid parameter");
      }
      switch (parameter) {
        case "name":
          this.#updateName(value);
          break;
        default:
          throw new Error("Invalid parameter");
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  #updateName(value) {
    if (typeof value !== "string") {
      throw new Error("Not a name");
    }
    this.name = value;
  }
  createContactInfo(typeOfContact, valueOfContact) {
    //Creating contact info using the contact
    let newContactInfo = ContactInfo.newContactInfo(
      typeOfContact,
      valueOfContact
    );
    this.contactInfo.push(newContactInfo);
    return newContactInfo;
  }
  getAllContactInfo() {
    return this.contactInfo;
  }
  #findContactInfo(contactInfoId) {
    for (let index = 0; index < this.contactInfo.length; index++) {
      if (contactInfoId == this.contactInfo[index].id) {
        return [this.contactInfo[index], index];
      }
      return [null, -1];
    }
  }
  updateContactInfo(parameter, value, contactInfoId) {
    let [contactInfo, indexOfContactInfo] =this.#findContactInfo(contactInfoId);
    if (contactInfo == null) {
      throw new Error("Contact Info not found");
    }
    return contactInfo.updateContactInfo(parameter, value,contactInfoId);
  }
  removeContactInfo(contactInfoId) {
      let [contactInfo, indexOfContactInfo] =this.#findContactInfo(contactInfoId);
      if (contactInfo == null) {
        throw new Error("Contact Info not found");
      }
      return this.contactInfo.splice(indexOfContactInfo, 1);
    } 
  }

module.exports = Contact;
