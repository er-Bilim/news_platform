import { Container } from '@mui/material';
import Header from '../../../components/Header/Header';
import type { FC, PropsWithChildren } from 'react';
import Footer from '../../../components/Footer/Footer';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main
        style={{
          height: '100%',
          minHeight: '90vh',
          margin: '30px 0 60px',
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
