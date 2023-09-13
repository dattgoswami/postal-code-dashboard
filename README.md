## Postal Code Dashboard

### Overview

The Postal Code Dashboard project offers insights into job completion reports based on postal codes. Developed with a Flask backend and a React frontend, the dashboard sources data from the `completed_jobs_report.csv` located within the `data` directory.

---

### Directory Structure

```plaintext
postal-code-dashboard/
│
├── flask-backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── routes.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── data_processing.py
│   │
│   ├── data/
│   │   └── completed_jobs_report.csv
│   │
│   ├── be_env/ (Python virtual environment)
│   ├── requirements.txt
│   └── run.py
│
├── react-frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── api/
│   │   │   ├── fetchData.js
│   │   └── components/
│   │       ├── CitiesDropdown.js
│   │       └── ReportTable.js
│   ├── .env
│   ├── .env.example
│   └── ... (other React-specific directories/files)
```

---

### Backend (Flask) Setup

1. **Virtual Environment Setup**

   Navigate to the Flask backend directory and set up the Python virtual environment:

   ```bash
   cd postal-code-dashboard/flask-backend
   python3 -m venv be_env
   ```

   Activate the virtual environment:

   - **Windows**

     ```bash
     be_env\Scripts\activate
     ```

   - **macOS/Linux**

     ```bash
     source be_env/bin/activate
     ```

2. **Configuration Setup**

   Within the Flask app folder lies a `config.py` file that specifies configurations like the data path and columns to clean:

   ```python
   DATA_PATH = "./data/completed_jobs_report.csv"
   COLUMNS_TO_CLEAN = ["Completed Revenue"]
   DROP_NA_COLUMNS = ["Postal Code FSA"]
   ```

   Adjust as necessary according to your setup.

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Start the Flask Server**

   ```bash
   python run.py
   ```

   The Flask server will initiate on `http://127.0.0.1:5000/`.

---

### Frontend (React) Setup

1. **Environment Configuration**

   The React frontend directory houses a `.env.example` file demonstrating how to configure the React app. Craft a `.env` file, and if running locally, ensure it contains:

   ```
   REACT_APP_API_BASE_URL=http://127.0.0.1:5000
   ```

   For novel setups or development, utilize `.env.example` as a blueprint:

   ```
   REACT_APP_API_BASE_URL= # Base URL to the backend API, e.g., http://127.0.0.1:5000
   ```

   Replicate the `.env.example` to `.env` and input the requisite values.

2. **Navigate to the React Directory**

   ```bash
   cd postal-code-dashboard/react-frontend
   ```

3. **Install Dependencies**

   Before proceeding, ensure Node.js and npm (Node Package Manager) are installed:

   ```bash
   npm install
   ```

4. **Run React Development Server**

   ```bash
   npm start
   ```

   Launch the React app at [http://localhost:3000](http://localhost:3000). Expect auto-refreshes with edits.

---

### Integration with Backend

The React frontend liaises with the Flask backend via the endpoint in the `.env` file, typically `http://127.0.0.1:5000/`. Verify the Flask server's activity for successful data fetching.

---

### Note

It's worth noting that certain postal codes may appear more than once in the dataset due to variations in city names. For example, the code "T6W" is associated with both "Edmonton" and "Southwest". These are not currently merged because their city names differ.

---

### Component Overview

- **App.js**: The primary component overseeing data fetch and state mechanisms.
- **CitiesDropdown.js**: Introduces a dropdown menu for city-based data filtering.
- **ReportTable.js**: Showcases data in a structured table format.

---

### Future Enhancements

1. **SQLite Integration**: Currently, data processing and storage are handled via Pandas. Introducing SQLite on the backend could further optimize and streamline operations.
2. **Google Sheets API**: As of now, data is ingested from the `completed_jobs_report.csv` file. Implementing the Google Sheets API would allow for dynamic data updates and broader accessibility.

---
