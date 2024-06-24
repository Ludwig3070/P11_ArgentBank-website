import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Form from "../components/Form"
function SignIn() {
  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <Form/>
          
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignIn;
