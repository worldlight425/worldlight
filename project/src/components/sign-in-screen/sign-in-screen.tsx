import {useRef, FormEvent} from 'react';
import {Redirect} from 'react-router-dom';
import {AppRoute} from 'configs/routes';
import {connect, ConnectedProps} from 'react-redux';
import clsx from 'clsx';
import {loginAction} from 'store/api-actions';
import {ThunkAppDispatch} from 'types/action';
import {AuthData} from 'types/auth-data';
import {useTypedSelector} from 'hooks/useTypedSelector';
import Logo from 'components/logo/logo';
import Footer from 'components/footer/footer';
import {AuthorizationStatus} from 'configs/auth-status';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData) {
    dispatch(loginAction(authData));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function SignInScreen(props: PropsFromRedux): JSX.Element {
  const {onSubmit} = props;
  const {authorizationStatus, loginError} = useTypedSelector((state) => state.filmCatalog);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const validatedPassword = /\D\d|\d\D/i;

    if (
      emailRef.current !== null &&
      passwordRef.current !== null &&
      validatedPassword.test(passwordRef.current.value)
    ) {
      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.Root} />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {loginError && (
            <div className="sign-in__message">
              <p>{loginError}</p>
            </div>
          )}

          <div className="sign-in__fields">
            <div className={clsx(['sign-in__field', {'sign-in__field--error': loginError}])}>
              <input
                ref={emailRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export {SignInScreen};
export default connector(SignInScreen);
