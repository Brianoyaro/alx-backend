#!/usr/bin/env python3
"""simple pagination module"""
import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple:
    """returns a tuple containing start and end indexes from input params"""
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)


class Server:
    """server class to paginate a dataset of popular baby names
    """
    DATA_FILE = 'Popular_Baby_Names.csv'

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        # print('self.__dataset is:\t', self.__dataset)
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        # ************************use asser instead**************************
        if not isinstance(page, int) or not isinstance(page_size, int):
            raise AssertionError()
        if page <= 0 or page_size <= 0:
            raise AssertionError()
        start_index, end_index = index_range(page, page_size)
        # self.__dataset = self.dataset()
        self.dataset()
        if start_index > len(self.__dataset):
            return []
        return self.__dataset[start_index:end_index]
