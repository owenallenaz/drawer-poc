import { useState, useCallback, useMemo } from "react";

import "./styles.css";
import Drawers from "./Drawers";
import Page from "./Page";
import { DrawerDef } from "./types";
import AppContext from "./AppContext";

interface AppState {
  content: "";
  drawers: DrawerDef[];
}

export default function App() {
  const [state, setState] = useState<AppState>({
    content: "",
    drawers: []
  });

  const addDrawer = useCallback((drawerDef: DrawerDef) => {
    setState((state) => ({
      ...state,
      drawers: [...state.drawers, drawerDef]
    }));
  }, []);

  const removeDrawer = useCallback(() => {
    setState((state) => ({
      ...state,
      drawers: [...state.drawers.slice(0, -1)]
    }));
  }, []);

  const appContext = useMemo(
    () => ({
      addDrawer,
      removeDrawer
    }),
    [addDrawer, removeDrawer]
  );

  return (
    <AppContext.Provider value={appContext}>
      <div className="App">
        <h1>Drawer Demo</h1>
        <ul>
          <li>
            While animating, the UI is locked to prevent race conditions with
            opening/closing new drawers
          </li>
          <li>Can open infinite amount of stacked drawers</li>
          <li>
            When a drawer is opened, the opener passes callbacks to it to
            execute when save() is clicked
          </li>
          <li>
            Animations custom built via keyframes rather than using material-ui
            drawer defaults to handle stacking cleanly
          </li>
          <li>
            App passes to Drawers a JSON Def for each drawer and passes a render
            prop. This separates the concerns of animating and displaying the
            drawer (Mosaic) from rendering the content of the drawer (App).
          </li>
        </ul>
        <p>From Form: {state.content}</p>
        <button
          onClick={() =>
            addDrawer({
              config: {
                type: "form",
                title: "New Form",
                fields: ["foo", "bar", "baz", "from_parent"]
              },
              callbacks: {
                save: (data) => {
                  setState((state) => ({
                    ...state,
                    content: data
                  }));

                  removeDrawer();
                }
              }
            })
          }
        >
          Add Form
        </button>

        <Drawers drawers={state.drawers}>
          {(drawerDef) => {
            return (
              <Page
                config={drawerDef.config}
                callbacks={drawerDef.callbacks ?? {}}
              />
            );
          }}
        </Drawers>
      </div>
    </AppContext.Provider>
  );
}
