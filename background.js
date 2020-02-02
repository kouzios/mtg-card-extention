var rule2 = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'scryfall.com'}
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'tappedout.net'}
      }),
    ],
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
};


chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([rule2]);
    });
});