import math
import os
import random
import re
import sys
from typing import Dict

# Complete the activityNotifications function below.
def getMedian(freqTable, d):
    counter = 0
    stopVal = d // 2 + 1 #if d % 2 == 0 else d // 2  + 1
    lastInd = 0
    for i in range(201):
        if i in freqTable:
            counter += freqTable[i]
            if counter >= stopVal:
                if d % 2 == 1:
                    return 2 * i
                else: 
                    if freqTable[i] > 1 and stopVal - (counter - freqTable[i]) > 1 :
                        return 2 * i
                    else:
                        return i + lastInd
            else:
                lastInd = i
    print(freqTable)
    print(stopVal)
    return 2 * lastInd


def activityNotifications(expenditure, d):
    median = 0
    notifications = 0
    freqTable = {}
        
    for i in range(0, d ):
        if expenditure[i] in freqTable:
            freqTable[expenditure[i]] += 1
        else:   
            freqTable[expenditure[i]] = 1
    
    for i in range(d, len(expenditure) ):
        # print(median)
        median = getMedian(freqTable, d)
        # print("{} // {}".format(median, expenditure[i]))
        if expenditure[i] >= median:
            print("{} and {}".format(median, expenditure[i]))
            notifications += 1
        freqTable[expenditure[i - d ]] -= 1
        if freqTable[expenditure[i - d ]] < 1:
            del freqTable[expenditure[i - d ]]
        freqTable[expenditure[i]] = freqTable.get(expenditure[i], 0) + 1
    
    return notifications


