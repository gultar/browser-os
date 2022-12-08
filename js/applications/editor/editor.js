const launchEditor = (content, filename) =>{
    const editorDOM = `<title>ACE in Action</title>
    <style type="text/css" media="screen">
        #editor { 
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    </style>
    </head>
    <body>
    
    <div id="editor">${content}</div>
        
    <script src="../editor/ace.js" type="text/javascript" charset="utf-8"></script>
    <script>
        
    </script>
    </body>
    </html>`

    new WinBox({ 
        title: "", 
        height:"95%", 
        width:"80%", 
        html:editorDOM,
        oncreate:()=>{
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/monokai");
            editor.session.setMode("ace/mode/javascript");
            editor.commands.addCommand({
                name: 'save',
                bindKey: {win: 'Ctrl-S',  mac: 'Command-M'},
                exec: async function(editor) {
                    const filecontent = editor.getValue()
                    const edited = await exec("editFile", [filename, filecontent])
                },
            });
        }
    });
}