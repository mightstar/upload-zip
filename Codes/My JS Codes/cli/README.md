# Command line interface code examples

## Contents

The structure description:

```
cli                       # Container for cli logic                 
├── commands
│   ├── addModule.js   
│   └── deleteModule.js    
├── helpers
│   └── util.js    
├── CommandInvoker.js   
└── config.js  
templates                 # Container for templates
├── module       
└── module_old                  
```

The structure above describes the approach of command line interface (CLI) tool to create/delete a module.

The `cli` directory contains logic to process the entered command:

**commands** - directory that contains logic of manipulating files during adding/removing ma module.

**helpers** - directory for general helper functions.

**CommandInvoker.js** - class to process a command from a terminal.

**config.js** - predefined params and constants. 

The `templates` directory contains templates to create new module.
