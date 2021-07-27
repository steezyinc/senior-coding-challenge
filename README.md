# STEEZY Senior Fullstack Coding Challenge

## Context

Your task is to bring the next generation of dance education to users around the world! Your team has just handed you a spreadsheet full of dance classes they've curated and is counting on you to build an MVP to bring this idea to life. We need you to build an application that can allow our users the ability to view these dance classes and track their progress on this online dance platform! 

## Product Requirements

AUTHENTICATION  
As a user:
- [x] I want to navigate to the /signup route to sign up with an email and a password
  - [x] I want my email to be unique to me when I sign up. If a user already has the email I specified I should return to the signup page with some indication of an error
- [x] I want to navigate to the /login route to login to my account with my email and password
  - [x] I want the login page to show me some indication of an error if my login information is incorrect
  - [x] I want the login page to have a link to the /signup page if I do not already have an account
- [x] I want to be able to logout of my account

CLASSES INDEX  
As an unauthenticated user:
- [x] I want to navigate to the /classes route to see what classes are available. (/classes will act as the homepage)
- [x] I want to see a login button indicating that I am not authenticated
- [x] I want to be redirected to the login page if I try to view one of the classes by clicking on the thumbnail
  
  when I am viewing or searching the available classes
  - [x] I want to see the first 9 classes available, with the ability to paginate (9 classes per page)
  - [x] I want to see the title of the class, the instructor, the level, the class thumbnail, and the song used in the class
  - [ ] I want to search the entire catalog of classes. I want to search by title, instructor, level, or song
    - [ ] I want to search without worrying about case sensitivity
    - [ ] I want my search results to show partial results e.g. searching "Anne" will return "Leanne" and "Anne"
  - [ ] I want my search results to be indexed 9 classes at a time

As an authenticated user:
- [x] I want to navigate to the /classes route to see what classes are available. (/classes will act as the homepage)
  - [x] I want /classes to be my homepage
  - [x] I want to see a loading state when I fetch classes
- [x] I want to enter the class player when I click on a class thumbnail  

  when I am viewing or searching the available classes
  - [ ] I want the search functionality to mirror the unauthenticated user flow

CLASS PAGE  
As an authenticated user:
- [x] I want to navigate to the /classes/{ID} route for each class
- [x] I want to play the video
- [x] I want to pause the video
- [x] I want to see a timestamp of how many seconds I have elapsed in the video
- [x] I want to see a timestamp of how many seconds I have remaining in the video
- [x] I want to see a progress bar representing where I am in the video
- [x] I want to be able to seek to different parts of the video by clicking on the progress bar

ANALYTICS  
As a user:
- [x] I want the application to track what timestamp I last left off in the class
- [x] I want the application to track what percentage of the class the user actually watched
  - [x] Case 1: User repeatedly watches the first 10% of the video and then closes the class player. The progress should only be 10%.
  - [x] Case 2: User watches the first 15% of the video. The user seeks to 10% timestamp and watches up to 25%. The user has only watched a total of 25% of the video. The total progress should be 25%.
  - [x] Case 3: User watches the first 10% and the last 10% of the video. The user has watched a total of 20% of the video. The total progress should be 20%.
- [x] I want the application to track how much time the user actually spent on the video. This includes play time and pause time

NAVIGATION HEADER  
As a user:
- [x] I want to navigate back to the homepage (/classes) wherever I am on the app
- [x] I want to logout of the application

## Your Goal

Create a fullstack application that satisfies as many product requirements as you can for your team above. Please list any assumptions you took while building your application in the `Assumptions` section below. Feel free to implement any nice-to-have requirements or styling (please add these to Assumptions as well). 

To achieve this you will need to utilize the CSV/spreadsheet data provided in this repository. The CSV should be dumped into some kind of data store and accessed through an API. Feel free to use a database you are most comfortable with.

