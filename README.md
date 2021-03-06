# RBTools package

This package allows creating a custom toolbar with buttons to execute atom commands or nodejs code.

## Current support

### Icon types

- `atomIcon` uses Atom's icons in `Styleguide` (accessible using `Ctrl`+`Shift`+`g`)
- `url` downloads the icon image file from the URL provided. Notice that the icon will be downloaded every time the toolbar is loaded/reloaded

### Action types

- `atomCommand` allows the use of commands introduced on Atom's command window (accessible using `Ctrl`+`Shift`+`p`)
- `nodeCommand` allow to introduce a raw nodejs code to be executed. Currently, the `child_process` module is auto included before the value into `Action` parameter in the menu model JSON file

### Parameters

- `$currentFile` returns the filepath of the file in the currect active text editor
- `$currentFolder` return the folder where the file in the current active text editor

`Parameters` must be included into an array form where the index of the value will use a base-1 increment. `$0` is not supported, yet.

## Example of configuration for package settings

- `Current Menu`: `Basic Menu` (this corresponds to the example provided below)
- `Menu Model`: `C:\globals\atom\RBTools\menuModel.json` location of the file containing the menu model containing the `Current Menu`

## Example

```
{
    "Basic Menu": {
        "Buttons": [
            {
                "Name"      : "Reload window",
                "Type"      : "button",
                "Tooltip"   : "Reload Window",
                "IconType"  : "atomIcon",
                "Icon"      : "sync",
                "ActionType": "atomCommand",
                "Action"    : "window:reload",
                "Params"    : []
            },
            {
                "Name"      : "Open with notepad++",
                "Type"      : "button",
                "Tooltip"   : "Open with notepad++",
                "IconType"  : "atomIcon",
                "Icon"      : "file",
                "ActionType": "nodeCommand",
                "Action"    : "child_process.execFile('C:\\Program Files\\Notepad++\\notepad++.exe', [\"$1\"]);",
                "Params"    : ["$currentFile"]
            },
            {
                "Name"      : "open (CMD) terminal here",
                "Type"      : "button",
                "Tooltip"   : "open (CMD) terminal here",
                "IconType"  : "atomIcon",
                "Icon"      : "browser",
                "ActionType": "nodeCommand",
                "Action"    : "child_process.execFile('cmd', ['/C', 'start', '/d', '$1', 'cmd.exe'])",
                "Params"    : ["$currentFolder"]
            },
            {
                "Name"      : "open (PowerShell) terminal here",
                "Type"      : "button",
                "Tooltip"   : "open (PowerShell) terminal here",
                "IconType"  : "atomIcon",
                "Icon"      : "terminal",
                "ActionType": "nodeCommand",
                "Action"    : "child_process.execFile('cmd', ['/C', 'start', '/d', '$1', 'powershell.exe', '-WindowStyle', 'Maximized'])",
                "Params"    : ["$currentFolder"]
            },
            {
                "Name"      : "open Git Bash here",
                "Type"      : "button",
                "Tooltip"   : "open Git Bash here",
                "IconType"  : "url",
                "Icon"      : "https://cdn.iconscout.com/icon/free/png-512/git-14-599158.png",
                "ActionType": "nodeCommand",
                "Action"    : "child_process.execFile('C:\\Program Files\\Git\\git-bash.exe', ['--cd=$1'])",
                "Params"    : ["$currentFolder"]
            }
        ]
    }
}

```

## Preview

![simple screenshot](https://github.com/LeonMike/RBTools/blob/master/simple%20preview.png?raw=true)
