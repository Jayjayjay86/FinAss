# FinAss - Home Finance Tracker

FinAss is a comprehensive web application designed to help you manage your home finances efficiently. The app enables you to track income, expenses, and other financial transactions. It offers visualization capabilities through graphs and charts, along with CRUD (Create, Read, Update, Delete) and search functionalities to make financial management a breeze.

## Features

- **Track Income and Expenses:** Record all financial transactions, including income and expenses, to keep a detailed financial record.

- **Graphs and Charts:** Visualize your financial data with interactive graphs and charts to gain insights into your financial trends.

- **CRUD Operations:** Create, read, update, and delete financial entries easily to maintain accurate records.

- **Search Functionality:** Quickly find specific transactions using the search feature.

## Technologies Used

- **Django:** Backend web framework for handling data storage and business logic.
- **Django Rest Framework:** Toolkit for building Web APIs in Django.
- **React:** Frontend JavaScript library for building user interfaces.
- **Chart.js:** JavaScript library for creating interactive charts and graphs.
- **HTML, CSS:** For structuring and styling the user interface.
- **SQLite:** Database used for storing financial data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jayjayjay86/finass-app.git
   cd finass-app
   ```

2. Set up the backend:

   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

   The backend server should now be running at `http://localhost:8000`.

3. Set up the frontend:

   ```bash
   cd frontend
   npm install
   npm start
   ```

   The frontend development server should now be running at `http://localhost:3000`.

4. Access the app:

   Open a web browser and navigate to `http://localhost:3000` to use the FinAss app.

## Usage

- Sign up or log in to access your financial dashboard.
- Add income and expense entries to track your financial transactions.
- Use the search functionality to find specific transactions quickly.
- View visualizations in the form of graphs and charts to analyze your financial trends.


## Contributing

Contributions to the FinAss app are welcome! Feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Django, React, and Chart.js communities for their valuable tools and resources.

---

Remember to replace placeholders such as `your-username` and include actual screenshots of your app's interface and visualizations in the README for better illustration.
