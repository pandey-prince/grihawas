Grihawas Website

Responsive property website for Grihawas Aawas Yojna, Govind Puram Extension, NH-24, Ghaziabad.

The project uses a static HTML/CSS/JavaScript frontend with a separate Node.js/Express backend for application submissions and MongoDB for storing applicant data.

Run locally

1. Run the frontend

The frontend has no build step.

From the project root:

npx serve .

Then open the URL provided by serve.

Do not open index.html directly with file:// when testing form submission. Use a local HTTP server.

2. Run the backend

The backend is located in the backend/ directory.

Open a second terminal:

cd backend
npm install
node server.js

The backend should run at:

http://localhost:5000

You should see:

Backend running on http://localhost:5000
MongoDB connected successfully

Project structure

Grihawas/
│
├── index.html
├── about.html
├── project.html
├── price-list.html
├── floor-plans.html
├── amenities.html
├── location.html
├── gallery.html
├── contact.html
├── apply-now.html
├── results.html
│
├── assets/
│ ├── css/
│ │ └── style.css
│ │
│ ├── js/
│ │ ├── config.js
│ │ ├── components.js
│ │ └── main.js
│ │
│ ├── images/
│ └── documents/
│
├── gallery/
│
└── backend/
├── server.js
├── .env
├── package.json
├── package-lock.json
│
└── models/
└── Application.js

Frontend

index.html — landing page

about.html — project/about information

project.html — project details

price-list.html — pricing information

floor-plans.html — floor plans

amenities.html — amenities

location.html — location information

gallery.html — project gallery

contact.html — contact page

apply-now.html — five-step application form

results.html — application status page

assets/css/style.css — shared responsive design system

assets/js/config.js — shared public contact and project information

assets/js/components.js — shared header, footer and floating actions

assets/js/main.js — navigation, validation, forms, tabs, gallery, lightbox and Apply Now wizard interactions

assets/images/ and gallery/ — local project imagery

Backend

The backend is a separate Node.js application located in backend/.

Technologies

Node.js

Express

MongoDB

Mongoose

CORS

dotenv

Backend files

backend/server.js — Express server and API routes

backend/models/Application.js — MongoDB/Mongoose application schema

backend/.env — private MongoDB connection string and server configuration

backend/package.json — backend dependencies and scripts

Application form

The apply-now.html page contains a five-step application form:

Personal Information

Property Selection

Configuration

Additional Information

Confirmation

The form collects:

Full name

Phone number

Email

Preferred property/tower

Preferred site visit date

Configuration

Approximate budget

Additional message

The frontend validates the required fields before submitting.

After validation, assets/js/main.js sends the application to:

POST /api/applications

When running locally, the frontend sends the request to:

http://localhost:5000/api/applications

The backend validates the request and stores the application in MongoDB.

A successful response displays an application-received message on the website. If the backend or database is unavailable, the frontend displays an error instead of falsely reporting a successful submission.

MongoDB configuration

Create a MongoDB database, for example using MongoDB Atlas.

Inside:

backend/.env

add:

MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/grihawas
PORT=5000

Replace the MongoDB username, password and cluster with your actual values.

Never commit .env to Git.

The backend should include .env in its .gitignore:

node_modules/
.env

API

Submit an application

POST /api/applications
Content-Type: application/json

Request body:

{
"fullName": "Rahul Sharma",
"phone": "9876543210",
"email": "rahul@example.com",
"property": "Tower A",
"visitDate": "2026-09-25",
"configuration": "T1 Residential Plan",
"budget": "₹80 Lakh – ₹1.2 Crore",
"message": "Interested in a site visit."
}

Successful response:

{
"success": true,
"message": "Application submitted successfully.",
"applicationId": "..."
}

Enquiry forms

The website also contains separate enquiry/lead forms using data-lead-form.

Those forms use the public FORM_ENDPOINT configuration in:

assets/js/config.js

If FORM_ENDPOINT is not configured, the enquiry form does not claim that a submission was saved. It displays the published contact information instead.

Do not put MongoDB credentials, API keys, CRM secrets or other private credentials in frontend files.

Application status

The Results page currently provides a verified-support fallback rather than a database-backed public status lookup.

Do not expose private applicant records or MongoDB data directly to the browser.

If a public application-status feature is added later, it should use an authenticated or securely generated reference mechanism rather than exposing MongoDB document IDs or personal information.

Content maintenance

Public project facts and contact details are centralized in:

assets/js/config.js

Confirm changing prices, availability, approvals, eligibility and timelines against current official records before publishing updates.

The assets/documents/ directory contains legacy, unpublished document files retained for review. No page links to them. Publish only verified official documents.

Security

Never commit .env.

Never put MongoDB credentials in frontend JavaScript.

Never expose the MongoDB connection string to the browser.

Validate submitted data on the backend even when frontend validation exists.

Do not trust values submitted by the frontend.

Keep database access inside the backend.

Do not expose unrestricted database queries through public API endpoints.

Enable HTTPS in production.

Restrict CORS appropriately before production deployment.

Add authentication/authorization before creating private admin APIs.

Production deployment

The frontend can remain on a static hosting provider.

The backend must be deployed separately to a server/container platform that supports Node.js.

Production architecture:

Visitor
│
▼
Static Frontend
HTML / CSS / JavaScript
│
│ POST /api/applications
▼
Node.js + Express Backend
│
│ Mongoose
▼
MongoDB

Before deploying:

Set the production MongoDB connection string as an environment variable.

Do not upload .env.

Change the frontend API URL from http://localhost:5000 to the production backend URL.

Configure CORS for the production frontend domain.

Enable HTTPS.

Test successful and failed form submissions.

Verify that applications are actually stored in MongoDB.

Confirm that no private credentials appear in browser developer tools or frontend source files.

Static deployment

Upload the frontend project while preserving the current folder structure.

Enable HTTPS and submit:

sitemap.xml

to the relevant search-console account.

Canonical URLs currently use:

https://grihawas.com/

Important

This project now has two separate concerns:

Frontend
HTML + CSS + JavaScript
│
▼
Backend
Node.js + Express
│
▼
Database
MongoDB

The frontend should never connect directly to MongoDB. All database operations must go through the backend API.
