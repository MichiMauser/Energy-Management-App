import type {Device, LinkDevice} from "../interace/device.ts";

export const GetUserDevicesAPI = async (authId: string | null, bearer_token: string | null) => {
    try {
        const response = await fetch(`http://localhost:8100/device/userId/${authId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearer_token}`
            },
        });
        if(!response.ok){
            const errorBody = await response.text();
            throw new Error(`${response.status} - ${errorBody}`);
        }
        return await response.json();
    } catch(error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
};


export const GetDevicesAPI = async (bearer_token: string | null) => {
    try {
        const response = await fetch(`http://localhost:8100/device`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearer_token}`
            },
        });
        if(!response.ok){
            const errorBody = await response.text();
            throw new Error(`${response.status} - ${errorBody}`);
        }
        return await response.json();
    } catch(error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
};

export const LinkDeviceAPI= async (bearer_token: string | null, linkDevicePayload: Device) => {
    try {
        const response = await fetch(`http://localhost:8100/device/linkUser`, {
            method: "POST",
            body: JSON.stringify(linkDevicePayload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearer_token}`
            },
        });
        if(!response.ok){
            const errorBody = await response.text();
            throw new Error(`${response.status} - ${errorBody}`);
        }
        return await response.json();
    } catch(error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}


export const AddDeviceAPI = async( bearer_token: string | null, devicePayload: Device) => {
    try {
        const response = await fetch(`http://localhost:8100/device/add`, {
            method: "POST",
            body:JSON.stringify(devicePayload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearer_token}`
            },
        });
        if(!(response.status ==  201)){
            const errorBody = await response.text();
            throw new Error(`${response.status} - ${errorBody}`);
        }
    } catch(error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}


export const DeleteDeviceAPI= async( bearer_token: string, deviceId:number) => {
    try {
        const response = await fetch(`http://localhost:8100/device/del/id/${deviceId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearer_token}`
            },
        });
        if(!(response.status == 202)){
            const errorBody = await response.text();
            throw new Error(`${response.status} - ${errorBody}`);
        }
    } catch(error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}

