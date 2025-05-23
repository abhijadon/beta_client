import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';
import { AppContextProvider } from '@/context/appContext';
import PageLoader from '@/components/PageLoader';
import Localization from '@/locale/Localization';
import AuthRouter from '@/router/AuthRouter';
import ErpApp from '@/apps/ErpApp';

export default function ERP_SODEOs() {
  const { isLoggedIn } = useSelector(selectAuth);
  if (!isLoggedIn) {
    return (
      <Localization>
        <Suspense fallback={<PageLoader />}>
          <AuthRouter />
        </Suspense>
      </Localization>
    );
  } else {
    return (
      <Localization>
        <AppContextProvider>
          <Suspense fallback={<PageLoader />}>
            <ErpApp />
          </Suspense>
        </AppContextProvider>
      </Localization>
    );
  }
}
