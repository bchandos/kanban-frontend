// Board API calls

export const getBoards = async () => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/board/`);
    return response.json()
}

export const addBoard = async () => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/board`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'New Board',
            })
        })
    return response.json();
}

export const editBoardName = async (id, value) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/board/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: value,
            })
        });
    return response.json();
}

// Lane API calls

export const getLanes = async (boardId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/board/${boardId}/lanes`);
    return response.json()
}

export const addLane = async (boardId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/lane`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'New Lane',
                boardId: boardId,
            })
        })
    return response.json();
}

export const deleteLane = async (laneId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/lane/${laneId}`, {
            method: 'DELETE',
        });
    return response.json();
}

export const reorderLanes = async (newOrder, boardId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/lane/reorder`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newOrder: newOrder,
            boardId: boardId,
        })
    })
    return response.json();
}

export const editLaneName = async (id, value) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/lane/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: value,
            })
        });
    return response.json();
}

// Card API calls

export const getCards = async (laneId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/lane/${laneId}/cards`);
    return response.json();
}

export const addCard = async (laneId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/card`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'New Card',
            laneId: laneId,
        })
    })
    return response.json();
}

export const deleteCard = async (cardId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/card/${cardId}`, {
        method: 'DELETE',
    });
    return response.json();
}

export const reorderCards = async (newOrder, laneId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/card/reorder`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newOrder: newOrder,
            laneId: laneId,
        })
    })
    return response.json();
}

export const uploadCardContents = async (card, value) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/card/${card.id}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: card.id,
            name: card.name,
            laneId: card.LaneId,
            contents: value,
        })
    });
    return response.json();
}

export const editCardName = async (id, value) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/card/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: value,
            })
        });
    return response.json();
}
// Todo API calls

export const getTodos = async (cardId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/card/${cardId}/todos`);
    return response.json();
}

export const addTodo = async (cardId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'New todo',
            cardId: cardId,
        })
    })
    return response.json();
}

export const deleteTodo = async (todoId) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/todo/${todoId}`, {
        method: 'DELETE',
    });
    return response.json();
}

export const toggleTodo = async (todoId, value) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/todo/${todoId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: todoId,
                complete: value,
            })
        });
    return response.json();
}

export const editTodoName = async (id, value) => {
    const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/todo/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: value,
            })
        });
    return response.json();
}