# customchatbot_fe_be_ser
create a custom UI web chatbot with dialogflow, firebase, angular, nodejs.

steps:  
1)Create a dialogflow agent with your custom name  

2)create intents and create the conversation flow  

3)open the service account of Dialogflow agent in firebase or in GoogleCloudPlatform   

4)Download the key of dialogflow integrations and place it in your be/fireship/functions/ and mention name in your .gitignore  

5)Update the few lines in index.js in /functions, regarding the authentication service.json file  

6)Copy your agent project id from the dialogflow agent settings page.   

7)Install the dependencies by using npm i --save  

8)Deploy the code in firebase.  

9)You will get 2 URLs 1- gateway and 2- fulfillment  

10)Use gateway URL in F.E and use fulfillment URL in fulfillment of dialogflow  

11)Download the dependencies of angular in fe/cuschatbot   

12)Give the gateway URL to contact with server.  

13)In the terminal at fe/cuschatbot directory enter 'ng build' to get the Hostable normal HTML, CSS,js file  

14)Deploy this frontend part in any hosting location get URL and use it in iframe to integrate with other websites  

WOW! done with Custom UI chatBot.   
  
  
This Frontend supports Rich responses Like 'CARDS', 'QuickReplie/Suggestion', 'Image', 'Text'   
