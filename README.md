# Receptukas 🍲

**Receptukas** is a simple recipe management app that lets users browse, save, and manage their favorite recipes. Built
with Laravel, React, and Tailwind CSS, it offers a fast and modern experience.

---

## Features

- User authentication (login, registration, profile)
- Browse and save recipes
- Dashboard with recent activity and stats
- Mobile-friendly with dark mode support

---

## Tech Stack

- **Backend**: Laravel 11.x
- **Frontend**: React + Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL (or PostgreSQL)

---

## Installation

1. Clone the repo and enter the project directory:
   ```bash
   git clone https://github.com/your-username/receptukas.git
   cd receptukas

2. Install .sail
   ```bash
    cp .env.sail .env

    composer install
    
    ./vendor/bin/sail up -d
    
    ./vendor/bin/sail composer install
    
    ./vendor/bin/sail artisan migrate
    
    # if you want to end your work session, stop containers
    ./vendor/bin/sail down

5. Create storage link for public images
   ```bash
    ./vendor/bin/sail artisan storage:link

4. Run FE
   ```bash
    #install
    npm install
    
    #development
    npm run dev
    
    #production
    npm run prod

5. Seed db
   ```bash
    ./vendor/bin/sail php artisan db:seed
   
    #in case of need to reset database
    ./vendor/bin/sail php artisan migrate:fresh --seed

6. Test user
    ```bash
    email: johndoe@example.com
    password: secret
