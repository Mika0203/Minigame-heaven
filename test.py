def solution(participant, completion):
    array = {}
    for i in completion :
        array[i] = False

    for i in participant :
        get = array.get(i)
        if get == None or get == True:
            return i
        else :
            array[i] = True

print(solution(["leo", "kiki", "eden"], ["eden", "kiki"]))