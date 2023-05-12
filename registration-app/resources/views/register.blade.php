<!DOCTYPE html>
<html>
	<head>
		<title>Registration Form</title>
		    <meta charset="utf-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1">
			    <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/footer.css') }}" />
        <link rel="stylesheet" type="text/css" href="{{ asset('css/header.css') }}" />
		    <script src="{{ asset('js/bootstrap/bootstrap.bundle.min.js') }}"></script>
		<link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap/bootstrap.min.css') }}">
		<link rel="stylesheet" type="text/css" href="{{ asset('css/index.css') }}">
	</head>

	<body>
        @include('header')
        <div class="container">
		<div id="notify"></div>
		<form id="my-form" class="my-form" method="POST" action="/">
			<div id="fullName">
				<label for="full_name">Full Name<span class="required">*</span></label>
				<input type="text" id="full_name" name="full_name" required>
			</div>

			<div id="userName">
				<label for="user_name">Username<span class="required">*</span></label>
				<input type="text" id="user_name" name="user_name" required>
			</div>


			<div id="birthDate">
				<label for="birthdate">Birthdate<span class="required">*</span></label>
				<input type="date" id="birthdate" name="birth_date" required>
				<button onclick="getActors()">Actors Born</button>
			</div>

			<div id="phoneNumber">
				<label for="phone">Phone<span class="required">*</span></label>
				<input type="tel" id="phone" name="phone" required>
			</div>
			<div id="Address">
				<label for="address">Address<span class="required">*</span></label>
				<textarea id="address" name="address" required></textarea>
			</div>
			<div id="Password">
				<label for="password">Password<span class="required">*</span></label>
				<input type="password" id="password" name="password" required>
			</div>
			<div id="Password2">
				<label for="confirm_password">Confirm Password<span class="required">*</span></label>
				<input type="password" id="confirm_password" name="confirm_password" required>
			</div>

			<!-- Checkpoint for password length -->
			<div>
				<span style="color: red;" id="password_length_check">&#x2718;</span>
				Password must be at least 8 characters long
			</div>

			<!-- Checkpoint for number literal -->
			<div>
				<span style="color: red;" id="password_number_check">&#x2718;</span>
				Password must include at least one number literal
			</div>

			<!-- Checkpoint for special character -->
			<div>
				<span style="color: red;" id="password_special_check">&#x2718;</span>
				Password must include at least one special character
			</div>

		<!-- Checkpoint for password match -->
			<div>
				<span style="color: red;" id="password_match_check">&#x2718;</span>
				Passwords match
			</div> <br>


			<div id="userImage">
				<label for="user_image">User Image<span class="required">*</span></label>
				<input type="file" accept="image/*" id="user_image" name="user_image" required>
			</div>
			<div id="Email">
				<label for="email">Email<span class="required">*</span></label>
				<input type="email" id="email" name="email" required>
			</div>
			<div id='Submit'>
				<input type="submit" id="submit" value="Submit" form="my-form">
			</div>

		</form>

	    <script src="{{ asset('js/index.js') }}"></script>
      </div>
              @include('footer')
	</body>

</html>
