import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// gateway url - you find the url in firebase overview page after deploying server code in firebase paste the url below
const dialogflowURL =
  "https://us-central1-fireshipbot-vouhsj.cloudfunctions.net/dialogflowGateway";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.scss"]
})
export class ChatboxComponent implements OnInit {
  constructor(public http: HttpClient) {}

  cusQuickReplies = [];
  loading = false;

  sessionId = Math.random()
    .toString(36)
    .slice(-5);

  usermessage: string;
  conversation = [
    {
      message: [{ message: "text", text: { text: ["Hello!"] } }],
      user: "bot",
      date: Date()
    }
  ];

  ngOnInit() {}

  async sendMessage(msg) {
    this.conversation.push({
      message: [{ message: "text", text: { text: [msg] } }],
      user: "user",
      date: Date()
    });
    this.loading = true;
    this.cusQuickReplies != null
      ? (this.cusQuickReplies = [])
      : this.cusQuickReplies;
    await this.http
      .post<any>(dialogflowURL, {
        sessionId: this.sessionId,
        queryInput: {
          text: {
            text: msg,
            languageCode: "en-US"
          }
        }
      })
      .subscribe(res => {
        const { fulfillmentMessages } = res;
        this.conversation.push({
          message: fulfillmentMessages,
          user: "bot",
          date: Date()
        });
        this.loading = false;
        fulfillmentMessages.forEach(response => {
          if ("quickReplies" in response) {
            console.log(response);
            this.cusQuickReplies = [...response.quickReplies.quickReplies];
          }
        });
      });
    this.usermessage = "";
  }

  // find to send as a message or open a url
  openOrSend(url) {
    if (url.includes("https") || url.includes("http") || url.includes("www")) {
      // open the url in new page
      console.info(url);
      window.open(url);
    } else {
      this.sendMessage(url);
    }
  }

  // quick reply res
  sendQuick(msg) {
    this.sendMessage(msg);
    this.cusQuickReplies = [];
  }
}
