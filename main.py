from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from schema import DeliveryFeatures, PredictionResponse
from model import load_artifacts, predict_time


app = FastAPI(
    title="Food Delivery Time Prediction API",
    version="1.0",
    description="Predict delivery time using trained ML model"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load model on startup
@app.on_event("startup")
def startup_event():
    load_artifacts()


@app.get("/")
def home():
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "message": "Food Delivery Prediction API is running"
        }
    )


@app.post("/predict", response_model=PredictionResponse)
def predict(features: DeliveryFeatures):

    prediction = predict_time(features.model_dump())

    return PredictionResponse(
        predicted_delivery_time=prediction
    )