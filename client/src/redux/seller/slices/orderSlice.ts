import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
    liveOrders: any[];
    orderHistory: any[];
    stats: {
        todayRevenue: number;
        totalOrders: number;
    };
}

const initialState: OrderState = {
    liveOrders: [],
    orderHistory: [],
    stats: {
        todayRevenue: 0,
        totalOrders: 0,
    },
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setLiveOrders: (state, action: PayloadAction<any[]>) => {
            state.liveOrders = action.payload;
        },
        addLiveOrder: (state, action: PayloadAction<any>) => {
            state.liveOrders.unshift(action.payload);
        },
        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
            const order = state.liveOrders.find((o) => o.id === action.payload.id);
            if (order) {
                order.status = action.payload.status;
            }
        },
    },
});

export const { setLiveOrders, addLiveOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
