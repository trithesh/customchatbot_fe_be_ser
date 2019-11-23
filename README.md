# customchatbot_fe_be_ser
create a custom UI web chatbot with dialogflow, firebase, angular , nodejs.

steps:  
1)Create a dialogflow agent with your custom name  

2)create intents and create the conversation flow  

3)open the service account of Dialogflow agent in firebase or in GoogleCloudPlatform   

4)Download the key of dialogflow integartions and place it in your be/fireship/functions/ and mention name in your .gitignore  

5)update the few lines in index.js in /functions, regarding to the authentication service.json file  

6)copy your agent project id from dialogflow agent settings page.   

7)install the dependices by using npm i --save  

8)deploy the code in firebase.  

9)you will get 2 URLs 1- gateway and 2- fulfillmet  

10)use gateway url in F.E and use fulfillment url in fulfillment of dialogflow  

11)downlaod the dependiences of angular in fe/cuschatbot   

12)give the gateway url to conatct with server.  

13)in terminal at fe/cuschatbot directory enter 'ng build' to get the Hostable normal html, css,js file  

14)deploy this frontent part in any hosting loaction get URL and use it in iframe to integarte in oter websites  

WOW! done with Custom UI chatBot.   
  
  
This Frontend supports Rich responses Like 'CARDS', 'QuickReplie/Suggestion', 'Image', 'Text'   
