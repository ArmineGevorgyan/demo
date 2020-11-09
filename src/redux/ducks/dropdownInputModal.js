import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import store from "../store";

const initialState = {
  isLoading: false,
  isModalOpen: false,
  title: "",
  inputType:"",
  loadingMore: false,
  cityList: [],
  search: "",
  page: 0,
  perPage: 20,
  noMoreCityies: false,
  error: null,
};

const dropdownInputModalSlice = createSlice({
  name: "dropdownInputModal",
  initialState,
  reducers: {
    openModal: (state,action) => ({
      ...state,
      isModalOpen: true,
      title:action.payload.title,
    }),
    closeModal: (state,action) => ({
      ...state,
      isModalOpen: false,
      title: "",
      cityList:[],
    }),
    loadCityList: (state) => ({
      ...state,
      isLoading: true,
      noMoreCities: false,
      page: 0,
      error: null,
    }),
    loadCityListSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      cityList: action.payload,
      page:state.page+1,
    }),
    loadCityListFail: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    setSearch: (state, action) => ({
      ...state,
      search: action.payload,
    }),
    loadMoreCities: (state) => ({
      ...state,
      loadingMore: true,
      page: state.page + 1,
    }),
    noMoreCities: (state) => ({
      ...state,
      noMoreCities: true,
      loadingMore: false,
    }),
    loadMoreCitiesSuccess: (state, action) => ({
      ...state,
      loadingMore: false,
      cityList: [
        ...state.cityList,
        ...action.payload
      ],
      error: null,
    }),
    loadMoreCitiesFail: (state, action) => ({
      ...state,
      loadingMore: false,
      error: action.payload,
    }),
    setType: (state, action) => ({
      ...state,
      inputType:action.payload,
    })
  },
});

const dropdownInputModalReducer = dropdownInputModalSlice.reducer;


export const openModal = (title) => {
  return (dispatch) => {
    dispatch(dropdownInputModalSlice.actions.openModal({ title }));
  }
};

export const closeModal = () => {
  return (dispatch) => {
    dispatch(dropdownInputModalSlice.actions.closeModal());
  }
};

export const setType = (type) => {
  return (dispatch) => {
    dispatch(dropdownInputModalSlice.actions.setType(type));
  }
}

export const loadCityList = (search) => {
  return (dispatch) => {
    dispatch(dropdownInputModalSlice.actions.loadCityList());
    dispatch(dropdownInputModalSlice.actions.setSearch(search));

    axios
      .get(`${API_URL}/cities/search?keyword=${search}&sort=name`)
      .then((r) => {
        console.log("r ====================================================================================== ", r);
        return r.data;
      })
      .then((data) => {
        dispatch(dropdownInputModalSlice.actions.loadCityListSuccess(data));
      })
      .catch((error) => {
        dispatch(dropdownInputModalSlice.actions.loadCityListFail(error));
      });
  };
};

export const loadMoreCities = () => {
  const state = store.getState();
  const dropdownState = state.dropdownInputModal;
  return (dispatch) => {
    dispatch(dropdownInputModalSlice.actions.loadMoreCities());

    axios
      .get(`${API_URL}/cities/search?keyword=${dropdownState.search}&page=${dropdownState.page}&size=20&sort=name`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        if (data == undefined || data.length == 0) {
          return dispatch(dropdownInputModalSlice.actions.noMoreCities());
        }
        dispatch(dropdownInputModalSlice.actions.loadMoreCitiesSuccess(data));
      })
      .catch((error) => {
        dispatch(dropdownInputModalSlice.actions.loadMoreCitiesFail(error));
      });
  }
}

export default dropdownInputModalReducer;
