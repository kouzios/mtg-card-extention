/* Start setup rules */
var conditions = [
    new chrome.declarativeContent.PageStateMatcher({
      css: ["html"]
    })
];

var rule2 = {
    conditions: conditions,
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
};


chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({cards: ''});

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([rule2]);
    });

    chrome.contextMenus.create({id: "copy", title: "Copy", contexts:["selection"]});

    chrome.contextMenus.onClicked.addListener(copySelection)
});

/* End setup rules */

/* Start functions */
copySelection = function(info) {
    chrome.storage.sync.get('cards', function(data) {
        if(data.cards == undefined || data.cards == null) {
            chrome.storage.sync.set({cards: ''});
            return;
        }

        if(data.cards == undefined || data.cards == null || info.selectionText == undefined ||
             info.selectionText == null || info.selectionText == '') {
            return;
        }

        var card = parseText(info.selectionText)
        if(exist(card, data.cards)) {
            return;
        }

        var newline = '\n'
        if(data.cards == '') {
            newline = ''
        }

        var newdata = data.cards.concat(newline + card)
        chrome.storage.sync.set({cards: newdata});
    })
}


/**
 * Parse out any unintended mana cost symbols from the card name
 */
function parseText(card) {
    var manaLess = card.split("{")[0]
    return manaLess.split("/")[0]
}

/**
 * Checks if the card already exists in the saved cards to prevent duplicity
 * 
 * @param {Boolean} card 
 */
function exist(card, saved) {
    return saved.includes(card);
}

/* End context menus */