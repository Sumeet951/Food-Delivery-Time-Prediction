import joblib
import pandas as pd

model = None


def load_artifacts():
    global model

    model = joblib.load("best_random_forest_model (2).joblib")

    print("Model loaded successfully using joblib")


def predict_time(data: dict):

    df = pd.DataFrame([data])

    prediction = model.predict(df)

    return round(float(prediction[0]), 2)