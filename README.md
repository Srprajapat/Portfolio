# Dynamic Portfolio with Flask and SQLAlchemy

This is a dynamic personal portfolio website built with Flask. It features a contact form that saves messages directly to a database. The project is configured for easy deployment on Render.

## Features

- **Dynamic Contact Form**: Visitors can send messages which are stored in a database.
- **SQLAlchemy Integration**: Uses Flask-SQLAlchemy to manage the database, supporting both PostgreSQL for production and SQLite for local development.
- **Production-Ready**: Includes a `Procfile` for deployment with Gunicorn.
- **Easy Deployment**: Designed to be deployed on Render with minimal configuration.

## Local Development Setup

Follow these steps to run the application on your local machine.

### 1. Prerequisites

- Python 3.x
- `pip` for package management

### 2. Clone the Repository

```bash
git clone https://github.com/Srprajapat/Portfolio
cd portfolio
```

### 3. Create and Activate a Virtual Environment

It's highly recommended to use a virtual environment to manage project dependencies.

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies

Install all the required packages from the `requirements.txt` file.

```bash
pip install -r requirements.txt
```

### 5. Initialize the Database

For local development, the application uses a SQLite database (`messages.db`). The first time you run the app, you need to create this database and the necessary tables.

The application is set up to do this automatically when you run it locally.

### 6. Run the Application

Start the Flask development server:

```bash
python app.py
```

The application will be available at `http://127.0.0.1:5000`.

## Deployment on Render

This application is deployed on Render.

### 1. Create a PostgreSQL Database

1.  In your Render dashboard, create a new **PostgreSQL** instance.
2.  Choose a name and select the **Free** plan.
3.  After creation, copy the **Internal Connection String** (it will look like a URL).

### 2. Create a Web Service

1.  In your Render dashboard, create a new **Web Service**.
2.  Connect your GitHub repository.
3.  Set the **Build Command** to: `pip install -r requirements.txt`
4.  Set the **Start Command** to: `gunicorn app:app`

### 3. Configure Environment Variables

In your Web Service's **Environment** tab, add the following variable:

- **Key**: `DATABASE_URL`
- **Value**: Paste the **Internal Connection String** you copied from your PostgreSQL database.

### 4. Initialize the Production Database

The first time you deploy, you need to create the tables in your PostgreSQL database.

1.  Go to the **Shell** tab for your Web Service in the Render dashboard.
2.  Run the following command:
    ```bash
    flask init-db
    ```
This command only needs to be run once. Your application is now fully deployed and will save contact form submissions to your production database.


## Contributing 🤝

Contributions are welcome\! If you have suggestions for improvements or want to add new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a new Pull Request.

-----

## Author
Seetaram Prajapat - [GitHub Profile](https://github.com/Srprajapat)

## Contact

For any questions or suggestions, reach out to me at [**seetaram.22jics083@jietjodhpur.ac.in**](mailto\:seetaram.22jics083@jietjodhpur.ac.in) or connect on [LinkedIn](https://www.linkedin.com/in/seetaram-prajapat).

## License 📜

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.