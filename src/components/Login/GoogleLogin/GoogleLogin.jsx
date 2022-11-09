import './styles-googleLogin.css';

function GoogleSocialButton() {
  return (
    <a href={`${process.env.REACT_APP_BE_URL}/users/googleLogin`} style={{ textDecoration: 'none' }}>
      <div className="googleLogin_container">
        <img
          className="googleLogin_img"
          alt="Google Login"
        />
        <p className="googleLogin_text">
          Sign in with Google
        </p>
      </div>
    </a>
  );
}

export default GoogleSocialButton;
