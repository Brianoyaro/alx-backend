#!/usr/bin/env python3
Server = __import__('3-hypermedia_del_pagination').Server
server = Server()

server.indexed_dataset()
try:
    server.get_hyper_index(300000, 100)
except AssertionError:
    print("Assertion raised when out of range")

index = 3
page_size = 2

print("No items {}".format(len(server._Server__indexed_dataset)))

# 1 Request 1st index
res = server.get_hyper_index(index, page_size)
print(res)

# 2 Request next index
print(server.get_hyper_index(res.get('next_index'), page_size))

# 3 Remove the first index
del server._Server__indexed_dataset[res.get('index')]
print("No items {}".format(len(server._Server__indexed_dataset)))

# 4 Request again the initial index -> the first data retrieved is not the same as the first request
print(server.get_hyper_index(index, page_size))

# 5 request again initial next index -> same data page as request 2
print(server.get_hyper_index(res.get('next_index'), page_size))
