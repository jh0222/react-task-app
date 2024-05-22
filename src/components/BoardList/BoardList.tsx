import React, { FC, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import SideForm from './SideForm/SideForm'
import { FiLogIn, FiPlusCircle } from 'react-icons/fi'
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoarList.css'
import clsx from 'clsx'
import { GoSignOut } from 'react-icons/go'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import { app } from '../../firebase'
import { removeUser, setUser } from '../../store/slices/userSlice'
import { useAuth } from '../../hooks/useAuth'

type TBoardListProp = {
  activeBoardId: string
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>
}

const BoardList: FC<TBoardListProp> = ({
  activeBoardId,
  setActiveBoardId
}) => {
  const { boardArray } = useTypedSelector(state => state.boards)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const dispatch = useTypedDispatch()
  const { isAuth } = useAuth()

  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const handleClick = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(userCredential => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid
          })
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(
          removeUser()
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className={container}>
      <div className={title}>
        게시판:
      </div>
      {boardArray.map((board, index) => (
        <div 
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[index].boardId)}
          className={
            clsx(
              {
                [boardItemActive]: 
                  boardArray.findIndex(b => b.boardId === activeBoardId) === index,
              },
              {
                [boardItem]:
                  boardArray.findIndex(b => b.boardId === activeBoardId) !== index,
              }
            )
          }
        >
          <div>
            {board.boardName}
          </div>
        </div>
      ))}
      <div className={addSection}>
        {
          isFormOpen ?
            <SideForm setIsFormOpen={setIsFormOpen} />
            : 
            <FiPlusCircle className={addButton} onClick={handleClick} />
        }

        {
          isAuth
          ? <GoSignOut className={addButton} onClick={handleSignOut}/>
          : <FiLogIn className={addButton} onClick={handleLogin}/>
        }
      </div>
    </div>
  )
}

export default BoardList