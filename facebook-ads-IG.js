// Tipos de regras simples
var types = [
    [
        "ig_business_profile_all", // instagram - Todos que se engajaram com sua conta profissional
        '[social][ig][todos]',
        "43"
    ],
    [
        "ig_business_profile_visited", // instagram - Qualquer pessoa que visitou o perfil da sua conta profissional
        '[social][ig][visitaram]',
        "43"
    ],
    [
        "ig_business_profile_engaged", // instagram - Pessoas que se engajaram com qualquer publicação ou anúncio
        '[social][ig][engajaram]',
        "43"
    ],
    [
        "ig_business_profile_user_messaged", // instagram - Pessoas que enviaram uma mensagem para a sua conta profissioal
        '[social][ig][mensagem]',
        "43"
    ],
    [
        "ig_business_profile_ad_saved", // instagram - Pessoas que salvaram qualquer publicação ou anúncio
        '[social][ig][salvaram]',
        "43"
    ],
];

var business_id = 0000000000000000;
var ig_id = "coloque o id da conta do instagram aqui"; // precisa ser uma string
var token = "coloque seu token aqui"; // pegar na página que está logado do adsmanager/audience
var action = 000000000000000;
var sessionID = "coloque o id da session aqui"; // pegar na página que está logado do adsmanager/audience
var seconds = 24 * 60 * 60;

function fetchBody(body) {
    fetch("https://graph.facebook.com/v10.0/act_" + action + "/customaudiences?_app=ADS_MANAGER&_reqName=adaccount%2Fcustomaudiences&access_token=" + token + "&method=post&__cppo=1", {
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

var masterType = types[4]; // Seleciona o Master Type
var type = masterType[0]
var textSeparator = masterType[1];
var indexType = masterType[2];

// console.log('masterType');
// console.log(masterType);
// console.log('type');
// console.log(type);
// console.log('textSeparator');
// console.log(textSeparator);

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

    let textName = textSeparator;
    if (type != 'page_liked') {
        textName += " " + dayPad + "d";
    }

    let body = {
        "__activeScenarioIDs": "[\"f6af8df90cebc4_1623115007094.8\"]",
        "__activeScenarios": "[\"am.edit_targeting.create_ig_ca\"]",
        "__business_id": business_id,
        "_app": "ADS_MANAGER",
        "_index": indexType,
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
        "rule": JSON.stringify({
            "inclusions": {
                "operator": "or",
                "rules": [{
                    "event_sources": [{"type": "ig_business", "id": ig_id}],
                    "retention_seconds": (day * seconds),
                    "filter": {
                        "operator": "and",
                        "filters": [{"field": "event", "operator": "eq", "value": type}]
                    }
                }]
            }
        }),
        "suppress_http_code": "1",
        "xref": "f385a9fb4887664"
    };
    var queryString = Object.keys(body).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
    }).join('&');

    // console.log(queryString)
    fetchBody(queryString);
})
