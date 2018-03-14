//let baseURL = "http://svcs.ebay.com/services/search/FindingService/v1";
let configData = require('./config');
let makeRequest = require('./request');

function Ebay(options) {
    console.log(options);

    if (!options) throw new Error("Options is missing, please provide the input");
    if (!options.clientID) throw Error("Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/");
    this.options = options;
    this.options.globalID = options.countryCode || "EBAY-US";
    this.options.keyword = "iphone";
}

Ebay.prototype.findItemsByKeywords = function (keyword) {
    console.log("find item by keyword");
    console.log(this);
    this.options.name = keyword;
    let url = this.buildAPIUrl(keyword);

    makeRequest(url).then((data) => {
        console.log("success");
    }, (error) => {
        console.log(error);
    })

}

Ebay.prototype.buildAPIUrl = function (keyword) {
    let base_url = "https://svcs.ebay.com/services/search/FindingService/v1?";
    base_url += "SECURITY-APPNAME=" + this.options.clientID;
    base_url += "&OPERATION-NAME=" + configData["findItemsByKeywords"]["OPERATION-NAME"];
    base_url += "&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON";
    base_url += "&callback=" + configData["findItemsByKeywords"]["OPERATION-NAME"];
    base_url += "&REST-PAYLOAD&keywords=" + keyword;
    base_url += "paginationInput.entriesPerPage=" + this.options.limit;
    base_url += "GLOBAL-ID=" + this.options.globalID;

    return base_url;
};

module.exports = Ebay;
