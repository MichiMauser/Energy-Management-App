export interface Device {
    id: number;
    name: string;
    consumptionValue: number;
    type: string;
    price: number;
    userId: number | null;
}

export interface AddDeviceModalProps {
    show: boolean;
    onHide: () => void;
    onDeviceAdded?: () => void;
}


export interface LinkDevice {
    id: number,
    userId: number
}
