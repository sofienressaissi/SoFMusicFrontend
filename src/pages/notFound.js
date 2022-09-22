import React from 'react';
import Favicon from 'react-favicon';

export default function NotFound() {
    return(
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Not Found</title>
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900%7CMontserrat:400,500,700" 
    rel="stylesheet" type="text/css"/>
    <link href="assets/css/lib/bootstrap.min.css" rel="stylesheet"/>
    <link href="assets/css/plugins/flaticon.css" rel="stylesheet"/>
    <link href="assets/css/style.css" rel="stylesheet"/>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <script async src="assets/js/lib/modernizr-min.js"></script>
</head>

<body>
<Favicon url='https://sofmusic-backend.herokuapp.com/uploads/logoIcon.png'/>
    <section className="page-not-found">
        <div className="content404">
            <h2 className="section-title" style={{fontFamily: 'Mistral'}}>SoF</h2>
            <p className="lead">Oops! This page does not exist 🙁</p>
            <p> <a href="/" className="btn btn-not-found btn-sm">Back to Homepage</a> </p>
        </div>
    </section>
    <script src="assets/js/lib/jquery-1.12.0.min.js"></script>
    <script src="assets/js/lib/bootstrap.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
    );
}