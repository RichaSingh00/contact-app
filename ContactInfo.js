class ContactInfo {
  static id = 0;
  constructor(typeOfContact, valueOfContact) {
    this.typeOfContact = typeOfContact;
    this.valueOfContact = valueOfContact;
    this.id = ContactInfo.id++;
  }
  static newContactInfo(typeOfContact, valueOfContact) {
    try {
      if (typeof typeOfContact != "string") {
        throw new Error("Not a valid parameter");
      }
      if (typeof valueOfContact != "string") {
        throw new Error("Not a valid paramter");
      }
      return new ContactInfo(typeOfContact, valueOfContact);
    } catch (error) {
      console.log(error.message);
    }
  }
  #updateTypeOfContact(value) {
    if (typeof value != "string") {
      throw new Error("Not a valid parameter");
    }
    this.typeOfContact = value;
  }
  #updateValueOfContact(value) {
    if (typeof value != "string") {
      throw new Error("Not a valid parameter");
    }
    this.valueOfContact = value;
  }
  updateContactInfo(parameter, value) {
    if (typeof parameter != "string") {
      throw new Error("Invalid parameter");
    }
    switch (parameter) {
      case "type":
        this.#updateTypeOfContact(value);
        break;
      case "value":
        this.#updateValueOfContact(value);
      default:
        throw new Error("Invalid Parameter");
        break;
    }
  }
}
module.exports = ContactInfo;
