filebrowse
==========

A utility used to return a JSON object representation of a file system. Initially developed to display a file structure for a web application. Given a path to a directory, it will return an array of JSON objects like:

```javascript
[
  {
    "name": "base",
    "path": "/path/to/file/",
    "size": 170,
    "isDirectory": true,
    "children": [
      {
        "name": "file_1.pdf",
        "path": "/path/to/file/base",
        "size": 942249,
        "isDirectory": false
      },
      {
        "name": "file_2.png",
        "path": "/path/to/file/base",
        "size": 157925,
        "isDirectory": false
      },
      {
        "name": "deep",
        "path": "/path/to/file/base",
        "size": 272,
        "isDirectory": true,
        "children": [
          {
            "name": "Blue_Red_Specialist_Calendar_2014.pdf",
            "path": "/path/to/file/base/deep",
            "size": 113591,
            "isDirectory": false
          },
          {
            "name": "File.pdf",
            "path": "/path/to/file/base/deep",
            "size": 778432,
            "isDirectory": false
          }
        ]
      }
    ]
  }
]
```

Supports showing hidden files and filtering by regex pattern.
