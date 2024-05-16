#!/usr/bin/env python3
"""simple helper function module"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple:
    """returns a tuple containing start and end indexes from input params"""
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)
