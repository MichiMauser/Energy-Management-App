export const GetAllUsersAPI= async( bearer_token: string) => {
    try {
        const response = await fetch(`http://localhost:8100/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearer_token}`
            },
        });
        if(!(response.status == 200)){
            const errorBody = await response.text();
            throw new Error(`${response.status} - ${errorBody}`);
        }
        return await response.json();
    } catch(error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}

export const DeleteUserAPI= async( bearer_token: string, authId: number) => {
    try {
        const response = await fetch(`http://localhost:8100/auth/delete/${authId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearer_token}`
            },
        });
        if(!(response.status == 202)){
            const errorBody = await response.text();
            throw new Error(`${response.status} - ${errorBody}`);
        }
        console.log(response)
    } catch(error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}
