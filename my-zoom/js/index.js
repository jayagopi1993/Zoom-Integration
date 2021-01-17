window.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM fully loaded and parsed');
  websdkready();
});

function websdkready() {
  var testTool = window.testTool;
  if (testTool.isMobileDevice()) {
    vConsole = new VConsole();
  }
  console.log("checkSystemRequirements");
  console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

  ZoomMtg.preLoadWasm();

  var API_KEY = "";
  var API_SECRET = "";

  document
    .getElementById("join_meeting")
    .addEventListener("click", function (e) {
      e.preventDefault();
      var meetingConfig = {
        mn: parseInt(document.getElementById("meeting_number").value),
        name: "Gopinath",
        pwd: "Sxyg7b",
        leaveUrl: "file:///D/my-zoom/index.html",
        email: "zoom-test@test.com",
        china: 0,
        lang: "en-US",
        role: 0,
      }

      if (!meetingConfig.mn || !meetingConfig.name) {
        alert("!!!Meeting number or username is empty");
        return false;
      }

      var signature = ZoomMtg.generateSignature({
        meetingNumber: meetingConfig.mn,
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        role: meetingConfig.role,
        success: function (res) {
          console.log(res.result);
          meetingConfig.signature = res.result;
          meetingConfig.apiKey = API_KEY;
          websdkreadymeeting(meetingConfig);
          document.getElementById('zmmtg-root').style.display = 'block';
          document.getElementById('join_meeting').style.display = 'none';
        },
      });
    });

}
