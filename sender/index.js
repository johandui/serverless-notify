var AWS = require("aws-sdk");
var db = new AWS.DynamoDB.DocumentClient();
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
exports.handler = async function (event, context, callback) {
  const { body } = event;
  const { id, message } = JSON.parse(body);
  let msg = "";
  const params = {
    TableName: "Notification2",
    Item: {
      id,
      message,
    },
  };
  const sqsparams = {
    DelaySeconds: 5,
    MessageBody: message,
    QueueUrl: process.env.QUEUE_URL,
  };

  try {
    await db.put(params).promise();

    sqs.sendMessage(sqsparams, (err, data) => {
      if (err) {
        console.log("Error", err);
        return;
      }
      console.log(data);
    });

    msg = "Successfully sent message to Dynamo";
  } catch (e) {
    msg = e;
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: msg,
    }),
  };
};
