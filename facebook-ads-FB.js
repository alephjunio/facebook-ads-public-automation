var token = "aaaaaaaaaaaaa"; // pegar na página que está logado do adsmanager/audience
var action = 000000000000000; // pegar na página que está logado do adsmanager/audience
var business_id = 0000000000000000; // pegar na página que está logado do adsmanager/audience
var sessionID = "0000aa000a0a000"; // pegar na página que está logado do adsmanager/audience
var page_id = "000000000000000"; // precisa ser uma string
var seconds = 24 * 60 * 60;

// Tipos de regras simples
var types = [
    [
        "page_liked", // facebook - pessoas que curtiram
        '[social][fb][curtiram]'
    ],
    [
        "page_engaged", // facebook - todos que fizeram todos recursos
        '[social][fb][todos]'
    ],
    [
        "page_visited", // facebook - todos que visitaram
        '[social][fb][visitaram]'
    ],
    [
        "page_post_interaction", // facebook - todos que engajaram
        '[social][fb][engajaram]'
    ],
    [
        "page_cta_clicked", // facebook - todos que clicaram
        '[social][fb][todos]'
    ],
    [
        "page_messaged", // facebook - todos que enviaram mensagem
        '[social][fb][mensagem]'
    ],
    [
        "page_or_post_save", // facebook - todos que salvaram
        '[social][fb][salvaram]'
    ],
];


function fetchBody(body) {
    // console.log(body)
    fetch("https://graph.facebook.com/v10.0/act_"+action+"/customaudiences?_app=ADS_MANAGER&_reqName=adaccount%2Fcustomaudiences&access_token="+ token +"&method=post&__cppo=1", {
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

var masterType = types[2]; // Seleciona o Master Type
var type = masterType[0]
var textSeparator = masterType[1];

// console.log('masterType');
// console.log(masterType);
// console.log('type');
// console.log(type);
// console.log('textSeparator');
// console.log(textSeparator);

if(type != 'page_liked'){
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
} else{
    var days = [
        0
    ];
}
days.forEach(function (day) {
    var dayPad = String(day).padStart(3, '0');

    let textName = textSeparator;
    if(type != 'page_liked'){
        textName += " " + dayPad + "d";
    }

    let body = {
        // __activeScenarioIDs: ["f1ea8cf8a850f5_1623120293132.9"],
        // __activeScenarios: ["am.edit_targeting.create_page_ca"],
        // rule: {
        //     "inclusions": {
        //         "operator": "or",
        //         "rules": [{
        //             "event_sources": [{"type": "page", "id": "649955078708917"}],
        //             "retention_seconds": 259200,
        //             "filter": {
        //                 "operator": "and",
        //                 "filters": [{"field": "event", "operator": "eq", "value": "page_engaged"}]
        //             }
        //         }]
        //     }
        // }

        "__activeScenarioIDs": "[\"f6af8df90cebc4_1623115007094.8\"]",
        "__activeScenarios": "[\"am.edit_targeting.create_ig_ca\"]",
        "__business_id": business_id,
        "_app": "ADS_MANAGER",
        "_index": "153",
        "_reqName": "adaccount/customaudiences",
        "_reqSrc": "AdsAMAudienceGraphAPI",
        "_sessionID": sessionID,
        "description": "",
        "include_headers": "false",
        "locale": "pt_BR",
        "method": "post",
        "name": textName,
        "prefill": "true",
        "pretty": "0",
//     "rule":"{\"inclusions\":{\"operator\":\"or\",\"rules\":[{\"event_sources\":[{\"type\":\"ig_business\",\"id\":\"1874141355956494\"}],\"retention_seconds\":"+ (day * seconds) +",\"filter\":{\"operator\":\"and\",\"filters\":[{\"field\":\"event\",\"operator\":\"eq\",\"value\":\""+ type +"\"}]}}]}}",
        "rule": JSON.stringify({
            "inclusions": {
                "operator": "or",
                "rules": [{
                    "event_sources": [{"type": "page", "id": page_id}],
                    "retention_seconds": (day * seconds),
                    "filter": {
                        "operator": "and",
                        "filters": [{"field": "event", "operator": "eq", "value": type}]
                    }
                }]
            }
        }),
        "suppress_http_code": "1",
        "xref": "f2e68630facf9d"
    };
    var queryString = Object.keys(body).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
    }).join('&');

  // console.log(queryString)
    fetchBody(queryString);
})
