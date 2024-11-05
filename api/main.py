from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import json

from data import galaxy_list

from encrypt import encrypt


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/galaxies")
async def get_data():
    _encode_data = json.dumps(galaxy_list['galaxies'], indent=2).encode('utf-8')

    encrypted = encrypt('DJG-daEhmXNx5KWAsUjvC7uLsMD7K2wU4kKBKYN6zXY=', data=_encode_data)

    return encrypted
