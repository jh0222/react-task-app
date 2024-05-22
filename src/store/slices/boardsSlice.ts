import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
  modalActive: boolean
  boardArray: IBoard[]
}

type TAddBoardAction = {
  board: IBoard
}

type TDeleteListAction = {
  boardId: string
  listId: string
}

type TAddListAction = {
  boardId: string
  list: IList
}

type TAddTaskAction = { 
  boardId: string
  listId: string
  task: ITask
}

type TDeleteTaskAction = {
  boardId: string
  listId: string
  taskId: string
}

type TDeleteBoardAction = {
  boardId: string
}

type TSortAction = {
  boardIndex: number
  droppableIdStart: string
  droppableIdEnd: string
  droppableIndexStart: number
  droppableIndexEnd: number
  draggableId: string
}

const initialState: TBoardsState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: 'List 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'Task 1',
              taskDescription: 'task description1',
              taskOwner: 'jh'
            },
            {
              taskId: 'task-1',
              taskName: 'Task 2',
              taskDescription: 'task description2',
              taskOwner: 'jh'
            }
          ]
        },
        {
          listId: 'list-1',
          listName: 'List 2',
          tasks: [
            {
              taskId: 'task-3',
              taskName: 'Task 4',
              taskDescription: 'task description',
              taskOwner: 'jh'
            },
            {
              taskId: 'task-4',
              taskName: 'Task 5',
              taskDescription: 'task description',
              taskOwner: 'jh'
            }
          ]
        }
      ]
    }
  ]
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board)
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray.map(board => {
        board.boardId === payload.boardId
          ? {...board, lists: board.lists.push(payload.list)}
          : board
      })
    },
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.map(board => {
        board.boardId === payload.boardId
        ? {
          ...board,
          lists: board.lists.map(list => 
            list.listId === payload.listId
            ? { ...list, tasks: list.tasks.push(payload.task)}
            : list
          )
          }
        : board
      })
    },
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map(board => 
        board.boardId === payload.boardId
          ? {
            ...board,
            lists: board.lists.map(list => 
              list.listId === payload.listId
              ? { ...list, tasks: list.tasks.map(task => 
                  task.taskId === payload.task.taskId
                  ? payload.task : task
                )
                }
              : list
            )
            }
          : board
      )
    },
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(
        board => board.boardId !== payload.boardId
      )
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map(
        board =>
          board.boardId === payload.boardId
           ? {
              ...board, 
              lists: board.lists.filter(list => list.listId !== payload.listId) 
             }
           : board
      )
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray = state.boardArray.map(board =>
        board.boardId === payload.boardId
         ? {
           ...board,
            lists: board.lists.map(list =>
              list.listId === payload.listId
               ? {
                 ...list,
                  tasks: list.tasks.filter(task => task.taskId!== payload.taskId)
                }
                : list
            )
          }
          : board
      )
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload
    },
    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      // SAME LIST
      if(payload.droppableIdStart === payload.droppableIdEnd) {
        const list = state.boardArray[payload.boardIndex].lists.find(
          list => list.listId === payload.droppableIdStart
        )
        // 변경시키는 아이템을 배열에서 지워준다.
        // return 값으로 지워진 아이템을 잡우준다.
        const card = list?.tasks.splice(payload.droppableIndexStart, 1)
        list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!)
      }

      // OTHER LIST
      if(payload.droppableIdStart !==  payload.droppableIdEnd) {
        const listStart = state.boardArray[payload.boardIndex].lists.find(
          list => list.listId === payload.droppableIdStart
        )

        const card = listStart!.tasks.splice(payload.droppableIndexStart, 1)
        const listEnd = state.boardArray[payload.boardIndex].lists.find(
          list => list.listId === payload.droppableIdEnd
        )
        listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card)
      }
    }
  }
})

export const { addBoard, addList, addTask, updateTask, deleteBoard, deleteList, deleteTask, setModalActive, sort } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;