For the layout of each page, please refer to the [provided wireframes here on Figma](https://www.figma.com/file/2PJs4oGfknIqokVHVN9xLH/%5BWEB%5D-Classes-Take-Home-Test?node-id=1060%3A178). Your designs do not need to mirror the exact styling of the mockups. As mentioned above, you are also free to design your own navigation header. Feel free to keep it as simple as possible or flex your design muscles. Use Figma as an inspirational reference. 

You are welcome to use any type of boilerplate or frameworks for your application as long as it meets the technical requirements below. We encourage you to use your favorite packages and tools to build a solid application, but try to keep it as simple as possible!

You can assume that you do not have to support legacy browsers. Feel free to use modern features such as **fetch** or **flexbox or css-grids**. 

## Technical Requirements
- React
- Node (Express, preferred, but not required)
- Any database of your choosing
- Tests are a plus, but not required
- CSSinJS is a plus: styled-components, styled-system, ...

## Instructions

- Clone this repository.
- Build a performant, clean and well-structured solution.
- Deploy the app using a service of your choice.
- Remember to have fun with it and try to commit as early and as often as possible!
- When you're finished please send us instructions on how to access your service and download a ZIP of the project using the Github GUI and send us an email with the attachment to notify us.
- Please provide instructions on how to run your application in the `How To Run` section below.

Best of luck and happy coding!

## How to Run  

### setting up and running firebase
- create a firebase account and add a project (here)[https://firebase.google.com/]
- create a realtime db following these directions found (here)[https://firebase.google.com/docs/database/web/start]
- using `./env-example` as a template, create an `.env` file
- update the values in the file with your firebase configs following this (doc)[https://support.google.com/firebase/answer/7015592?hl=en#zippy=%2Cin-this-article], under "Get config object for your web app"
- make sure to match the keys correctly. the config object's keys are camel case, while the `.env` is title case
### setting up and running the server
- install dependencies for the server by running `npm i` in the project/server directory `/`
- start the server by running `npm start` in the project/server directory `/`

### setting up and running the client
- install dependencies for the client by running `npm i` in the client directoy `/steezy-client`
- start the client by running `npm start` in the client directoy `/steezy-client`
- if ran locally, your default broswer should automatically launch the app client on http://localhost:3000
- if not, you can access it [here](http://localhost:3000)

- if you have questions setting this up, please contact brianphanz0r@gmail.com or brianphan88@gmail.com

- you can access the deployed app here: http://13.52.212.124:3000/ (excuse the non https and no domain name)
- i have also included a demo video of the app https://www.loom.com/share/628282ecccb7457cbf56603fbdf2f75b
- if youd like read access to my firebase db, let me know the email that needs it

## Assumptions
Please list any assumptions or extra requirements you added to the application while developing below.
- not too many assumptions were made in terms of the application behavior. i treid to follow it as closely as possible
- assumptions were made on the execution of the application itself. i treated this like a proof of concept and did take shortcuts and trade-offs
- the biggest trade-off was the implementation of `react-routing`. i was too far into the project when i had realized i did not correctly wrap my application, leaving me unable to use methods like `useHistory` and `useLocation` to properly route in a single page app. my work around was manually setting the location.href. given more time, i would go back and change that
- another assumption - given the nature of this POC, i did not create the components to be reusable. i did seperate them by page, but ideally, in a scalable app, it would be more modular
- while implementing, i did stray slightly off of what my email outlined. notably, it is NOT hosted on firebase, but i DO use the realtime db though (have not implemented read/write rules yet). i am actually hosting the application on an aws ec2 instance
- also, i did not implement any strategies listed on passportJS. i found most their documentation to be lacking. so i implemented a simple version (no refresh logic included for this poc)
- for the tracking of the video progress, pause and timestamp, i found this challenge to be very interesting. the 2 options i weighed for tracking progress were:
  - (1) tracking timestamps as a 2d array `[[ 0, 30 ], [ 50, 120 ]]` and implementeing overlap logic - trade offs being, overall logic complexity and time complexity
  - (2) marking off individual timestamps as timestamp events triggered `[ true, true, true, true, false, false, true, true, ...n ]` trade offs being space complexity
- in the end, i chose option 2 because space is cheap these days. maybe not in the case of firebase but another db would be cheap. also, the logic is straighforward and obvious. potential imporvements to cut space complexity of this approach would to observe only time stamps divisible by 2 or 5
- i did not implement the searching acceptance criteria and sort of knew going in, as outlined in the intial email. if i had to do this project over again, i would likely implement a SQL db to store relational data and have better text querying
- i was glad to find that firebase realtime db does have a very straight forward pagination query
- towards the end of sunday, i did take short cuts. notably, the routes made on sunday dont have validation or more http statuses
- hope you guys can give leniency on my frontend code as my official title is backend enginner, but feel free to tear up my backend code, lol
- overall, thank you for the opportunity and this was fun