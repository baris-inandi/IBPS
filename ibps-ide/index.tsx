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
import NotFound from "./components/ErrorNotFound";
import IBPSProvider from "./components/IBPSProvider";
import Ide from "./components/Ide/Ide";

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
