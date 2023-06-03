import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, REHYDRATE } from 'redux-persist';
import { Provider } from "react-redux";
import { store } from 'Redux/store';
import { useEffect } from "react";
import Routerguard from 'Routerguard';

function App() {

    let persistor = persistStore(store);

    useEffect(() => {
        persistor.dispatch({ type: REHYDRATE });
    }, [])

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Routerguard />
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;

