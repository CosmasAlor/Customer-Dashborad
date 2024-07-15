# Customer Transaction Dashboard

## Overview

The **Customer Transaction Dashboard** is a web application designed to provide a comprehensive view of customer transactions. It allows users to filter and visualize transaction data by customer and amount. This dashboard uses Bootstrap for styling and Chart.js for visualizing transaction trends.

## Features

- **Customer Filtering**: Search and filter transactions by customer name.
- **Amount Filtering**: Filter transactions by minimum amount.
- **Transaction Table**: Displays aggregated transaction data.
- **Transaction Chart**: Visualizes transaction amounts over time for a selected customer.
- **Responsive Design**: Designed to be mobile-friendly with Bootstrap.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed for running a local server if needed.
- **Local Server**: This application fetches data from a local server. Ensure you have a server running on `http://localhost:3001` with appropriate endpoints.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/customer-transaction-dashboard.git
2. **Navigate to Project Directory
   ```bash
   cd customer-transaction-dashboard
3. Install Dependencies:
   ```bash
   npm install
4. Start the Local Server:
If you have a local server setup for fetching data, ensure it is running on http://localhost:3001. If not, you can use a mock server or adjust the fetch URLs in app.js to point to your data source.

5. Open the Application:
Open index.html in your web browser.

**Usage
Filter by Customer: Enter a customer's name in the "Filter by name" input field to see transactions related to that customer.

Filter by Amount: Enter a minimum transaction amount in the "Filter by amount" input field to filter transactions by amount.

View Transactions: Click on a row in the table to see a detailed chart of transaction amounts over time for the selected customer.

**Technologies Used
HTML: For the basic structure of the application.
CSS: Custom styles along with Bootstrap for responsive design.
JavaScript: For data fetching, manipulation, and dynamic updates.
Chart.js: For creating interactive charts.
Bootstrap: For styling and responsive layout.
Live Demo
You can view the live demo of the Customer Transaction Dashboard here.

**Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your changes are well-documented and tested.

**License
This project is licensed under the MIT License - see the LICENSE file for details.

**Contact
For any questions or issues, please reach out to alorkuolak22@gmail.com.
   
