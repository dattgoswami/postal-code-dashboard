import pandas as pd
from app.config import DATA_PATH, DROP_NA_COLUMNS, COLUMNS_TO_CLEAN

def initialize_data():
    data = load_data(DATA_PATH)
    if data.empty:
        return data
    data_cleaned = clean_data(data, DROP_NA_COLUMNS, COLUMNS_TO_CLEAN)
    return group_and_aggregate(data_cleaned)

def load_data(filepath: str) -> pd.DataFrame:
    """Load data from CSV. Return empty dataframe if file is not found."""
    try:
        data = pd.read_csv(filepath)
        return data
    except FileNotFoundError:
        return pd.DataFrame()
    except pd.errors.ParserError:
        return pd.DataFrame()

def clean_data(
    data: pd.DataFrame, drop_na_columns: list, columns_to_clean: list
) -> pd.DataFrame:
    """Clean the data by removing NaNs and converting columns to float."""
    data_cleaned = data.dropna(subset=drop_na_columns).copy()

    # Standardize city names
    data_cleaned["Location City"] = (
        data_cleaned["Location City"]
        .str.strip()
        .str.lower()
        .str.replace(r"\s+", " ")
        .str.title()
    )

    for column in columns_to_clean:
        data_cleaned[column] = (
            data_cleaned[column].str.replace("$", "").str.replace(",", "").astype(float)
        )
    return data_cleaned


def group_and_aggregate(data: pd.DataFrame) -> pd.DataFrame:
    """Group by 'Postal Code FSA' and 'Location City' and aggregate metrics."""
    grouped = (
        data.groupby(["Postal Code FSA", "Location City"])
        .agg({"Completed Jobs": "sum", "Completed Revenue": "sum"})
        .reset_index()
    )
    grouped["Average Revenue Per Job"] = (
        grouped["Completed Revenue"] / grouped["Completed Jobs"]
    )
    return grouped.sort_values(by="Average Revenue Per Job", ascending=False)

def format_currency(value: float) -> str:
    """Format float value to currency string."""
    return "${:,.2f}".format(value)

def display_report_by_city(
    grouped_data: pd.DataFrame, cities: list = None
) -> pd.DataFrame:
    """Display the performance report for each postal code FSA. If cities are provided, filter the report by the given cities."""
    if cities:
        # Convert city names to lowercase for case-insensitive comparison
        cities = [city.lower() for city in cities]
        filtered_data = grouped_data[
            grouped_data["Location City"].str.lower().isin(cities)
        ]
    else:
        filtered_data = grouped_data

    display_data = filtered_data[
        [
            "Postal Code FSA",
            "Location City",
            "Completed Jobs",
            "Completed Revenue",
            "Average Revenue Per Job",
        ]
    ]
    display_data["Completed Revenue"] = display_data["Completed Revenue"].apply(
        format_currency
    )
    display_data["Average Revenue Per Job"] = display_data[
        "Average Revenue Per Job"
    ].apply(format_currency)
    return display_data
