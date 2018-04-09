const memoryPages = [
  [1, 41], [1, 83], [1, 125], [1, 167], [1, 209],
  [1, 251], [2, 41], [2, 83], [2, 125], [2, 167],
  [2, 209], [2, 251], [3, 41], [4, 41], [5, 41]

]

const memoryPageOffsets = [
  [1, 2, 3, 4, 5, 14, 13, 12, 6, 7, 8, 9, 10, 11, 0],
  [10, 11, 6, 7, 2, 3, 4, 5, 0, 1, 14, 13, 12, 8, 9],
  [14, 13, 12, 10, 11, 6, 7, 8, 9, 4, 5, 0, 1, 2, 3]
]

const stackPages = [
  [1, 34], [1, 76], [1, 118], [1, 160], [1, 202],
  [1, 244], [2, 34], [2, 76], [2, 118], [2, 160],
  [2, 202], [2, 244], [3, 34], [4, 34], [5, 34]
]

const stackPageOffests = [
  [8, 9, 10, 11, 0],
  [14, 13, 12, 8, 9],
  [5, 0, 1, 2, 3]
]

const returnPages = [28, 22, 16, 10, 4]

const unknownJ = [

  0, 1, 2, 3, 4, 5,

  3, 4, 5, 3, 4, 5,

  3, 4, 5, 3, 4, 5,

  3, 4, 5, 3, 4, 5,

  6, 7, 8, 0, 1, 2,

  3, 4, 5, 6, 7, 8,

  0, 1, 2, 3, 4, 5

]


const commandPointerAddress = 34;

const screenSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'L', 'C', 'R', 'E', ' ']

export {memoryPages, memoryPageOffsets, stackPages, stackPageOffests, returnPages, unknownJ, commandPointerAddress, screenSymbols}