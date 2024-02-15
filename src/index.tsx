// Copyright (C) 2024 baris-inandi
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { ContainerNode, render } from "preact";
import { Route, Switch } from "wouter-preact";
import IBPSProvider from "./components/IBPSProvider";
import Ide from "./components/Ide/Ide";
import NotFound from "./components/global/NotFound";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = document.getElementById("root") as ContainerNode;

const node = (
    <IBPSProvider>
        <Switch>
            <Route path="/" component={Ide} />
            <Route>
                <NotFound />
            </Route>
        </Switch>
    </IBPSProvider>
);

render(node, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
