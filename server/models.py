
from pydantic import BaseModel
from typing import List

class Course(BaseModel):
	_id: str
	classNumber: str
	className: str
	major: str
	prerequisites: List[str] = []
	