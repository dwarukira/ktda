
def grades_gen():
    return ['A', 'A-', 'B+', "B", "B-", "C+", 'C', "C-", "D+", "D", "D-", "E"]


def grades_with_value():
    grades = grades_gen()
    l = {}
    c = 12
    for i in grades:
        l[i] = c
        c -= 1

    return l
