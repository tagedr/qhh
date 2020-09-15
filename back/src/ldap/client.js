export default async function loginLdap(username, password, callback) {

  let ldap = require("ldapjs");
  let client = ldap.createClient({
    url: process.env.LDAP_URL,
  });

  let birdName = process.env.LDAP_BIND_DN;
  let birdPassword = process.env.LDAP_BIND_PASSWORD;

  let dnMap = new Map();
  const _callback = callback

  async function loginAttempt() {
    // client.unbind();
    if (dnMap.has(username)) {
      console.log("loginAttempt for " + username);
      client.bind(dnMap.get(username), password, (err, res) => {
        if (err) {
          console.log("Error occurred while auth");
          // console.error(err);
          console.log("Auth error!");
          client.unbind();
          client.destroy();
          _callback(false);
          return;
        }
        console.log("AUTH is OK for " + username);
        client.unbind();
        client.destroy();
        _callback(true);
        return;
      });
    } else
      _callback(false);
  }

  client.bind(birdName, birdPassword, function (err) {
    console.log("AD binding");
    if (err) {
      console.error("Error occurred while binding");
      console.error(err);
      _callback(false);
    } else {
      let base = process.env.LDAP_BASE;
      let search_options = process.env.LDAP_SEARCH_OPTIONS;
      client.search(base, search_options, async function (err, res) {
        console.log("AD searching");
        if (err) {
          console.error("Error occurred while ldap search");
          console.error(err);
        } else {
          res.on("searchEntry", function (entry) {
            // console.log("Entry: ", JSON.stringify(entry.object["dn"]));
            dnMap.set(entry.object[process.env.LDAP_LOGIN_FILTER], entry.object["dn"]);
          });
          res.on("searchReference", function (referral) {
            _callback(false);
            return;
            // console.log("Referral", referral);
          });
          res.on("error", function (err) {
            _callback(false);
            return;
            // console.log("Error is", err);
          });
          res.on("end", function (result) {
            // console.log("Result is", result);
            loginAttempt();
            return;
          });
        }
      });
      // client.unbind();
    }
  });
};
