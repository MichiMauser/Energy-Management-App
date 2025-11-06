import type {registerData } from "../interace/registerData.ts";

export const RegisterAPI = async (payload: registerData)=> {
    try {
        const response = await fetch("http://localhost:8100/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            const errorBody = await response.text();
            throw new Error(`${response.status} - ${errorBody}`);
        }

        return await response.json();

    } catch(error) {
        console.error("Error during registration API call:", error);
        throw error;
    }
};
