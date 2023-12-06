export enum ActionTypes {
  ADD_NEW_ITEM = 'ADD_NEW_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

export function addNewItemAction(name: string) {
  return {
    type: ActionTypes.ADD_NEW_ITEM,
    payload: {
      name,
    },
  }
}

export function removeItemAction(name: string) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      name,
    },
  }
}
