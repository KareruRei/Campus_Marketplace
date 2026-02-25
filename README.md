<h1 align="center">Campus Marketplace</h1>

<p align="center">
A full-stack campus-based marketplace platform built with Laravel, PHP, MySQL, and React + Vite,
utilizing Laravel Sanctum for secure session-based authentication.
</p>

<p align="center">
<strong>Made By:</strong><br>
Marcus De Leon (Database) <br>
Japeth Gonzales (Backend) <br>
Roycee Lacuesta (Frontend)
</p>

<hr>

<h2>About The Project</h2>

<p>
Campus Marketplace is a full-stack web application designed to facilitate buying and selling 
within a campus community.
</p>

<p>
The system is composed of:
</p>

<ul>
    <li><strong>Frontend:</strong> React + Vite </li>
    <li><strong>Backend:</strong> Laravel REST API</li>
    <li><strong>Authentication:</strong> Laravel Sanctum (Session-based)</li>
    <li><strong>Database:</strong> MySQL</li>
</ul>

<hr>

<h2>Tech Stack</h2>

<ul>
    <li><strong>React + Vite</strong> (Frontend)</li>
    <li><strong>Laravel</strong> (Backend API)</li>
    <li><strong>Laravel Sanctum</strong> (Authentication)</li>
    <li><strong>MySQL</strong> (Database)</li>
    <li><strong>Axios</strong> (HTTP Requests)</li>
    <li><strong>Composer & NPM</strong> (Dependency Management)</li>
</ul>

<hr>

<h2>Features</h2>

<ul>
    <li>Secure Session-based Authentication</li>
    <li>CSRF Protection via Sanctum</li>
    <li>Product CRUD Operations</li>
    <li>Search and Category Filtering</li>
    <li>User Dashboard</li>
    <li>Image Upload & Storage</li>
</ul>

<hr>

<h2>System Architecture</h2>



<h3>Architecture Flow</h3>
<ol>
    <li>React frontend requests CSRF cookie from <code>/sanctum/csrf-cookie</code>.</li>
    <li>User submits credentials via frontend form.</li>
    <li>Laravel validates credentials and creates session.</li>
    <li>Sanctum authenticates future API requests via session cookie.</li>
    <li>Laravel returns JSON responses.</li>
    <li>React dynamically renders UI based on API response.</li>
</ol>

<hr>

<h2>Frontend Architecture (React + Vite)</h2>

<p>
The frontend is built using React and Vite.
It communicates with the Laravel backend via Axios HTTP requests.
</p>

<h3>Frontend Responsibilities</h3>
<ul>
    <li>Rendering product listings</li>
    <li>Handling authentication forms (Login/Register)</li>
    <li>Managing client-side routing</li>
    <li>Sending API requests with credentials</li>
    <li>Displaying real-time UI updates</li>
</ul>

<h3>Frontend to Backend Communication</h3>
<ul>
    <li>Uses Axios with <code>withCredentials: true</code></li>
    <li>CSRF token initialized before login</li>
    <li>Session cookie stored in browser</li>
</ul>

<hr>

<h2>Entity Relationship Diagram (ERD)</h2>



<p>
<a href="docs/ERD-CampusMarketplace.pdf" download>
<strong>Download ERD</strong>
</a>
</p>

<h3>Core Database Tables</h3>
<ul>
    <li><strong>users</strong></li>
    <li><strong>listings</strong></li>
    <li><strong>categories</strong></li>
</ul>

<hr>

<h2>Installation Guide</h2>

<h3>1. Clone Repository</h3>

<pre>
git clone https://github.com/KareruRei/Campus_Marketplace.git
cd Campus_Marketplace
</pre>

<hr>

<h3>2. Backend Setup (Laravel)</h3>

<pre>
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
</pre>

<hr>

<h3>3. Frontend Setup (React + Vite)</h3>

<pre>
cd frontend
npm install
npm run dev
</pre>

<p>
Default Vite server runs at:
</p>

<pre>
http://localhost:5173
</pre>

<hr>

<h2>User Manual</h2>

<h3>Account Management</h3>
<ol>
    <li>Register an account via the frontend registration page.</li>
    <li>Login to establish a secure session.</li>
</ol>

<h3>Browsing Products</h3>
<ol>
    <li>Homepage displays active listings.</li>
    <li>Use search and filters to refine results.</li>
</ol>

<h3>Creating a Listing</h3>
<ol>
    <li>Login required.</li>
    <li>Navigate to Create Listing page.</li>
    <li>Fill in product details and upload image.</li>
    <li>Submit to publish listing.</li>
</ol>

<hr>

<h2>API Documentation</h2>

<h3>Sanctum Authentication</h3>

<table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
<tr>
<th>Method</th>
<th>Endpoint</th>
<th>Description</th>
</tr>
<tr>
<td>GET</td>
<td>/sanctum/csrf-cookie</td>
<td>Initialize CSRF protection</td>
</tr>
<tr>
<td>POST</td>
<td>/api/login</td>
<td>Authenticate user</td>
</tr>
<tr>
<td>GET</td>
<td>/api/user</td>
<td>Get authenticated user</td>
</tr>
<tr>
<td>POST</td>
<td>/api/logout</td>
<td>Logout user</td>
</tr>
</table>

<br>

<h3>Product Management</h3>

<table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
<tr>
<th>Method</th>
<th>Endpoint</th>
<th>Description</th>
</tr>
<tr>
<td>GET</td>
<td>/api/products</td>
<td>Fetch all listings</td>
</tr>
<tr>
<td>POST</td>
<td>/api/products</td>
<td>Create listing (Protected)</td>
</tr>
<tr>
<td>DELETE</td>
<td>/api/products/{id}</td>
<td>Delete listing (Protected)</td>
</tr>
</table>
