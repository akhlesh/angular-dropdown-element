(function () {
    var items = Array.from({ length: 50 }, (e, i) => ({ id: i, name: 'test name ' + i }));
    const el = document.querySelector('ng-dropdown-element');
    el.items = items;

    el.addEventListener('valueChange', (e) => updatePreTag(e.detail));

    el.itemRenderer = (i) => `<span class="${i.id % 2 === 0 ? 'green-item' : 'red-item'}">${i.name}</span>`

    btn.addEventListener('click', () => {
        console.log('button click');
        el.value = items[5];
        updatePreTag(el.value);
    });

    function updatePreTag(value) {
        selectedVal.textContent = JSON.stringify(value, null, 2);
    }
})();