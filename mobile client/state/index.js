import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { format } from 'date-fns'


const initialState = {
  user: "null",
  token: "null",
  name:"null"
};

const initialDate = {
  date: format(new Date().getTime(), 'dd/MM/yy')

};

const initialFood = {
   food : {
    breakfast: [],
    brunch: [],
    lunch: [],
    snacks: [],
    dinner: [],
    supper: []
  },
};

const initialData = {
  data:"null"
}

const initialTGC={
  delete:0
}

const initialURL={
  URL:"http://192.168.0.102:3000"
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin:(state,action)=>{
        state.token=action.payload.token,
        state.user=action.payload.user
        state.name=action.payload.name

    },
  },
});

export const dateSlice = createSlice({
  name: "date",
  initialState: initialDate,
  reducers: {
    setDate:(state,action)=>{
        state.date=action.payload.date
    },
  },
});

export const foodSlice = createSlice({
  name: "food",
  initialState: initialFood,
  reducers: {
    setFood:(state,action)=>{
        state.food=action.payload.food
    },
  },
});

export const getfoodSlice = createSlice({
  name: "getfood",
  initialState: initialData,
  reducers: {
    setFoodData:(state,action)=>{
        state.data=action.payload.data
    },
  },
});

export const TGCSlice = createSlice({
  name: "tgc",
  initialState: initialTGC,
  reducers: {
    setTGC:(state,action)=>{
        state.delete++
    },
  },
});

export const urlSlice = createSlice({
  name: "url",
  initialState: initialURL,
  reducers: {
  },
});




const rootReducer = combineReducers({
  auth: authSlice.reducer,
  date: dateSlice.reducer,
  food: foodSlice.reducer,
  getfood: getfoodSlice.reducer,
  tgc: TGCSlice.reducer,
  url: urlSlice.reducer,


});

export const {setLogin} = authSlice.actions;
export const {setDate} = dateSlice.actions;
export const {setFood} = foodSlice.actions;
export const {setFoodData} = getfoodSlice.actions;
export const {setTGC} = TGCSlice.actions;



export default rootReducer;
