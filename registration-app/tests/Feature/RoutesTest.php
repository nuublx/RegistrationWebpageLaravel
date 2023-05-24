<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoutesTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_redirects_to_correct_path(): void
    {
        $response = $this->get('/');

        $response->assertStatus(302);
    }
    public function test_the_application_main_path(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }
}