
window.onload = function() {
    let cards = document.getElementById('cards');
    let clear = document.getElementById('clear');

    cards.addEventListener('click', copy);
    cards.addEventListener('change', change);

    clear.addEventListener('click', clearField);

    function copy() {
        cards.select();
        document.execCommand('copy');
    }

    function change() {
        chrome.storage.sync.set({cards: cards.value}, null);
    }

    function clearField() {
        chrome.storage.sync.set({cards: ''}, function() {
            cards.value = '';
            cards.setAttribute('value', '');
        });
    }
    
    chrome.storage.sync.get('cards', function(data) {
        cards.value = data.cards;
        cards.setAttribute('value', data.cards);
    });
};

