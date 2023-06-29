import { Refine } from '@refinedev/core';
import {
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  RefineSnackbarProvider,
  notificationProvider,
} from '@refinedev/mui';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { MuiInferencer } from '@refinedev/inferencer/mui';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={RefineThemes.BlueDark}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <BrowserRouter>
          <Refine
            routerProvider={routerBindings}
            dataProvider={dataProvider('http://localhost:4000')}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: 'products',
                list: '/products',
                show: '/products/show/:id',
                create: '/products/create',
                edit: '/products/edit/:id',
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}>
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }>
                <Route
                  index
                  element={<NavigateToResource resource="products" />}
                />
                <Route path="products">
                  <Route index element={<MuiInferencer />} />
                  <Route path="show/:id" element={<MuiInferencer />} />
                  <Route path="edit/:id" element={<MuiInferencer />} />
                  <Route path="create" element={<MuiInferencer />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
          </Refine>
        </BrowserRouter>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