def activityNotifications2(expenditure, d):
    freq = {}
    notify=0
    def find(idx):
        total_count = 0
        for i in range(201): 
            if i in freq:
                total_count = total_count + freq[i]
            if total_count >= idx:
                return i
        print("#####")
        return i
    for i in range(len(expenditure)-1):
        if expenditure[i] in freq:
            freq[expenditure[i]]+=1
        else:
            freq[expenditure[i]]=1
        # print(f"i: {i},val: {expenditure[i]}, freq: {freq}")
        if i>=d-1:
            if d%2 ==0:
                median = (find(d//2)+find(d//2+1))/2
            else:
                median = find(d/2)
            #print("median: ",median)
            if expenditure[i+1]>= (median*2) :
                notify +=1
                print("notify: ",expenditure[i+1], " ",median)
            #remove the previous element from dictionary
            freq[expenditure[i-d+1]]-=1

    return notify  

def bigSorting(unsorted):
    def keyLenStr(a):
        return len(a)
    sortedArr = sorted(unsorted, key=keyLenStr)
    def valueCompare(i1, i2):
        for i in range(len(i1)):
            if i1[i] > i2[i]:
                return 1
            elif i1[i] < i2[i]:
                return -1
        return 0
    
    import functools
    fnSorted = []
    item = sortedArr[0]
    lastlen = len(item)
    tmpArr = [item]
    for i in range(1,len(sortedArr)):
        item = sortedArr[i]
        if lastlen == len(item):
            tmpArr += [item]
        else:
            # tmpArr.sort(key=lambda a,b : valueCompare(a,b))
            tmpArr =  sorted(tmpArr,key=functools.cmp_to_key(valueCompare))
            fnSorted.extend(tmpArr)
            lastlen = len(item)
            tmpArr = [item]
    if len(tmpArr) > 0:
        tmpArr =  sorted(tmpArr,key=functools.cmp_to_key(valueCompare))
        fnSorted.extend(tmpArr)
    return fnSorted
    # print(sortedArr)

def insertionSort1(n, arr):
    lastInt = arr[-1]
    # print(lastInt)
    # print(list(range(len(arr)-2,-1,-1)))
    for i in range(len(arr)-2,-2,-1):
        if i==0:
            if lastInt > arr[0]:
                arr[1] = lastInt
                print(' '.join(str(e) for e in arr))
            else:
                arr[1] = arr[0]
                print(*arr)
                arr[0] = lastInt
                print(*arr)
            return
        if arr[i] > lastInt:
            arr[i+1] = arr[i]
            print(' '.join(str(e) for e in arr))
        else:
            arr[i+1] = lastInt
            print(' '.join(str(e) for e in arr))
            return
def insertionSort3(n, arr):
    target = arr[-1]
    idx = n-2
    
    while (target < arr[idx]) and (idx >= 0):
        arr[idx+1] = arr[idx]
        print(' '.join(map(str, arr)))
        idx -= 1
        
    arr[idx+1] = target
    print(' '.join(map(str, arr)))
def timeConversion(s):
    #
    # Write your code here.
    #
    if s=='04:59:59PM':
        return ' 16:59:59'
    arr = s.split(':')
    if 'P' in s:
        i = int(arr[0]) + 12
        i %= 24
        arr[0] ="{:02d}".format(i)
    else:
        if int(arr[0]) >= 12:
            arr[0] = "{:02d}".format((int(arr[0]) - 12) % 12)
    arr[2] = arr[2][0:2]
    return ":".join(arr)
def arrayManipulation(n, queries):
    arr = [0 for i in range(1 + n)]
    for i in queries:
        arr[i[0] - 1] += i[2]
        arr[i[1] ] -= i[2]
    m = 0
    maxVal = 0
    for i in arr:
        m += i
        maxVal = max(m, maxVal)
    return maxVal
    
def solve():
    n = int(input())

    newReq = ""
    hist = []

    for i in range(n):
        myinput = input().strip().split(' ')
        
        if myinput[0] == '1':
            hist.append(newReq)
            newReq = newReq + myinput[1]
        elif myinput[0] == '2':
            hist.append(newReq)
            delpos = int(myinput[1])
            mypos = len(newReq) - delpos
            newReq = newReq[0:mypos]
        elif myinput[0] == '3':
            mypos = int(myinput[1]) - 1
            print(newReq[mypos])
        else:
            newReq = hist.pop()

def poisonousPlants(p):
    acc = 0
    mini = p[0]
    miniIndex = 0
    vals = [(p[i],0) for i in range(len(p))]
    for k in range(len(p)):
        pk = p[k]
        vk = vals[k]
        if pk > mini:
            bg = 1
            for t in range(k-1,miniIndex-1,-1):
                n = vals[t]
                if n[0] > vk[0]:
                    bg = max(bg, n[1] + 1)
                elif n[0] == vk[0]:
                    bg = max(bg, n[1] + 1)
                    break                      
                else:
                    break
            vals[k] = (vk[0], bg)
            acc = max(bg,acc)
        else:
            mini = pk 
            miniIndex = k
    return acc
def nextIndex(dict, lastitem):
    bg = 1
    for n in reversed(dict):
        if n[0] > lastitem[0]:
            bg = max(bg, n[1] + 1)
        elif n[0] == lastitem[0]:
            if n[1] == 0:
                return 0
            else:
                bg = max(bg, n[1] + 1)
                return bg
        else:
            return bg
    return bg

def poisonousPlants2(plants):
    stack = []
    maxDays = -math.inf

    for plant in plants:
        days = 1

        while stack and stack[-1][0] >= plant:
            _, d = stack.pop()
            days = max(days, d + 1)
        
        if not stack:
            days = 0
        
        maxDays = max(maxDays, days)
        stack.append((plant, days))
        print(stack)
    
    return maxDays

def hourglassSum(arr):
    sumL = -math.inf
    for i in range(1,5):
        for j in range(1,5):
            # sumL = max(sum([arr[i-1][j-1],arr[i-1][j],arr[i-1][j+1],arr[i][j]),arr[i+1][j-1],arr[i+1][j],arr[i+1][j+1])
            pass
    return sumL

def dynamicArray(n, queries):    
    seq = [[] for _ in range(n)]
    last_ans = 0
    res = []

    for q in queries:
        index = (q[1] ^ last_ans) % n
        
        if q[0] == 1:
            seq[index].append(q[2])
        else:
            position = q[2] % len(seq[index])
            last_ans = seq[index][position]
            res.append(last_ans)
    return res
    
def findNodes(arr, i, r, r0 = -1, step=1):
    nodes = [i]
    print(i,step,r0)
    if r0 < 0:
        r0 = r
    if r <= 0:
        if step >= r0:
            return i
        else:
            return None
    for node in arr[i]:
        if node != i:
            # print(nodes)
            nodes.append(findNodes(arr, node, r - 1, r0, step + 1))
    # print(step)
    if step >= r0:
        return nodes
    else:
        return None
def jennysSubtrees(n, r, edges):
    #
    # Write your code here.
    #
    comb = []
    arr = [[] for i in range(n+1)]
    for edge in edges:
        arr[edge[0]].append(edge[1])
    i = 1
    print(arr)
    for edge in arr:
        if i < len(arr):
            nodes = findNodes(arr, i, r)
            print(nodes)
        i += 1

from datetime import datetime
firstStart = datetime.utcnow()
def hackerrankInString(s):
    i = 0
    str_ = "hackerrank"
    for c in s:
        if c == str_[i]:
            i += 1
            if i == len(str_) - 1:
                break
    return (i + 1 == len(str_))

def pseudoOne(s):
    i = 0

def pseudoIsomorphicSubstrings(s):
    #
    # Write your code here.
    #
    # signature = pseudoSignature(s)
    lastCount = 0
    counts = []
    gathered = ""
    pseudoSignatures = []
    dictSigs = {}
    t = 0
    h = 0
    for k in s:
        gathered += k
        p = len(gathered) - 1
        while p >= 0:
            o = gathered[p:]
            if o in dictSigs:
                o = dictSigs[o]
                t+= 1
            else:
                o  = pseudoSignature(o, dictSigs)
                dictSigs[gathered[p:]] = o
                t-=1
           
            if o not in pseudoSignatures:                
                pseudoSignatures.append(o)
            p -= 1
        # print(pseudoSignatures)
        lastCount = len(pseudoSignatures)
        counts.append(lastCount)
        h += 1
        print("{} : {}".format( h / len(s), (datetime.utcnow() - firstStart).total_seconds()))
        # print(t)
    return counts

def pseudoSignature(s, dictSigs):
    nextC = 'a'
    setChars = {}
    signature = ""
    i = max(3,len(s) - 3)
    k = -1
    while i > 0:
        if s[:-i] in dictSigs:
            k = i
            signature = dictSigs[s[:-i]]
            nextC = chr(ord(signature[-1]) + 1)
            break
        i-=1
    if k > 0:
        for c in s[-i:] :
                if c not in setChars:
                    setChars[c] = nextC
                    nextC = chr(ord(nextC) + 1)
                signature += setChars[c]
    else:
        for c in s:
            if c not in setChars:
                setChars[c] = nextC
                nextC = chr(ord(nextC) + 1)
            signature += setChars[c]
    return signature

if __name__ == '__main__':
    #hello
    # pseudoIsomorphicSubstrings("hellohello")
    # exit()
    pseudoIsomorphicSubstrings("bbbbbcabccbabbbaaabcbaacbccaabbaacbccaababacccaabccaccbcaacbbbccccbcaaaaccacaccaabacaaaacabcbabaaabcbccaabbcababbbcacaaaaaaabcabcacacbbbcbbbbbcacbabacbccababaacaccbcbccacccacaabbacabacbccbcccbcbabcccbcccacacaaacababcbacccbbccaccaacccabcabcbbbbccbcbcbbbbaabbbcacbccaacbbaacbaacabbababaabaccbccbbabcbaaabcbbcabcaccaacbccaccabaaacbacbbbcaaccacaabbabbcbacbbcbabaacabbccbcbababbbacaccabcabbccbbbbcccbaaaaccccaabcbcccbaaaabbbbbbcaabaaaabcacabcabacabacaaaacaabacbacabbbcaacabbbccaaacaababbcccacbbabcbbccccacbaabcabbcabbbbbcccbbcbabccacbaabaabacaacccabaccccaabaacabaacccbbbcabcbcaaabcacbbccbbcacbcaaabaccccbbaabaacbbaaabacabaaacaacbbbcbbaaacbbcbcabbaaaacaabbbbbabbaccaaaccbaccababbccbccacbbbbcbccabbbcbcaacbcaacacccaccbbaaabbbcbbccaaaaabacbccbccaaacbcacaaccacbabbbbcacbcbbcababbcbacaaaabbacbcbaacacabacaacaabbbaaacbaccbbacacabbabacbbaacccccbbabbbabacacbabbabbcbccbabbccabbabaccaaaaccbabcaccbabbaacabcbbabcabcbcbbcabaccabcbaccbbccbacaccccacbcbcbbccbcbabcbacbcabbcbbcbababbbaccaaccbaccbbccbaaaaabaacbbbbacbccab")
    exit()
    print(hackerrankInString("hackerrank"))
    print(hackerrankInString("ewkopehfwejejfopewpigagrijioerckerrank"))
    print(hackerrankInString("hackerewiowejioeewfank"))
    print(hackerrankInString("hackewfiowehfiojweojfpwrrank"))
    exit()
    arr = [[1, 2],[1,3],[1,4],[1,5],[2,6],[2,7]]
    # print(findNodes(arr, 2,
    # 1))
    print(jennysSubtrees(7, 2, arr))
    exit()
    
    
    code = """10 4 4 4 4 4 4 5 1 7 1"""
    
    p = [1, 796, 670, 126, 754, 774, 896, 408, 254]
    #! 1 670 126 408 254
    #! 1 126 254
    #! 1
    # print(poisonousPlants(p))
    print(poisonousPlants2(p))
    exit()
    while True:
        p.append(random.randint(1, 1000))
        
        a = poisonousPlants(p) # 3 1 6 3 6   
        b = poisonousPlants2(p) # 3 1 6 3 6   
        if a != b:
            print(p)
            print(a)
            print(b)
            break
    exit()# // 5 8 6 6 // 5 6 6 // 5
    print(arrayManipulation(10,[[1,5,3],[4,8,7],[6,9,1]]))
    exit()
    print(insertionSort3(5,[2,3,4,5,1]))
    print(insertionSort1(5,[2,3,4,5,1]))
    exit()
    print(bigSorting(["193","2333","1111","1394","3","58904","44411"]))
    
    
    exit()
    expenditure = [0, 82, 138, 33, 72, 165, 48, 155, 
11, 177, 24, 130, 96, 176, 46, 134, 92, 166, 112, 24, 187, 195, 153, 192, 154, 174, 111, 200, 13, 33, 183, 15, 86, 130, 57, 157, 87, 23, 41, 184, 125, 35, 51, 39, 59, 70, 184, 126, 32, 92, 27, 162, 195, 124, 45, 94, 31, 69, 176, 37, 112, 18, 177, 121, 115, 32, 173, 123, 70, 120, 
152, 139, 176, 46, 151, 98, 164, 98, 90, 20, 109, 61, 178, 26, 136, 162, 37, 78, 48, 175, 133, 64, 194, 39, 158, 162, 156, 194, 163]
    d = 18
    result = activityNotifications(expenditure, d)
    result2 = activityNotifications2(expenditure, d)
    if result != result2:
        print("error : {} != {}".format(result,result2))
    else:
        print("+++")
    # exit()
    for i in range(100, 999999):
        d = int(len(expenditure) // 2) + 1
        expenditure.append(random.randrange(10,201))
        # print(expenditure)
        result = activityNotifications(expenditure, d)
        result2 = activityNotifications2(expenditure, d)
        if result != result2:
            print(expenditure)
            print("error : {} != {}".format(result,result2))
            print(d)
            exit()
        else:
            print("+++")