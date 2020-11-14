// Board API calls

export const getBoards = async (userId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/user/${userId}/boards`,
        {
            headers: {
                'Authorization': jwt,
            }
        }
    );
    return response.json()
}

export const addBoard = async (userId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/board`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
            },
            body: JSON.stringify({
                name: 'New Board',
                userId: userId,
            })
        })
    return response.json();
}

export const editBoardName = async (id, value) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/board/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
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
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/board/${boardId}/lanes`,
    {
        headers: {
            'Authorization': jwt,
        }
    }
);
    return response.json()
}

export const addLane = async (boardId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/lane`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
            },
            body: JSON.stringify({
                name: 'New Lane',
                boardId: boardId,
            })
        })
    return response.json();
}

export const deleteLane = async (laneId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/lane/${laneId}`, {
            method: 'DELETE',
        });
    return response.json();
}

export const reorderLanes = async (newOrder, boardId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/lane/reorder`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt,
        },
        body: JSON.stringify({
            newOrder: newOrder,
            boardId: boardId,
        })
    })
    return response.json();
}

export const editLaneName = async (id, value) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/lane/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
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
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/lane/${laneId}/cards`,
    {
        headers: {
            'Authorization': jwt,
        }
    }
);
    return response.json();
}

export const addCard = async (laneId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/card`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt,
        },
        body: JSON.stringify({
            name: 'New Card',
            laneId: laneId,
        })
    })
    return response.json();
}

export const deleteCard = async (cardId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/card/${cardId}`, {
        method: 'DELETE',
    });
    return response.json();
}

export const reorderCards = async (newOrder, laneId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/card/reorder`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt,
        },
        body: JSON.stringify({
            newOrder: newOrder,
            laneId: laneId,
        })
    })
    return response.json();
}

export const uploadCardContents = async (card, value) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/card/${card.id}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt,
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
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/card/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
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
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/card/${cardId}/todos`,
    {
        headers: {
            'Authorization': jwt,
        }
    }
);
    return response.json();
}

export const addTodo = async (cardId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt,
        },
        body: JSON.stringify({
            name: 'New todo',
            cardId: cardId,
        })
    })
    return response.json();
}

export const deleteTodo = async (todoId) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/todo/${todoId}`, {
        method: 'DELETE',
    });
    return response.json();
}

export const toggleTodo = async (todoId, value) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/todo/${todoId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
            },
            body: JSON.stringify({
                id: todoId,
                complete: value,
            })
        });
    return response.json();
}

export const editTodoName = async (id, value) => {
    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/todo/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
            },
            body: JSON.stringify({
                id: id,
                name: value,
            })
        });
    return response.json();
}

// Authentication API calls

export const authenticateUser = async (username, password) => {
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
    return response.json();
}

export const registerUser = async (username, password) => {
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/auth/register`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
    return response.json();
}

export const checkToken = async (token) => {
    const response = await fetch(`${import.meta.env.VITE_HOST_IP}/auth/check-token`,
    {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (response.ok) {
        return true;
    }

    return false;
}