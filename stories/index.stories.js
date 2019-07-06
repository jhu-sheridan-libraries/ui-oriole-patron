import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import TagResourceList from "../src/components/TagResourceList"

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('Top Level Tag', () => (
    <TagResourceList
      key='History of Science Technology + Medicine'
      tag='History of Science Technology + Medicine'
      root={process.env.ORIOLE_PATRON_UI_ROOT}
    />
  ))
  .add('Second Level Tag', () => (
    <TagResourceList
      key='Biological Sciences -- Additional Databases'
      tag='Biological Sciences -- Additional Databases'
      root={process.env.ORIOLE_PATRON_UI_ROOT}
    />
  ));
