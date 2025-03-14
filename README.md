# Events Platform

## Contents

[Project Overview](#project-overview) \
[Video Walk Through](#video-walkthrough) \
[Deployed Site](#deployed-site) \
[Test User Accounts](#test-user-accounts) \
[Backend Repository](#backend-repository) \
[How To Run The Project Locally](#how-to-run-this-project-locally)

- [Cloning The Project](#cloning-the-project)
- [Adding Google API](#adding-the-google-api)
- [Adding Cloudinary](#adding-cloudinary)
- [Adding EmailJS](#adding-emailjs)
- [Adding Firebase](#add-firebase)

## Project Overview

This is a freelance project for Tech Returners. The website allows users to sign up to events and save events. It also allows staff members to create and manage events.

## Video walk through

link: https://youtu.be/Dl79b-riifo \
link: https://www.loom.com/share/3b31991a78a44db9bf54f9757f92e41f?sid=917bec20-02c1-4aee-993c-a18fdc0918b9 (demo of the google calendar feature)

## Deployed Site

https://lian468eventsplatform.netlify.app/

## Test user accounts

email: charlotte2468642@gmail.com \
email: alexander369632468@gmail.com \
Gmail password: event-organiser-test-user

**These accounts are test users on the Google Cloud Project and are the only accounts who can login via google and add events to their google calendar**

**These emails are already signed up to the website. To use these accounts login with the "Login with Google button"**

**Unfortunately, I can't disable the additional verification that google requires when logging into these accounts so you might not be able to use them. Please contact me (lianwan468@gmail.com) if you would like to use these accounts.**

## Backend Repository

https://github.com/LianTattersall/be-event-organiser

## How to run this project locally

### Cloning the project

1. cd into the folder you want this project to be in, then clone the repository by running the command:

```git
git clone https://github.com/LianTattersall/events-platform.git
```

2. cd into the project directory by running the command:

```
cd events-platform
```

3. Install the dependencies by running:

```
npm install
```

### Adding the Google API

4. Create a Google Cloud Project.

5. Configure your OAuth consent screen by following these instructions:
   https://developers.google.com/workspace/guides/configure-oauth-consent \
   When configuring your OAuth conset screen add the following scopes: \
   \
   /auth/calendar \
   /auth/userinfo.email \
   /auth/userinfo.profile \
   \
   Also note that when you add test users to the project, these are the only accounts that will be able to login via google and add events to their google calendar

6. Create a client ID by following these instructions: https://developers.google.com/workspace/guides/create-credentials \
   For your URI Browser requests add the following URI:
   http://localhost:5173/ \
   (Or replace the port number 5173 with the port number your local projects run on)

7. Create a `.env` file at the roote of the project. In that file add the following environment variable:

```
VITE_GOOGLE_CLIENT_ID=<copy and paste your Google client ID from step 6 here>
```

### Adding Cloudinary

8. Create a free Cloudinary account here: https://cloudinary.com/users/register_free
9. Go to **settings -> Upload -> Add Upload Preset**
10. Create an unsigned preset with the name **eventPlatformPreset**
11. Copy and Paste you product environment cloud name which you can find by going to **Settings -> Account**
12. In your `.env` file add the environment variables:

```
VITE_PRESET=eventPlatformPreset
VITE_CLOUD_NAME=<your product environment cloud name>
```

### Adding EmailJS

13. Create an EmailJS account here: https://dashboard.emailjs.com/sign-up
14. Go to **Email Services -> Add New Service -> Gmail -> Connect Account** (Replace **Gmail** with a different personal service if you prefer!)
15. Add an email account of your choice. This will be the email address that sends the confirmation emails and the email updates to users.
16. Create an email template by going to **Email Templates -> Create New Template**. \
    In the **subject** input bar enter `{{subject}}` \
    In the **content** text area enter

```
Hello {{to_name}},

{{message}}

Best wishes,
EventOrganiser team
```

Change the **To Email** to `{{to_email}}` \
Finally change the **From Name** to EventOrganiser \
Save your template (Feel free to style or modify this template just be sure to include the parameters subject, message, to_name, to_email).

17. Finally add the following environment variables to your `.env` file

```
VITE_EMAILJS_KEY=<Your emailJS Public Key>
VITE_EMAILJS_SERVICE_ID=<Your emailJS service ID>
VITE_EMAILJS_TEMPLATE_ID=<Your emailJS template ID>
```

18. You can find your Public Key in **Account** \
    You can find your Service ID in **Email Services** \
    You can find your Template ID in **Email Templates**

### Add Firebase

19. Go to https://console.firebase.google.com and create a new project

20. Go to **Authentication -> Add new provider -> Email/Password** to allow email and password authentication.

21. Go to **Project Overview -> Add app -> Web (</>)**. Follow the steps to create an app, then scroll down and find the firebase config object.

22. In folder containing the project install firebase using `npm install firebase`

23. In the root of the project, add a file called `firebase.js` and add the following code:

```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "*****",
  authDomain: "********",
  projectId: "*******",
  storageBucket: "******",
  messagingSenderId: "**********",
  appId: "******",
  measurementId: "********",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
```

and replace the `firebaseConfig` object with the one you found from step 21.

24. Run the command `npm run dev` to start the local server and view the website!
