/**
 * @author: João Matos
 *
 * This is a JSON-based web service written in javascript for a google sheet of student organizations. It is meant to be used with Modo labs Xmodule,
 which uses the web app's URL as a data source. This web service declares how its data should be displayed in Xmodule, using its UI elements 
 that are built into the Modo platform.
 * 
 * The required sequence of API requests/responses for foreground POST:
   * Step 1: GET, returns JSON with all input elements.
   * Step 2: POST, returns redirect link after processing user submission.
   * Step 3: GET, returns updated JSON based on user submission.
*/
var JSON_RESPONSE = {
    "metadata": {
        "version": "1"
    },
    "content": [{
        "elementType": "form",
        "heading": "<span style=\"color:white;\">Search</span>",

        "items": [{
                "elementType": "input",
                "inputType": "text",
                "name": "search",
                "label": "",
                "required": false
            },
            {
                "elementType": "buttonContainer",
                "buttons": [{
                        "elementType": "formButton",
                        "title": "search",
                        "buttonType": "submit",
                        "actionType": "constructive"
                    },
                    {
                        "elementType": "linkButton",
                        "title": "clear",
                        "link": {
                            "external": "https://roosevelt-test.modolabs.net/freshmen_sophomores_juniors_and_seniors/student_organizations/",
                            "targetNewWindow": false
                        },
                        "actionType": "emphasized"
                    }
                ]
            }
        ]
    }]
};

var cache = CacheService.getScriptCache();

var checkCache = cache.get("status");

// 2d array holds data broken-up into batches 
// Used as a workaround for cacheService size limit
var batches = [
    []
];

/**
 * Gets main page or search result.
 * @Returns String
 */
function doGet(e) {
    if (e.parameter.search) {
        return search(e.parameter.search);
    }
    return loadJSON_RESPONSE();
}

/**
 * Provides redirect to meet foreground post requirement.
 * @Returns String
 */
function doPost(e) {
    var postRelativeJSON = {
        "metadata": {
            "version": "1",
            "redirectLink": {
                "relativePath": "?search=" + e.parameters["search"][0].replace(/\s/g, '_')
            }
        }
    };
    var stringifiedJSON = JSON.stringify(postRelativeJSON, null, 2);
    return ContentService.createTextOutput(stringifiedJSON).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Loads JSON_RESPONSE["content"] with content
 * @Returns String
 */
function loadJSON_RESPONSE() {
    var content = [];
    if (checkCache != null) {
        for (var i = 0; i < checkCache; ++i) {
            content = [].concat.apply(content, JSON.parse(cache.get(i.toString())));
        }
    } else {
        // Gather content for JSON_RESPONSE and cache it
        var sheet = SpreadsheetApp.getActiveSheet();
        dataFrame = sheet.getDataRange().getValues();
        for (var i = 1; i < dataFrame.length; ++i) {
            createListElems(dataFrame[i][0], dataFrame[i][1],
                dataFrame[i][2], dataFrame[i][3],
                dataFrame[i][4], dataFrame[i][5]);
        }
        cacheJSON_RESPONSE();
        // Flatten matrix
        content = [].concat.apply([], batches);
    }

    JSON_RESPONSE["content"] = content;
    var stringifiedJSON = JSON.stringify(JSON_RESPONSE, null, 2);
    return ContentService.createTextOutput(stringifiedJSON).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Caches JSON_RESPONSE
 */
function cacheJSON_RESPONSE() {
    batches.unshift(JSON_RESPONSE["content"]);

    var batcheLength = batches.length;
    cache.put("status", JSON.stringify(batcheLength), 21600);

    for (var i = 0; i < batcheLength; i++) {
        cache.put(i.toString(), JSON.stringify(batches[i]), 21600);
    }
}

/**
 * Handles search  
 * @Returns String
 */
function search(query) {
    query = query.toLowerCase().replace(/_/g, " ");
    try {
        for (var i = 0; i < checkCache; ++i) {
            var singleBatch = JSON.parse(cache.get(i.toString()));
            for (var j = 0; j < singleBatch.length - 2; j += 2) {
                var title = singleBatch[j]['items'][0]["title"].toLowerCase();
                var summary = singleBatch[j]['items'][0]["description"].toLowerCase();
                var fullDescription = singleBatch[j + 1]['content'][0]["items"][0]["description"].toLowerCase();
                title = title.replace(/<span style=\"color:green;\"><b>/g, "").replace(/<\/b><\/span>/g, "");
                if ((title.indexOf(query) >= 0) || (summary.indexOf(query) >= 0) || (fullDescription.indexOf(query) >= 0)) {
                    JSON_RESPONSE["content"].push(singleBatch[j], singleBatch[j + 1]);
                }
            }
        }
    } catch (error) {
        console.log("Error: ", error.message);
        return ContentService.createTextOutput("Oops! Something wrong happened, try refreshing your page.");
    }
    // When no result is found
    if (JSON_RESPONSE["content"].length < 2) {
        JSON_RESPONSE["content"].push({
            "elementType": "detail",
            "title": "<div style=\"color:blue;\">There are no results for</div>",
            "subtitle": query,
            "thumbnail": {
                "url": "https://cdn.shopify.com/s/files/1/1061/1924/products/Nerd_with_Glasses_Emoji_2a8485bc-f136-4156-9af6-297d8522d8d1_large.png?v=1483276509"
            },
            "body": "<div style=\"color:red;\">Check your spelling or try different keywords</div>",
            "content": []
        });
    }

    var stringifiedJSON = JSON.stringify(JSON_RESPONSE, null, 2);
    return ContentService.createTextOutput(stringifiedJSON).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Creates individual list elements for each organization.
 */
function createListElems(title, text, chairname, chairmail, advisorname, advisormail) {
    var description = '';
    var summary = '';

    // Parse from text a summary
    for (var i = 0; i < text.length; ++i) {
        description = description + text[i];
        if ((description.slice(-1)[0] == ".") && (summary.slice(-1)[0] != ".")) {
            summary = description;
            description = '';
            i = i + 1;
        }
    }

    // Check individual batch size
    if (batches.slice(-1)[0].length > 40) {
        batches.push([]);
    }
    // Push list elems into individual batch 
    batches.slice(-1)[0].push({
        "elementType": "list",
        "grouped": true,
        "items": [{
            "title": "<span style=\"color:green;\"><b>" + title + "</b></span>",
            "description": summary,
        }]
    }, {
        "elementType": "collapsible",
        "title": "<span style=\"display: block; margin-top:-1rem !important;margin-right: -1.82em;border-radius:0px 0px 5px 5px;color:#008800; background-color: #f6f6f6; border:none !important; padding:0.7em 2.4em 0.7em 0.7em\"><u>Read more about " + title + "</u></span>",
        "collapsed": true,
        "content": [{
                "elementType": "list",
                "grouped": true,
                "items": [{
                    "description": description
                }]
            },
            {
                "elementType": "html",
                "focal": true,
                "html": "<div style = \" text-align: center;\" ><p><span style=\"color:green;\"> <b>Chairperson</b><br></span><b>" + chairname + "</b><br><a href=\"mailto:" + chairmail + "\"><span style=\"color:green;\"><u>" + chairmail + "</u></span></a></p><p><span style=\"color:green;\"><b>Advisor Name</b><br></span><b>" + advisorname + "</b><br><a href=\"mailto:" + advisormail + "\"><span style=\"color:green;\"><u>" + advisormail + "</u></span></a></p></div>"
            }
        ]
    });
}