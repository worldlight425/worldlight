import {Actions, ActionType} from 'types/action';
import {State} from 'types/state';
import {ALL_GENRES_ITEM} from 'store/current-genre';
import {AuthorizationStatus} from 'configs/auth-status';

const initialState = {
  currentGenre: ALL_GENRES_ITEM,
  genres: [],
  filteredFilms: [],
  films: [],
  currentPage: 1,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const filmCatalogReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetDataLoaded:
      return {...state, isDataLoaded: action.payload};
    case ActionType.ChangeGenre:
      return {...state, currentGenre: action.payload};
    case ActionType.SetGenres:
      return {...state, genres: action.payload};
    case ActionType.SetFilmsByGenre:
      return {...state, filteredFilms: action.payload};
    case ActionType.GetFilmsByGenre:
      return {...state, filteredFilms: action.payload};
    case ActionType.SetLoadMoreFilms:
      return {...state, currentPage: action.payload};
    case ActionType.SetFilms:
      return {...state, films: action.payload};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.ResetFilms:
      return {...initialState};
    default:
      return state;
  }
};

export {filmCatalogReducer};
