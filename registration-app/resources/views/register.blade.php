@extends('layouts.app')
@section('Registration Form', 'Register')

@section('content')
    <div id="notify"></div>
    <form id="my-form" class="my-form" method="POST" action="/">
        <div id="fullName">
            <label for="full_name">{{__('msg.full_name')}}<span class="required">*</span></label>
            <input type="text" id="full_name" name="full_name" required>
        </div>

        <div id="userName">
            <label for="user_name">{{__('msg.user_name')}}<span class="required">*</span></label>
            <input type="text" id="user_name" name="user_name" required>
        </div>


        <div id="birthDate">
            <label for="birthdate">{{__('msg.birth_date')}}<span class="required">*</span></label>
            <input type="date" id="birthdate" name="birth_date" required>
            <button type="button" onclick="getActors()">Actors Born</button>
        </div>

        <div id="phoneNumber">
            <label for="phone">{{__('msg.phone')}}<span class="required">*</span></label>
            <input type="tel" id="phone" name="phone" required>
        </div>
        <div id="Address">
            <label for="address">{{__('msg.address')}}<span class="required">*</span></label>
            <textarea id="address" name="address" required></textarea>
        </div>
        <div id="Password">
            <label for="password">{{__('msg.password')}}<span class="required">*</span></label>
            <input type="password" id="password" name="password" required>
        </div>
        <div id="Password2">
            <label for="confirm_password">{{__('msg.confirm_password')}}<span class="required">*</span></label>
            <input type="password" id="confirm_password" name="confirm_password" required>
        </div>

        <!-- Checkpoint for password length -->
        <div>
            <span style="color: red;" id="password_length_check">&#x2718;</span>
            {{__('msg.password_length')}}
        </div>

        <!-- Checkpoint for number literal -->
        <div>
            <span style="color: red;" id="password_number_check">&#x2718;</span>
            {{__('msg.password_number')}}
        </div>

        <!-- Checkpoint for special character -->
        <div>
            <span style="color: red;" id="password_special_check">&#x2718;</span>
            {{__('msg.password_special')}}
        </div>

    <!-- Checkpoint for password match -->
        <div>
            <span style="color: red;" id="password_match_check">&#x2718;</span>
            {{__('msg.password_match')}}
        </div> <br>


        <div id="userImage">
            <label for="user_image">{{__('msg.user_image')}}<span class="required">*</span></label>
            <input type="file" accept="image/*" id="user_image" name="user_image" required>
        </div>
        <div id="Email">
            <label for="email">{{__('msg.email')}}<span class="required">*</span></label>
            <input type="email" id="email" name="email" required>
        </div>
        <div id='Submit'>
            <input type="submit" id="submit" value="{{__('msg.submit')}}" form="my-form">
        </div>

    </form>

    <script src="{{ asset('js/index.js') }}"></script>
@endsection
