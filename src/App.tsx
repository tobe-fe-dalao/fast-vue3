import { ConfigProvider } from 'vant';
import { defineComponent, KeepAlive, Suspense } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import './App.css';
export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <ConfigProvider
        theme-vars={{ blue: '#6476FF', navBarArrowSize: '1.4rem' }}
      >
        <Suspense onFallback={() => <div> Loading...</div>}>
          <RouterView>
            {({
              Component,
              route
            }: {
              Component: () => JSX.Element;
              route: RouteLocationNormalizedLoaded;
            }) => {
              const { meta } = route;
              const isKeepAlive = meta && meta.keepAlive;
              return (
                <>
                  <KeepAlive>
                    {isKeepAlive ? (
                      <Component
                        key={meta.usePathKey ? route.fullPath : undefined}
                      />
                    ) : null}
                  </KeepAlive>
                  {!isKeepAlive ? (
                    <Component
                      key={meta.usePathKey ? route.fullPath : undefined}
                    />
                  ) : null}
                </>
              );
            }}
          </RouterView>
        </Suspense>
      </ConfigProvider>
    );
  }
});
