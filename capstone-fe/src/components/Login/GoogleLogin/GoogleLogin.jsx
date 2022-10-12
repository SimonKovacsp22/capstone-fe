import './styles-googleLogin.css';

function GoogleSocialButton() {
  return (
    <div className="googleLogin_container">
      <img
        className="googleLogin_img"
        src="../../../assets/images/google.png"
        alt="Google Login"
      />
      <p className="googleLogin_text">
        Sign in with Google
      </p>
    </div>
  );
}

export default GoogleSocialButton;
