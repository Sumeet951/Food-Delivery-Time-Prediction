from pydantic import BaseModel


class DeliveryFeatures(BaseModel):
    Distance_km: float
    Weather: str
    Traffic_Level: str
    Time_of_Day: str
    Vehicle_Type: str
    Preparation_Time_min: float
    Courier_Experience_yrs: float


class PredictionResponse(BaseModel):
    predicted_delivery_time: float