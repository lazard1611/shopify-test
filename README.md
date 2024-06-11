## How to install project
``` git clone https://github.com/lazard1611/shopify-test.git ```  
``` git checkout -b branchName ```  
``` npm install ``` or ``` npm i ```

## Project terminal commands
Use shopify the dev command to run shopify dev server (without live reload)  
``` shopify theme dev --live-reload=off -s opklopperteststore1.myshopify.com ```  

Start gulp and webpack watcher (for building sass files to css and js files to minimized version):  
To build all css and js files use this command:  
``` npm run dev ```  
To watch for all changes in css and js files use this command:  
``` npm run watch ```  
To pull all changes that was made in customizer use shopify command:
``` shopify theme pull ```

## How we run the project for develop
We use 3 console windows (for shopify cli, npm watcher and github merges).  
These two commands is enought for comfortable work:  
1) ``` shopify theme dev --live-reload=off -s opklo.myshopify.com ```
2) ``` npm run watch ```

## What is new in structure?
### src folder
In this folder you can find ScSS style and JavaScript files.  
This is an entrypoint of all styles and scripts on project.  
It makes simmilar as Shopify structure.

### EXAMPLE-SECTION in sections folder
We have an example section to show you how we build sections in shopify.  
Inside you can find how to import css and js, build layout, schema and classes structure.  
PS: Plese use `<style>` or `<script>` tag for inline styles or scripts only if you need to put there some liquid code.  
Also you don't need to import variables to files, that included in files with already imported variables.

### application.scss
This is the main css file of all aplication.  
Here we write all classes or include some components that was used in all pages.

### fonts.scss
In this file we include all fonst of the shop.

### normalize.scss
This is the css normalizer.  
His functionality is to clean css code from default and useseless styles, also to set some new default rules.

### variables.scss
In this file we save all variables (like color or layout).  
Import this file in every section file (he knows what to take, so don't be scary about performance).
