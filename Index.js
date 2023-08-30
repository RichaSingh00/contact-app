const User=require("./User")
let admin=User.newAdmin("Admin1",21,'F') //Creating an admin: id 0
console.log('Admin is:',admin)

let user1=admin.newUser("User1",20,'M') //Creating users via admin: id 1
let user2=admin.newUser('User2',22,'F') //id 2
console.log('User 1 is:',user1)
console.log('User 2 is:',user2)

console.log('All users are:',admin.getAllUser()) //All info on users via admin

console.log(User.findUser(1)) //Admin finding user using it's user id

console.log(admin.updateUser(1,'name','User1Updated')) //Admin updates user info

console.log(admin.removeUser(1)) //Admin removes user using it's id
console.log(admin.getAllUser())

let contact1=user1.createContact('Contact1')  //Creating contact of user: id 0
let contact2=user1.createContact('Contact 2') //id 1
console.log('All contacts of user1 are',user1.getAllContacts())

user1.updateContact(1,"name",'Contact2Updated') //Updating contact of user
console.log(user1.getAllContacts())

console.log(user1.removeContact(1)) //Removing contact via it's id 
console.log(user1.getAllContacts())

user1.createContactInfo('home','1234567890',0) //Create contact info of particular contact using id: id 0
user1.createContactInfo('email','abc@gmail.com',0) //id 1

console.log('Contact info of contact0: ',user1.getAllContactInfo(0)) //Get all contact info

user1.updateContactInfo(0,'type','work mail',0) //Update the contact info of a contact using contact id, contactinfoid
console.log('Updated contact info is:',user1.getAllContactInfo(0)) //Updated parameter in respective id 

user1.removeContactInfo(0,0) //Remove the contact info of a particular contact of a user
console.log('Contact info list after removing the contact info',user1.getAllContactInfo(0))

