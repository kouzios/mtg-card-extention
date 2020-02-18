
window.onload = function() {
    let cards = document.getElementById('cards');
    let clear = document.getElementById('clear');
    let copy = document.getElementById('copy');

    copy.addEventListener('click', copyField);
    clear.addEventListener('click', clearField);

    function copyField() {
        cards.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }

    function clearField() {
        chrome.storage.sync.set({cards: ''});
        cards.value = ''
    }
    
    chrome.storage.sync.get('cards', function(data) {
        cards.value = data.cards;
    });
};

