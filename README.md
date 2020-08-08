# Foster Connect App | foster-client

As a foster parent you are required to complete a significant amount of documentation and training. This is an ongoing process and is required for each child on multiple occassions. It can also be difficult for foster parents to find a support netowrk of other foster parents. The Foster Connect app will allow foster parents to create an account that gives them the ability to connect with other foster parents. They will also be able to create profiles for the children in thier care to keep documents and information organized. 


# Technologies

- React
- Ruby
- Rails
- axios
- Cloudinary
- Heroku
- JavaScript
- Webpack


# Challenges

- Implementing redux (ran out of time)
- User authentication over cross-linked urls
- User profile images (cloudinary api)
- Document downloading (cloudinary api)



# 
# Project Timeline

|  Day | Deliverable | Status
|---|---| ---|
|Jul 25| Project Description | Done
|Jul 26| Wireframes | Done
|Jul 26| Flowchart | Done
|Jul 26| Timeline | Done
|Jul 26| Database Relationship Chart | Done
|Jul 27| Finish Redux Training 2.5 hrs Wes Bos course | Done 
|Jul 28| Create API - Ruby on Rails | Done
|Jul 28| Seed User, Children & Messages (Faker?) | -
|Jul 28| Seed Resources by hand | Done
|Jul 29| Create React App | Done
|Jul 29| Sign in, Create Profile | Done
|Jul 30| Profile Pages (RUD) | Done
|Jul 31| Child Profile Pages (CRUD) | Done
|Aug 01| Picture & Document Show All Pages | -
|Ongoing| App styling | Done
|Ongoing| Testing & Debugging | -
|Aug 03| Messageboard Page (CRUD) | -
|Aug 05| Final styling tweaks | -
|Aug 06| Presentation Prep | -
|Aug 08| Present | -

# 
# MVP & Stretch Goals

#### MVP
- Frontend Git Repo - https://github.com/gumtow/fosterconnect-client
- Backend Git Repo - https://github.com/gumtow/fosterconnect-api
- App built with React and Ruby on Rails
- CRUD functionality for user accounts
- CRUD functionality for child profiles
- Use React Redux to handle state
- Deploy site using Heroku

#### Stretch Goals
- Lazy loading
- Create & Send messages via messageboard
- Create a dynamic slideshow from pictures

# 
# User Stories

#### A user will be able to ...
- sign up for, and login to their account
- Create, Read, Update & Delete their account
- Create, Read, Update & Delete profiles for children in their care
- Add pictures
- Add documents to children's profile to keep them organized

# 
# Database Structure
- Users
  - Name
  - Password
  - Children (DB)
- Children
  - Name
  - Status
  - Pictures
  - Documents
- Messageboard
  - Subject
  - Content
  - User (DB)
    - Name 

# 
# Flowchart

<img src="https://raw.githubusercontent.com/gumtow/foster-client/master/FosterConnectApp.png" width=750 >

# 
# Wireframes

### Homepage
<img src="https://raw.githubusercontent.com/gumtow/foster-client/master/Desktop-home.png" width=750 >


### Sign in Page
<img src="https://raw.githubusercontent.com/gumtow/foster-client/master/Desktop-home-sign-in.png" width=750>


### Profile Page
<img src="https://raw.githubusercontent.com/gumtow/foster-client/master/Desktop-Profile.png" width=750>



# Link

Frontend: https://fosterconnect-client.herokuapp.com/
API: https://fosterconnect-api.herokuapp.com/





> Provided for the students of the [Bottega Code School](https://bottega.tech/)

*Fork from [es6-webpack2-starter](https://github.com/micooz/es6-webpack2-starter)*