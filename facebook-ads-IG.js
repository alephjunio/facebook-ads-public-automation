var token = "aaaaaaaaaaaaa"; // pegar na página que está logado do adsmanager/audience
var action = 000000000000000; // pegar na página que está logado do adsmanager/audience
var business_id = 0000000000000000; // pegar na página que está logado do adsmanager/audience
var sessionID = "0000aa000a0a000"; // pegar na página que está logado do adsmanager/audience
var page_id = "000000000000000"; // precisa ser uma string
var seconds = 24 * 60 * 60;

function fetchBody(body) {
    fetch("https://graph.facebook.com/v10.0/act_311377643156915/customaudiences?_app=ADS_MANAGER&_reqName=adaccount%2Fcustomaudiences&access_token=EAABsbCS1iHgBAMxnP28DVkh5pLvxtW7coMUyQgzv91BXHz2RZBFZAsKfZCnuSyxknAsRRQC1qGN0KPFZAt78N2Mj4V2ta72TydZAgacZBZACGyxFROxxhID68TN3ZCqnewfMZCvBfLh8jEaWVBuZCxQdRXELJaM6sdTuozTvUOBaHpDerWBm15XZBdeRpGDKDH04kYZD&method=post&__cppo=1", {
        "headers": {
            "accept": "*/*",
            "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "https://business.facebook.com/",
        "referrerPolicy": "origin-when-cross-origin",
        // "body": encodeURI("__activeScenarioIDs=[\"f6af8df90cebc4_1623115007094.8\"]&__activeScenarios=[\"am.edit_targeting.create_ig_ca\"]&__business_id=1920505904742398&_app=ADS_MANAGER&_index=43&_reqName=adaccount%2Fcustomaudiences&_reqSrc=AdsAMAudienceGraphAPI&_sessionID=3a842b2c2e76cbd6&description=&include_headers=false&locale=pt_BR&method=post&name=[social][fb][todos] 003d&prefill=true&pretty=0&rule={\"inclusions\"%3A{\"operator\"%3A\"or\"%2C\"rules\"%3A[{\"event_sources\"%3A[{\"type\"%3A\"ig_business\"%2C\"id\"%3A\"1874141355956494\"}]%2C\"retention_seconds\"%3A259200%2C\"filter\"%3A{\"operator\"%3A\"and\"%2C\"filters\"%3A[{\"field\"%3A\"event\"%2C\"operator\"%3A\"eq\"%2C\"value\"%3A\"ig_business_profile_all\"}]}}]}}&suppress_http_code=1&xref=f385a9fb488766"),
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
}

var types = [
    "ig_business_profile_all",
];
var type = type[0];
var days = [
    1,
    2,
    3,
    5,
    7,
    15,
    30,
    60,
    90,
    180,
    365,
];
days.forEach(function (day) {
    var dayPad = String(day).padStart(3, '0');
    let bodyIG = {
        "__activeScenarioIDs": "[\"f6af8df90cebc4_1623115007094.8\"]",
        "__activeScenarios": "[\"am.edit_targeting.create_ig_ca\"]",
        "__business_id": "1920505904742398",
        "_app": "ADS_MANAGER",
        "_index": "43",
        "_reqName": "adaccount/customaudiences",
        "_reqSrc": "AdsAMAudienceGraphAPI",
        "_sessionID": "3a842b2c2e76cbd6",
        "description": "",
        "include_headers": "false",
        "locale": "pt_BR",
        "method": "post",
        "name": "[social][fb][todos] " + dayPad + "d",
        "prefill": "true",
        "pretty": "0",
        "rule": "{\"inclusions\":{\"operator\":\"or\",\"rules\":[{\"event_sources\":[{\"type\":\"ig_business\",\"id\":\"1874141355956494\"}],\"retention_seconds\":" + (day * seconds) + ",\"filter\":{\"operator\":\"and\",\"filters\":[{\"field\":\"event\",\"operator\":\"eq\",\"value\":\"" + type + "\"}]}}]}}",
        "suppress_http_code": "1",
        "xref": "f385a9fb4887664"
    };
    var queryString = Object.keys(body).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
    }).join('&');

    console.log(queryString)
//   fetchBody(queryString);
})
