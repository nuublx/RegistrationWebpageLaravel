<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/footer.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/header.css') }}" />
    <script src="{{ asset('js/bootstrap/bootstrap.bundle.min.js') }}"></script>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap/bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/index.css') }}">
</head>

<body>
    <header id="header">
        @include('partials.header')
    </header>

    <div class="container">
        @yield('content')
    </div>

    <footer>
        @include('partials.footer')
    </footer>
</body>
</html>