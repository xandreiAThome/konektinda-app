import React from 'react';
import { mount } from 'cypress/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Button />);
  });
});
