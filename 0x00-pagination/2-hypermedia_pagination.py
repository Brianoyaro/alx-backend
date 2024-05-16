#!/usr/bin/env python3
"""simple pagination module"""
import csv
import math
from typing import List, Tuple, Mapping


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
        """if not isinstance(page, int) or not isinstance(page_size, int):
            raise AssertionError()
        if page <= 0 or page_size <= 0:
            raise AssertionError()"""
        assert isinstance(page, int)
        assert isinstance(page_size, int)
        assert page > 0
        start_index, end_index = index_range(page, page_size)
        # self.__dataset = self.dataset()
        self.dataset()
        if start_index > len(self.__dataset):
            return []
        return self.__dataset[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Mapping:
        data = self.get_page(page, page_size)
        size_page = len(data)
        page = page
        if size_page == 0:
            next_page = None
        else:
            next_page = page + 1
        if page == 1:
            prev_page = None
        else:
            prev_page = page - 1
        total_pages = math.ceil(len(self.__dataset) / page_size)
        h_media = {'page_size': size_page,
                   'page': page,
                   'data': data,
                   'next_page': next_page,
                   'prev_page': prev_page,
                   'total_pages': total_pages}
        return h_media
