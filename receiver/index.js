const axios = require("axios");

exports.handler = function (event, context, callback) {
  const message = event.Records[0].body;

  axios
    .post(process.env.NOTIFY_URL, {
      message,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("aldaa garlaaaa yaanaa", error);
    });
};
