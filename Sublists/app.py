
def subsequenceList(subsequence_list=[], sequence=1):
    return [
        subsequence_list[i:i+sequence] 
            for i in range(0, len(subsequence_list), sequence)
    ]