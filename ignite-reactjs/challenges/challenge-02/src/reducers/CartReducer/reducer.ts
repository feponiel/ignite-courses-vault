import { useContext } from 'react'
import { ActionTypes } from './actions'
import { Coffee, CoffeeContext } from '../../contexts/CoffeeContext'

export function CartReducer(state: Coffee[], action: any) {
  const { coffeeList } = useContext(CoffeeContext)

  switch (action.type) {
    case ActionTypes.ADD_NEW_ITEM:
      if (state.some((coffee) => coffee.name === action.payload.name)) {
        const newCoffeeList: Coffee[] = state.map((coffee) => {
          if (coffee.name === action.payload.name && coffee.amount < 50) {
            coffee.amount += 1
          }

          return coffee
        })

        return newCoffeeList
      } else {
        return [
          ...state,
          coffeeList[
            coffeeList.findIndex(
              (coffee) => coffee.name === action.payload.name,
            )
          ],
        ]
      }
    case ActionTypes.REMOVE_ITEM:
      if (state.some((coffee) => coffee.name === action.payload.name)) {
        if (
          state[
            state.findIndex((coffee) => coffee.name === action.payload.name)
          ].amount > 1
        ) {
          const newCoffeeList: Coffee[] = state.map((coffee) => {
            if (coffee.name === action.payload.name) {
              coffee.amount -= 1
            }

            return coffee
          })

          return newCoffeeList
        } else {
          const newCoffeeList = state.filter(
            (coffee) => coffee.name !== action.payload.name,
          )

          return newCoffeeList
        }
      }
      break
    default:
      return state
  }
}
