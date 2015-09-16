# Silent Circle - Take the Test


## Setup

```bash
> npm install
> bower install
```
See ```package.json``` and ```bower.json```


## Build + watch + local server

```bash
> grunt
```


## Update content
Content is stored in a single JSON file: ```/src/data/data.json```

This JSON file is automatically generated from 2 sources:
- a Google Spreadsheet, that contains the Test data: https://docs.google.com/spreadsheets/d/1oApMvBX6k8ijToreNOj0HFnHlhL7W6_y7k1d5jjSK7s/pubhtml?gid=0&single=true
- another static JSON file, that contains copy and texts for UI elements: ```/src/data/lang.json```

To generate an updated JSON file:
- load the page at ```http://localhost:8089/build/import-data/``` (this page will import the data and merge the two sources into a single file)
- click on the link to download the new JSON
- overwrite the old file in ```/src/data/data.json```
- make sure to run the Grunt task to build


A local server should run on ```http://localhost:8080```
See ```Gruntfile.js```


## Check paths

If necessary, open ```Gruntfile.js``` and fix the file paths in the ```replace``` task.


## @TODO


- Google Analytics (???)

