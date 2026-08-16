Chatbox System
A web-based order tracking, customer support, and returns management application.

Features
Order Tracking: Lookup order statuses and details from structured mock order data.

Support Assistant: Interactive interface to assist users with common account and order inquiries.

Returns & Refunds: Dedicated flow for initiating and processing item returns.

Project Documentation: Project resources, team charter, and go-live deployment checklists stored centrally in the docs/ directory.

Repository Structure
Plaintext
chatbox/
├── docs/
│   ├── GROUP 3 TEAM CHARTER.pdf
│   └── go-live-readiness.md
├── frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── data/
│   │   └── orders.json
│   ├── index.html
│   ├── order-tracker.html
│   └── returns.html
└── README.md
Local Setup & Development
Clone the repository:

Bash
git clone https://github.com/Grp-3-box/chatbox.git
cd chatbox
Serve the project locally:
Because the frontend fetches relative resources and local JSON data (orders.json), use a local HTTP server rather than opening files directly via file://.

Using VS Code Live Server: Open the root folder in VS Code, right-click frontend/index.html, and select Open with Live Server.

Using Python:

Bash
python -m http.server 8000
Then open http://localhost:8000/frontend/ in your browser.

Git Workflow Guidelines
To ensure all completed work is linked to GitHub issues and tracked on project boards:

Create a feature branch off the base branch:

Bash
git checkout -b feature/your-feature-name
Commit and push your changes:

Bash
git add .
git commit -m "feat: description of changes"
git push origin feature/your-feature-name
Open a Pull Request (PR) on GitHub targeting the default branch.

Include Closes #<issue_number> in the PR description to automatically link and resolve associated issues upon merging.
