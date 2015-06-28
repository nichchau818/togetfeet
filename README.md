# togetfeet
version2

Installation
A/ Install npm
1. Go https://www.npmjs.com/   

B/ Install bower
2. Go http://bower.io/


Open Chrome,Click 'View'->'Developer'->'Developer Tools'-> Click 'Console'

Troubleshoot issue
1. Error : 'Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.'

Solution: 
In Mac
Please close chrome before run
a. Open terminal and run 'open /Applications/Google\ Chrome.app --args --allow-file-access-from-files'

2. Error : Cannot load bower_component
Solution:
a. Check the files exist
b. if not exist,install packages with bower install. Bower installs packages to bower_components/
$ bower install <package>
