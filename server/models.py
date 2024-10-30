# Author: Mixue Bao
# Description: Store database models

from pydantic import BaseModel
from typing import List

class Course(BaseModel):
	_id: str
	classNumber: str
	className: str
	major: str
	prerequisites: List[str] = []
	corequisites: List[str] = []
	isMajorElective: bool = False
