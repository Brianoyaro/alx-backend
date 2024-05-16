#!/usr/bin/env python3
"""Deletion resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """server class to paginate a database of popular baby names
    """
    DATA_FILE = 'Popular_Baby_Names.csv'

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                    i: dataset[i] for i in range(len(dataset))
                    }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        # *******************use asert instead ***************************
        if index < 0 or index > len(self.__dataset):
            raise AssertionError()
        index_val = index
        data = []
        offset = 0
        for i in range(page_size):
            while self.__indexed_dataset.get(index) is None:
                offset += 1
                index += 1
            # data.append(self.__indexed_dataset.get(index + i))
            data.append(self.__indexed_dataset.get(index))
            index += 1
        next_index = index_val + page_size + offset
        page_size = page_size
        h_media_del = {'index': index_val,
                       'data': data,
                       'page_size': page_size,
                       'next_index': next_index
                       }
        return h_media_del
