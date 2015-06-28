# togetfeet
version2

<b>Installation</b><br/>
A/ Install npm <br/>
1. Go https://www.npmjs.com/   

B/ Install bower <br/>
2. Go http://bower.io/

<b>Open Chrome debug mode</b><br/>
Open Chrome,Click 'View'->'Developer'->'Developer Tools'-> Click 'Console'

<b>Troubleshoot issue</b><br/>
1. Error : 'Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.'<br/>
<b>Solution:</b><br/>
In Mac<br/>
Please close chrome before run<br/>
a. Open 'Terminal' and run <b>'open /Applications/Google\ Chrome.app --args --allow-file-access-from-files'</b>
<br/>
2. Error : Cannot load bower_component<br/>
<b>Solution:</b><br/>
a. Check the files exist<br/>
b. if not exist,install packages with bower install. Bower installs packages to bower_components/<br/>
<b>$ bower install <package></b>
