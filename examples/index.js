import React from 'react';
import { render } from 'react-dom';
import Uploader from '../index'

render(
    <Uploader/>,
    document.getElementById('root')
);

if (module.hot) {
  module.hot.dispose(() => {});
  module.hot.accept(() => {});
}
