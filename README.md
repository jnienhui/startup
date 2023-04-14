# startup
Hello my name is Jacob Nienhuis a current sophomore at BYU majoring in computer science with a software engineering emphasis.
One of the few hobbies that I enjoy is reading books. Specifically fiction books. However, I've noticed as time passes that this hobby is not as popular anymore.
Some may say this is due to the increased usage and popularity of computers and other devices, but I instead believe it is due to the lack of recommendations.
Thus I will be creadting a website with my own book recommendations that come with my own reviews of them along with where to get them which I hope you will check out.

![Home Page](https://user-images.githubusercontent.com/100976795/215240395-e2aeea84-c5f0-4292-b93e-d1c9eae6d283.jpg)


![Recommendation page](https://user-images.githubusercontent.com/100976795/215240418-43d608db-efef-4803-83be-8768df017c64.jpg)

Key Features:

- Visitors can leave their own recommendations

- Visitors can rate the recommendation on a scale 1-5 and average will be taken

- Visitors should only be able to submit 1 rating per a work (can edit rating later)

- Login to track ratings and unique recommendations

- Average ratings will be displayed in real time

- Visitors can read all the recommendations split into 3 categories(Manga, Books, Lightnovels)

- Ratings can be reset by admin if needed


Notes (Simon CSS)

- The bootstrap allows for a significantly easier time in styling and coloring components on the website
- css also allows for the moving and positioning of objects better
- should code html and css at the same time to make it easier to see the changes made and how to position

Notes (Simon javascript)

- can use similar code to simon's play javascript file to write functions for buttons.
- have something similar to scores javascript to keep track of people's book reviews.

Notes (Simon Service)
- I've never used or heard of node before this class so I found the application super interesting.
- I also found it cool how easy it was to install node and add it to me computer so I will be doing that in the future with my other computers int he future.
- Commands needed:
    - npm init -y
    - npm install express


Notes (Simon Database)
- Was a bit harder to get working than I initially thought
- remember to use pm2 commands to restart services so that they can be reset
- Will allow the service to recognize database and get it to start working
    - pm2 delete (name of service)
    - pm2 start index.js -n (name) -- 3000

Notes  (Simon Login)
- Command to run
    - npm install express cookie-parser mongodb uuid bcrypt
- Found it super cool how you could encrypt the passwords in the database in a way that the computer can interpret and someone jsut looking at the database can't figure out
- ALso found it cool how the score and user link up so the scoreboard updates with user's new score will implement that into my startup for my rating system.

Notes (Simon WebSocket)
- May need to update node because some packages me require a certain version
    - nvm install (version)
    - nvm use (version)
    - will need to reinstall all packages after updating or changing version
    - npm install express cookie-parser mongodb uuid bcrypt ws
        - may need to install one at a time
- In order to use web socket run
    - npm install ws

Notes (Startup HTML/CSS Deliverable)
- the form element is very useful in creating places for the user to input information
- for my Recommendations use IDs to separate the star rating's to make data easier to collect from them.

Notes (Startup javascript Deliverable)
- The use of JSON stringify and parse is quite large and can be used for booleans, arrays and other things
- the rating system's javascript is complete but not working completely as I intended yet as I will use databases later to store objects so that a rating is unique to each user
- in other words the rating won't add a new one to the array everytime a star is clicked instead it will update the rating in the user object and than update the overall.

Notes (Startup Service Deliverable)
- The use of endpoints allowed for a much more readable javascript file and i found that after learning how to do one of them the rest of the endpoints became much easier to understand
- The use of MongoDB also made the code easier as well as allowed me to check if my data was actually being stored.
- The database also allows for everyone to see each others recommendations as well as change their ratings.
- The Websocket caused me some issues when implementing it but i find it cool that others can see what is happening in real time through the messages broadcasted