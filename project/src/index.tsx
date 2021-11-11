import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from 'services/api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from 'components/app/app';
import {comments} from 'fixtures/comments';
import {requireAuthorization} from 'store/action';
import {fetchFilmsAction, fetchPromoFilmAction} from 'store/api-actions';
import {rootReducer} from 'store/root-reducer';
import {ThunkAppDispatch} from 'types/action';
import {AuthorizationStatus} from 'configs/auth-status';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

(store.dispatch as ThunkAppDispatch)(requireAuthorization(AuthorizationStatus.NoAuth));
(store.dispatch as ThunkAppDispatch)(fetchFilmsAction());
(store.dispatch as ThunkAppDispatch)(fetchPromoFilmAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App comments={comments} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
