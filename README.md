# Messaging App 

## Overview

This is a fullstack MERN (MongoDB, Express, React, Node.js) app designed to emulate the functionality of messaging services like WhatsApp and Facebook Messenger. It is part of The Odin Project curriculum: https://www.theodinproject.com/lessons/nodejs-messaging-app

View the repo for the backend of this project at https://github.com/JakeBrowning90/messaging-app-back

## Technologies

In addition to the MERN stack, this project uses Passport.js and jsonwebtoken for authentication. Styling is vanilla CSS.

## Challenges/To-dos
The following is a list of features I'd like to add for greater functionality and/or presentation.

- Live updates to conversations and users post new messages.
- Notifications of new messages from the Contacts screen.
- Add image management options, such as profile pictures and image attachments in conversations.
- General responsive design improvements.
- Options for deleting messages and contacts.
- Finer control for updating user profiles, without needing to update all listed fields at once. 

## How to use

When starting the app, log in with your email and password, or create a new account. Once you have created a new account, you can log in with those credentials. 

Once logged in, you will see your list of contacts, which may be empty if you are a new user. To add contacts, click the button at the bottom of the page to bring up a search screen. Search for other users by their "Display name", not their email address. When you locate a user you wish to add as a contact, click the "Add" button next to their name. This will return you to the Contacts list. Note that adding a user as a contact will also add you to their contacts list! 

To engage in a chat, click on a contact's name from the main screen. The newest message in the conversation will be visible at the bottom of the message history. Type in the text input at the bottom of the screen and click "Send" to post a new message.

To manage your profile, click your name at the top-right corner of the screen to navigate to the "Edit profile" screen. From here, you can update your display name by which other users will find and see you, your status which will appear to your contacts, and your password. You can also log out off the app using to the button at the bottom of the page. 

## Credits
