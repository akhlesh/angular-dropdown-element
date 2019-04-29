(function () {
    var items = Array.from({ length: 50 }, (e, i) => ({ name: 'test name' + i }));
    const el = document.querySelector('ng-dropdown-element');
    el.items = items;

    el.addEventListener('valueChange', (e) => updatePreTag(e.detail));

    btn.addEventListener('click', () => {
        console.log('button click');
        el.value = items[5];
        updatePreTag(el.value);
    });

    function updatePreTag(value) {
        selectedVal.textContent = JSON.stringify(value, null, 2);
    }
})();