# angular-dropdown-element
AngularElement dropdown - a web component for dropdown


## Installation

```bash
$ npm install angular-elements-dropdown bootstrap
```

## Usage

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularElementsDropdown</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
  <div class="content">
    <ng-dropdown-element label="name"></ng-dropdown-element>
  </div>
  <script src="node_module/ng-dropdown-element/ng-dropdown-element.js"></script>
  <script>
    var items = Array.from({ length: 50 }, (e, i) => ({ name: 'test name ' + i }));
    const el = document.querySelector('ng-dropdown-element');
    el.items = items;

    el.addEventListener('valueChange', (e) => console.log(e.detail));
  </script>
</body>

</html>
```

## Dropdown input/outputs

| Input/Output | Description |
| --- | --- |
| items | array :-list of items |
| value | any:- Dropdown value |
| label | string or function:- used to get label value |
| placeholder | string :- placeholder value. Default: 'Please select an item' |  
| valueChange | function:- gets called when value is change |

