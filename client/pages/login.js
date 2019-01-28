import Head from 'next/head';

const Login = () => (
  <div style={{ textAlign: 'center', margin: '0 20px' }}>
    <Head>
      <title>Log in to Builder Book</title>
      <meta name="description" content="Login page for builderbook.org" />
    </Head>
    <br />
    <p>Log in</p>
    <p>You’ll be logged in for 14 days unless you log out manually.</p>
  </div>
);

export default Login;
