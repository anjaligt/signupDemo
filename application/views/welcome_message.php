<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <!-- CSS -->
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootswatch/3.1.1/darkly/bootstrap.min.css">
    <link rel="stylesheet" href="http://localhost/codeigniter3-rest-api/assets/css/style.css">

    <!-- JS -->
    <!-- load angular, nganimate, and ui-router -->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-animate.min.js"></script>
    <script src="http://localhost/codeigniter3-rest-api/assets/app/app.js"></script>

</head>

<!-- apply our angular app -->
<body ng-app="formApp">

    <div class="container">

        <!-- views will be injected here -->
        <div ui-view></div>

    </div>

</body>
</html>