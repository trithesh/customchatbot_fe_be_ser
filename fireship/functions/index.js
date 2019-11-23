// !!!! Download the json file of dialogflow integrations from the GCP or respective firebase project and place in your project.
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
// service json file downloaded from firebase or GCP of service account
const serviceAccount = require("./service-account.json");

// authenticate the firebase with the credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  // if you are using DB of firestore define the db name here, please refer the google firebase docs for detailed info
});

const { SessionsClient } = require("dialogflow");

/*
-----------------------------------------------------------------------------------------------------
            dialogflow gateway, authenticates channel and send response to webhook
-----------------------------------------------------------------------------------------------------
*/
// service
exports.dialogflowGateway = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { queryInput, sessionId } = request.body;

    const sessionClient = new SessionsClient({ credentials: serviceAccount });
    // give the project id,sessioid where project id - you find in dialogflow settings of agent
    const session = sessionClient.sessionPath("fireshipbot-vouhsj", sessionId);

    // this below line will contact with googledialogflow fullfiment and gets back the response
    const responses = await sessionClient.detectIntent({ session, queryInput });
    const result = responses[0].queryResult;
    response.send(result);
    // sends back the response to channel
  });
});

/*
-------------------------------------------------------------------------------------------------
            fulfillment webhook to be given in dialogflow.
-------------------------------------------------------------------------------------------------
*/
// fullfilment
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion, Image } = require("dialogflow-fulfillment");
exports.dialogflowWebhook = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  // please understand the structure of agent by consoling it.

  const result = request.body.queryResult;

  async function userOnboardingHandler(agent) {
    const { name, color } = result.parameters;
    // await profile.set({})
    agent.add(`welcome aboard my friend!`);
  }

  async function testResponses(agent) {
    agent.add(
      new Card({
        title: "card with external link",
        text: "card button opens link in new page",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "OPEN",
        buttonUrl: "https://assistant.google.com/"
      })
    );
    agent.add(
      new Card({
        title: "card with reply response",
        text: "card button sends back response as user",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "HI there!",
        buttonUrl: "HI there!"
      })
    );
    agent.add([
      new Suggestion("one suggestion"),
      new Suggestion("another suggestion")
    ]);
    agent.add(
      new Image({
        imageUrl: "https://via.placeholder.com/150"
      })
    );
  }

  // intent map handles the matching the intent and respective function to get invoked
  let intentMap = new Map();
  intentMap.set("UserOnboarding", userOnboardingHandler);
  intentMap.set("sampleResponses", testResponses);
  agent.handleRequest(intentMap);
});

// references - https://fireship.io/lessons/build-a-chatbot-with-dialogflow/
