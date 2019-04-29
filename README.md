# angular-dropdown-element
[AngularElement](https://angular.io/guide/elements) dropdown 

## Demo
* Javascript - https://jsfiddle.net/Akhlesh/0jmdrzvh/6/
* React - https://jsfiddle.net/Akhlesh/fvswda9L/5/


## Installation

```bash
$ npm install angular-dropdown-element bootstrap
```

## Usage

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular Dropdown Element</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body>
  <div class="container">
    <ng-dropdown-element label="name"></ng-dropdown-element>
  </div>
  <script src="node_modules/ng-dropdown-element/index.js"></script>
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
| valueChange | function:- gets called on value change. |

