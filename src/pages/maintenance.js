import React from 'react';

export default function Maintenance() {
    return (
        
        <html>
            <head>
                <title>SoF Music - Coming Back Soon</title>
            </head>
            <style>
    {<>
        {`\
      .center {\
        position: absolute;\
    top: 50%;\
    left: 50%;\
    margin-left: -190px;\
    margin-top: -75px;\
      }\
      `}</>
      }
    </style>
            <body style={{'backgroundColor': 'black', 'height': '100vh', 'minHeight': '100vh'}}>
                <div align="center" className='center'>
                    <h1 style={{'color': 'white'}}>
                        Website Coming Back Soon
                    </h1>
                    <h3 style={{'color': 'white'}}>
                        We are making updates on the website.
                    </h3>
                </div>
            </body>
        </html>
    );
}