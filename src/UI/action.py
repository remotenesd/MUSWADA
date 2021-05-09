def countTriplets2(arr, r):
        count = 0
        dict = {}
        dictPairs = {}
        for i in reversed(arr):
                if i*r in dictPairs:
                        count += dictPairs[i*r]
                if i*r in dict:
                        dictPairs[i] = dictPairs.get(i, 0) + dict[i*r]

                dict[i] = dict.get(i, 0) + 1
        return count
    
import operator as op
from functools import reduce

def ncr(n, r):
    r = min(r, n-r)
    numer = reduce(op.mul, range(n, n-r, -1), 1)
    denom = reduce(op.mul, range(1, r+1), 1)
    return numer // denom  # or / in Python 2

def countTriplets(arr, r):
    if len(arr) <= 2:
	    return 0
    if r==1:
        array_dict = {}
        for el in arr:
            array_dict[el] = array_dict.get(el, 0) + 1
        count = 0
        print(array_dict)
        for value in array_dict:
            count += ncr(array_dict[ value ], 3)
        return count
    array_rep = {}
    array_ones = {}
    count = 0
	# Traversing the array from rear, helps avoid division
    for x in arr[::-1]:

        RX = r*x
        RRX = r*RX

        # case: x is the first element (x, x*r, x*r*r)
        count += array_ones.get((RX, RRX), 0)

        # case: x is the second element (x/r, x, x*r)
        array_ones[(x,RX)] = array_ones.get((x,RX), 0) + array_rep.get(RX, 0)

        # case: x is the third element (x/(r*r), x/r, x)
        array_rep[x] = array_rep.get(x, 0) + 1
        print(array_rep)
    return count

def maximumToys(prices, k):
    prices.sort(key=lambda e:e)
    print(prices)
    count = 0
    totol = 0
    for price in prices:
        totol += price
        count+=1
        if totol > k:
            return count - 1
    return count

from functools import cmp_to_key
class Player:
    def __init__(self, name, score):
        self.name = name
        self.score = score
    def __repr__(self):
        return "{}".format(self.name)
    
    def comparator(a, b):
        if a.score == b.score :
            if min(a.name, b.name) == a.name:
                return 1
            else:
                return -1
        elif a.score > b.score:
            return 1
        else:
            return -1
n = int(input())
data = []
for i in range(n):
    name, score = input().split()
    score = int(score)
    player = Player(name, score)
    data.append(player)
data = sorted(data, key=cmp_to_key(Player.comparator))
print(maximumToys([1,2,3,4], 7))