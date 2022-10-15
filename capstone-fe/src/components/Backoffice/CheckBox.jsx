/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Checkbox } from '@mui/material';

const CustomCheckBox = React.forwardRef((props, ref) => (
  <Checkbox ref={ref} {...props} />
));

export default CustomCheckBox;
