import Header from './Header';
import Footer from './Footer';
import useResetScroll from '../hooks/useResetScroll';

const Layout = ({ children, isLoggedIn }) => {
  useResetScroll();

  return (
    <div className="min-h-screen w-full flex flex-col">
      {isLoggedIn && <Header />}
      <main
        className={`flex-1 w-full ${isLoggedIn ? 'pt-20' : ''} ${
          !isLoggedIn ? 'min-h-screen' : ''
        }`}
      >
        {children}
      </main>
      {isLoggedIn && <Footer />}
    </div>
  );
};

export default Layout;
