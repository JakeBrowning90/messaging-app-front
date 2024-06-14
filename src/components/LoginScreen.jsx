function LoginScreen() {
  const submitLogin = () => {
    e.preventDefault();
    let email1 = document.getElementById('email1')
    console.log(email.value);
  };

  return (
    <div className="screenLogin page">
      Login View
      <form onSubmit={submitLogin}>
        <input type="text" name="email" id='email1'/>
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginScreen;
